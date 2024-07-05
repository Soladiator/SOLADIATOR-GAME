import {StatType} from "@prisma/client";

export const CONSTANTS = {};

export const DEFAULTS = {
  BASE_STAT_COUNT: Object.keys(StatType).length * 5,
  AVAILABLE_STAT_PER_LEVEL: 3,
  MAX_ENERGY: 100,
  ENERGY_REGEN_RATE: 1,
};
