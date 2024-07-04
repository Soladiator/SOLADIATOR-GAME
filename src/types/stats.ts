import {StatType} from "@prisma/client";

export interface CharacterStats {
  [StatType.STR]: number;
  [StatType.DEF]: number;
  [StatType.DEX]: number;
  [StatType.LCK]: number;
  [StatType.VIT]: number;
}

export interface CombatStats {
  damageRange: number[];
  damageReduction: number;
  dodgeOrCritChance: number;
  bonusLuckPercentage: number;
}
