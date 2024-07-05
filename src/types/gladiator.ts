import {Gender} from "@prisma/client";
import {CharacterCreateInput} from "./character";

export interface GladiatorCreateInput extends CharacterCreateInput {
  ownerWallet: string;
  gender: Gender;
}

export type ItemFieldType =
  | "weaponId"
  | "armorId"
  | "helmetId"
  | "shieldId"
  | "bootsId"
  | "glovesId"
  | "ring1Id"
  | "ring2Id"
  | "necklaceId";
