import {StatType} from "@prisma/client";
import exp from "constants";

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

export interface CreateCharacterStatInput {
  statType: StatType;
  value: number;
  characterId: number;
}

export interface CreateCharacterStatsInput {
  stats: Array<{
    statType: StatType;
    value: number;
  }>;
  characterId: number;
}

export interface UpdateCharacterStatInput extends CreateCharacterStatInput {}
export interface UpdateCharacterStatsInput extends CreateCharacterStatsInput {}
