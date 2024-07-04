import {
  Armor,
  Boots,
  ComputedItem,
  Gloves,
  Helmet,
  ItemAttribute,
  ItemBonus,
  Necklace,
  Ring,
  Shield,
  Weapon,
} from "@/types/items";
import {Item, ItemType, StatType} from "@prisma/client";

// Function to ensure the item type matches the expected type
function ensureItemType<T extends Item>(
  item: Item,
  expectedType: ItemType,
): asserts item is T {
  if (item.itemType !== expectedType) {
    throw new Error(`Item is not a ${ItemType[expectedType]}`);
  }
}

// Function to check if a type is a valid bonus type
function isBonusType(type: string): type is ItemBonus["type"] {
  const validTypes: ItemBonus["type"][] = [
    ...Object.values(StatType),
    "damage",
    "damageReduction",
  ];
  return validTypes.includes(type as ItemBonus["type"]);
}

// Function to compute the bonus attributes of an item
function computeBonusAttributes(item: Item): Array<ItemBonus> {
  const bonusAttributes = (item.attributes as any as ItemAttribute[])
    .filter((attribute) => attribute.name === "bonus")
    .map((attribute) => {
      const [bonusType, value] = attribute.value.split(":");
      if (!isBonusType(bonusType)) {
        throw new Error(`Invalid bonus type: ${bonusType}`);
      }
      return {type: bonusType, value: parseInt(value)} as ItemBonus;
    });

  return bonusAttributes;
}

// Function to get computed item with bonus attributes
function getComputedItem(item: Item): ComputedItem {
  return {...item, bonuses: computeBonusAttributes(item)};
}

// Higher order function to wrap a function with computed item
function withComputedItem<T extends Item, U extends ComputedItem>(
  getItem: (item: ComputedItem) => T,
) {
  return (item: Item): T => {
    const computedItem = getComputedItem(item);
    return getItem(computedItem);
  };
}

export const getWeapon = withComputedItem((item: ComputedItem): Weapon => {
  ensureItemType<Weapon>(item, ItemType.Weapon);

  const damage = (item.attributes as any as ItemAttribute[]).find(
    (attribute) => {
      return attribute.name === "damage";
    },
  );

  if (!damage) {
    throw new Error("Weapon is missing damage attribute");
  }

  const [low, high] = damage.value
    .split("-")
    .map((value) => {
      return parseInt(value);
    })
    .sort((a, b) => a - b);

  return {
    ...item,
    itemType: ItemType.Weapon,
    damageRange: [low, high],
  };
});

export const getShield = withComputedItem((item: ComputedItem): Shield => {
  ensureItemType<Shield>(item, ItemType.Shield);

  const damageReduction = (item.attributes as any as ItemAttribute[]).find(
    (attribute) => {
      return attribute.name === "damageReduction";
    },
  );

  if (!damageReduction) {
    throw new Error("Shield is missing damage reduction attribute");
  }

  return {
    ...item,
    itemType: ItemType.Shield,
    damageReduction: parseInt(damageReduction.value),
  };
});

export const getArmor = withComputedItem((item: ComputedItem): Armor => {
  ensureItemType<Armor>(item, ItemType.Armor);

  return {
    ...item,
    itemType: ItemType.Armor,
  };
});

export const getBoots = withComputedItem((item: ComputedItem): Boots => {
  ensureItemType<Boots>(item, ItemType.Boots);

  return {
    ...item,
    itemType: ItemType.Boots,
  };
});

export const getHelmet = withComputedItem((item: ComputedItem): Helmet => {
  ensureItemType<Helmet>(item, ItemType.Helmet);

  return {
    ...item,
    itemType: ItemType.Helmet,
  };
});

export const getGloves = withComputedItem((item: ComputedItem): Gloves => {
  ensureItemType<Gloves>(item, ItemType.Gloves);

  return {
    ...item,
    itemType: ItemType.Gloves,
  };
});

export const getRing = withComputedItem((item: ComputedItem): Ring => {
  ensureItemType<Ring>(item, ItemType.Ring);

  return {
    ...item,
    itemType: ItemType.Ring,
  };
});

export const getNecklace = withComputedItem((item: ComputedItem): Necklace => {
  ensureItemType<Necklace>(item, ItemType.Necklace);

  return {
    ...item,
    itemType: ItemType.Necklace,
  };
});
