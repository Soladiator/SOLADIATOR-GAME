import db from "@/lib/db";
import {
  CreateCharacterStatsInput,
  UpdateCharacterStatsInput,
} from "@/types/stats";

/**
 * @deprecated
 * Stats should be added when creating the character and never again.
 */
export const createCharacterStats = async ({
  stats,
  characterId,
}: CreateCharacterStatsInput) => {
  const createResult = await db.characterStat.createMany({
    data: stats.map((stat) => ({
      statType: stat.statType,
      value: stat.value,
      characterId,
    })),
  });

  return createResult.count === stats.length;
};

/**
 *
 * @param stats Stats to update
 * @param characterId The character to update. Not the id of gladiator or monster.
 * @returns {boolean} True if all stats were updated successfully.
 */
export const updateCharacterStats = async ({
  stats,
  characterId,
}: UpdateCharacterStatsInput) => {
  const updateResult = await db.characterStat.updateMany({
    where: {
      characterId,
    },
    data: {
      ...stats.map((stat) => ({
        statType: stat.statType,
        value: stat.value,
      })),
    },
  });

  return updateResult.count === stats.length;
};
