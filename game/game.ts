import {
  getCharacterStats,
  getCombatStats,
  getStatCorrespondingValue,
} from "../src/helpers/stats";
import {
  getArmor,
  getBoots,
  getGloves,
  getHelmet,
  getNecklace,
  getRing,
  getShield,
  getWeapon,
} from "../src/helpers/items";
import {
  Armor,
  Boots,
  Gloves,
  Helmet,
  Necklace,
  Ring,
  Shield,
  Weapon,
} from "../src/types/items";
import {
  Character,
  CharacterStat,
  Item,
  ItemType,
  StatType,
} from "@prisma/client";
import {
  AttackResult,
  CombatResult,
  CombatRoundResult,
  ComputedCombatEntity,
  DefenseResult,
  DefenseType,
  HitType,
} from "../src/types/combat";

export const computeCombatEntity = (
  character: Character,
  baseCharacterStats: CharacterStat[],
  items: Item[],
) => {
  const characterStats = getCharacterStats(baseCharacterStats);

  const equippedItems: {
    [ItemType.Weapon]: Weapon | null;
    [ItemType.Armor]: Armor | null;
    [ItemType.Shield]: Shield | null;
    [ItemType.Helmet]: Helmet | null;
    [ItemType.Boots]: Boots | null;
    [ItemType.Gloves]: Gloves | null;
    [ItemType.Ring]: Ring | null;
    [ItemType.Necklace]: Necklace | null;
  } = {
    [ItemType.Weapon]: null,
    [ItemType.Armor]: null,
    [ItemType.Shield]: null,
    [ItemType.Helmet]: null,
    [ItemType.Boots]: null,
    [ItemType.Gloves]: null,
    [ItemType.Ring]: null,
    [ItemType.Necklace]: null,
  };

  for (const item of items) {
    switch (item.itemType) {
      case ItemType.Weapon:
        const weapon = getWeapon(item);
        equippedItems[ItemType.Weapon] = weapon;
        break;
      case ItemType.Armor:
        const armor = getArmor(item);
        equippedItems[ItemType.Armor] = armor;
        break;
      case ItemType.Shield:
        const shield = getShield(item);
        equippedItems[ItemType.Shield] = shield;
        break;
      case ItemType.Helmet:
        const helmet = getHelmet(item);
        equippedItems[ItemType.Helmet] = helmet;
        break;
      case ItemType.Boots:
        const boots = getBoots(item);
        equippedItems[ItemType.Boots] = boots;
        break;
      case ItemType.Gloves:
        const gloves = getGloves(item);
        equippedItems[ItemType.Gloves] = gloves;
        break;
      case ItemType.Ring:
        const ring = getRing(item);
        equippedItems[ItemType.Ring] = ring;
        break;
      case ItemType.Necklace:
        const necklace = getNecklace(item);
        equippedItems[ItemType.Necklace] = necklace;
        break;
    }
  }

  let damageRange: [number, number] = [0, 0];
  let damageReduction = 0;

  //Go through each item and add the stats to the combat entity
  for (const itemType in equippedItems) {
    const item = equippedItems[itemType as ItemType];
    //item is a type of ComputedItem and so has bonuses property. Go through each bonus and add it to the combat entity
    if (item) {
      if (item.itemType === ItemType.Weapon) {
        damageRange = item.damageRange;
      }
      for (const bonus of item.bonuses) {
        switch (bonus.type) {
          case "damage":
            damageRange = [
              damageRange[0] + bonus.value,
              damageRange[1] + bonus.value,
            ];
            break;
          case "damageReduction":
            damageReduction += bonus.value;
            break;
          default:
            characterStats[bonus.type] += bonus.value;
            break;
        }
      }
    }
  }

  const combatStats = getCombatStats(
    characterStats,
    damageRange,
    damageReduction,
  );

  const maxHealth = getStatCorrespondingValue(StatType.VIT, characterStats.VIT);

  if (maxHealth < character.currentHealth) {
    throw new Error(
      "Character's health can not be greater than max health. Current health: " +
        character.currentHealth +
        " Max Health " +
        maxHealth,
    );
  }

  const combatEntity = {
    ...character,
    combatStats,
    maxHealth,
    stats: characterStats,
  } as ComputedCombatEntity;

  return combatEntity;
};

/**
 * This function represents an attack action in the game.
 * @param attacker The character who is making the attack.
 * @returns The result of the attack including the damage and if it was a critical hit.
 */
const attack = (attacker: ComputedCombatEntity): AttackResult => {
  let hitType = HitType.Normal;

  const dexteritySuccess =
    Math.random() < attacker.combatStats.dodgeOrCritChance / 100;

  const damageRange = attacker.combatStats.damageRange;
  let damage =
    damageRange[0] +
    Math.floor(Math.random() * (damageRange[1] - damageRange[0]));

  if (dexteritySuccess) {
    hitType = HitType.Critical;
    damage *= 2;
  }

  return {damage, hitType};
};

/**
 * This function represents a defend action in the game.
 * @param defender The character who is defending against the attack.
 * @param attack The attack that the defender is trying to defend against.
 * @returns The result of the defend action, including the type of defense, the incoming damage, and the updated defender.
 */
const defend = (
  defender: ComputedCombatEntity,
  attack: AttackResult,
): DefenseResult => {
  const dexteritySuccess =
    Math.random() < defender.combatStats.dodgeOrCritChance / 100;
  let defendType = DefenseType.Normal;
  let incomingDamage = 0;

  if (dexteritySuccess) {
    defendType = DefenseType.Dodge;
  } else {
    incomingDamage = Math.floor(
      attack.damage * (1 - defender.combatStats.damageReduction * 0.01),
    );
  }

  defender.currentHealth -= incomingDamage;

  // Ensure currentHealth doesn't go below 0
  if (defender.currentHealth < 0) {
    defender.currentHealth = 0;
  }

  return {
    defendType,
    incomingDamage,
    health: defender.currentHealth,
  };
};

const combatRound = (
  attacker: ComputedCombatEntity,
  defender: ComputedCombatEntity,
) => {
  const attackResult = attack(attacker);
  const defendResult = defend(defender, attackResult);

  return {
    attackResult,
    defendResult,
  };
};

export const combat = (
  entityOne: ComputedCombatEntity,
  entityTwo: ComputedCombatEntity,
): CombatResult => {
  const combatRounds: Array<CombatRoundResult> = [];

  let round = 1;
  let attacker = entityOne;
  let defender = entityTwo;

  while (entityOne.currentHealth > 0 && entityTwo.currentHealth > 0) {
    const result = combatRound(attacker, defender);
    combatRounds.push({
      round,
      ...result,
      attacker: attacker.id.toString(),
      defender: defender.id.toString(),
    });
    round++;

    // Swap attacker and defender for the next round
    [attacker, defender] = [defender, attacker];
  }

  const winner = entityOne.currentHealth > 0 ? entityOne : entityTwo;
  const loser = winner === entityOne ? entityTwo : entityOne;

  return {
    rounds: combatRounds,
    winner,
    loser,
  };
};
