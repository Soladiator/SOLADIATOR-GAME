import {CharacterStats, CombatStats} from "@/types/stats";
import {CharacterStat, StatType} from "@prisma/client";

const MODIFIERS = {
  [StatType.STR]: 1, // Strength: Affects the physical power of the character.
  [StatType.DEF]: {
    base: 30, // Defense: Base value for calculating the character's defense.
    modifier: -0.05, // Modifier for calculating the character's defense.
  },
  [StatType.DEX]: {
    base: 40, // Dexterity: Base value for calculating the character's dexterity.
    modifier: -0.03, // Modifier for calculating the character's dexterity.
  },
  [StatType.LCK]: 0.1, // Luck: Affects the chance of landing a critical hit.
  [StatType.VIT]: 5, // Vitality: Affects the character's health points.
};

/**
 * @description This function calculates the effect of each stat type.
 *
 * @param statType The type of the stat.
 * @param value The value of the stat.
 *
 * @returns Depending on the stat type:
 * - If STR, it returns a damage value. This represents the additional damage the character can inflict.
 * - If DEF, it returns how much the damage will be reduced by. This represents the character's defense against incoming damage.
 * - If DEX, it returns the chance to dodge or land a critical hit, in percentage. A critical hit inflicts 2x the damage and cannot be dodged.
 * - If LCK, it returns an additional drop chance percentage. This represents the character's luck in finding more items.
 * - If VIT, it returns the max health amount. This represents the character's total health points.
 */
export const getStatCorrespondingValue = (type: StatType, value: number) => {
  switch (type) {
    case StatType.STR:
      return value * MODIFIERS[StatType.STR];
    case StatType.DEF:
      return Math.round(
        MODIFIERS[StatType.DEF].base *
          (1 - Math.exp(MODIFIERS[StatType.DEF].modifier * value)),
      );
    case StatType.DEX:
      return Math.round(
        MODIFIERS[StatType.DEX].base *
          (1 - Math.exp(MODIFIERS[StatType.DEX].modifier * value)),
      );
    case StatType.LCK:
      return value * MODIFIERS[StatType.LCK];
    case StatType.VIT:
      return value * MODIFIERS[StatType.VIT];
  }
};

export const getCharacterStats = (baseCharacterStats: CharacterStat[]) => {
  const characterStatsObject: CharacterStats = {
    STR: 0,
    VIT: 0,
    DEX: 0,
    DEF: 0,
    LCK: 0,
  };

  //Go through each character stat and add it to the object
  for (const stat of baseCharacterStats) {
    characterStatsObject[stat.statType] = stat.value;
  }

  return characterStatsObject;
};

export const getCombatStats = (
  characterStats: CharacterStats,
  damageRange: [number, number],
  damageReduction: number,
) => {
  return {
    damageRange: [
      getStatCorrespondingValue(StatType.STR, characterStats.STR) +
        damageRange[0],
      getStatCorrespondingValue(StatType.STR, characterStats.STR) +
        damageRange[1],
    ],
    damageReduction:
      getStatCorrespondingValue(StatType.DEF, characterStats.DEF) +
      damageReduction,
    dodgeOrCritChance: getStatCorrespondingValue(
      StatType.DEX,
      characterStats.DEX,
    ),
    bonusLuckPercentage: getStatCorrespondingValue(
      StatType.LCK,
      characterStats.LCK,
    ),
  } as CombatStats;
};
