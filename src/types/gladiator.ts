import {Gender} from "@prisma/client";
import {CharacterCreateInput} from "./character";

export interface GladiatorCreateInput extends CharacterCreateInput {
  ownerWallet: string;
  gender: Gender;
}
