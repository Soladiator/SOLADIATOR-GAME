import {Character, Item} from "@prisma/client";
import {CharacterStats, CombatStats} from "./stats";

export enum HitType {
  Normal = "Normal",
  Critical = "Critical",
}

export enum DefenseType {
  Dodge = "Dodge",
  Block = "Block",
  Normal = "Normal",
}

export interface ComputedCombatEntity extends Character {
  combatStats: CombatStats;
  maxHealth: number;
  stats: CharacterStats;
}

export interface AttackResult {
  damage: number;
  hitType: HitType;
}

export interface DefenseResult {
  defendType: DefenseType;
  incomingDamage: number;
  health: number;
}

export interface CombatRoundResult {
  attacker: string;
  attackResult: AttackResult;
  defender: string;
  defendResult: DefenseResult;
  round: number;
}

export interface CombatResult {
  rounds: CombatRoundResult[];
  winner: ComputedCombatEntity;
  loser: ComputedCombatEntity;
}
