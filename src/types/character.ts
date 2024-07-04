import {StatType} from "@prisma/client";

export type CharacterCreateStatDistribution = {
  [key in StatType]: number;
};

export interface CharacterCreateInput {
  name: string;
  statDistribution: CharacterCreateStatDistribution;
}
