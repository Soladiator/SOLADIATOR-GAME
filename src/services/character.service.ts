import {DEFAULTS} from "@/helpers/constants";
import {getStatCorrespondingValue} from "@/helpers/stats";
import db from "@/lib/db";
import {CharacterCreateInput} from "@/types/character";
import {StatType} from "@prisma/client";

/**
 * @deprecated
 * Character should not be created alone.
 * It should be created as a monster or gladiator
 */
export const createCharacter = async ({
  name,
  statDistribution,
}: CharacterCreateInput) => {
  const startMaxHealth = getStatCorrespondingValue(
    StatType.VIT,
    statDistribution.VIT,
  );

  const character = await db.character.create({
    data: {
      name,
      currentHealth: startMaxHealth,
      availableStatPoints: DEFAULTS.AVAILABLE_STAT_PER_LEVEL,
      characterStat: {
        createMany: {
          data: Object.entries(statDistribution).map(([statType, value]) => ({
            statType: statType as StatType,
            value,
          })),
        },
      },
    },
    include: {
      characterStat: {
        select: {
          statType: true,
          value: true,
        },
      },
    },
  });

  return character;
};
