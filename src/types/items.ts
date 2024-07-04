import {Item, StatType} from "@prisma/client";

export type ItemBonus = {
  type: StatType | "damage" | "damageReduction";
  value: number;
};

export interface ComputedItem extends Item {
  bonuses: ItemBonus[];
}

export interface Weapon extends ComputedItem {
  readonly itemType: "Weapon";
  damageRange: [number, number] /* [LOW, HIGH] */;
}

export interface Shield extends ComputedItem {
  readonly itemType: "Shield";
  damageReduction: number /* Percentage */;
}

export interface Armor extends ComputedItem {
  readonly itemType: "Armor";
}

export interface Boots extends ComputedItem {
  readonly itemType: "Boots";
}

export interface Helmet extends ComputedItem {
  readonly itemType: "Helmet";
}

export interface Gloves extends ComputedItem {
  readonly itemType: "Gloves";
}

export interface Ring extends ComputedItem {
  readonly itemType: "Ring";
}

export interface Necklace extends ComputedItem {
  readonly itemType: "Necklace";
}

export interface ItemAttribute {
  name: "bonus" | "damage" | "damageReduction";
  value: string;
}
