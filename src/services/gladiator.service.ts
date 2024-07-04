import {DEFAULTS} from "@/helpers/constants";
import {getStatCorrespondingValue} from "@/helpers/stats";
import db from "@/lib/db";
import {GladiatorCreateInput} from "@/types/gladiator";
import {StatType} from "@prisma/client";

/**
 *
 * @param publicKey
 * @returns
 */
export const getGladiatorByWallet = async (publicKey: string) => {
  const gladiator = await db.gladiator.findFirst({
    where: {
      ownerWallet: publicKey,
    },
  });

  if (!gladiator) {
    throw new Error("Gladiator not found");
  }

  return gladiator;
};

/**
 * Creates a new gladiator.
 *
 * @param name The name of the gladiator.
 * @param statDistribution The distribution of the gladiator's stats.
 * @param ownerWallet The wallet address of the gladiator's owner.
 *
 * @throws {Error} If the sum of the stat distribution is not 10.
 *
 * @returns {Promise} A promise that resolves to the created gladiator.
 */
export const createGladiator = async ({
  name,
  statDistribution,
  gender,
  ownerWallet,
}: GladiatorCreateInput) => {
  //Check if sum of stat distribution is 10
  const sum = Object.values(statDistribution).reduce(
    (acc, curr) => acc + curr,
    0,
  );

  if (sum !== DEFAULTS.AVAILABLE_STAT_PER_LEVEL) {
    throw new Error("Stat distribution must sum to 10");
  }

  const startMaxHealth = getStatCorrespondingValue(
    StatType.VIT,
    statDistribution.VIT,
  );

  const gladiator = await db.gladiator.create({
    data: {
      owner: {
        connect: {
          walletAddress: ownerWallet,
        },
      },
      gender,
      character: {
        create: {
          name,
          currentHealth: startMaxHealth,
          availableStatPoints: DEFAULTS.AVAILABLE_STAT_PER_LEVEL,
          characterStat: {
            createMany: {
              data: Object.entries(statDistribution).map(
                ([statType, value]) => ({
                  statType: statType as StatType,
                  value,
                }),
              ),
            },
          },
        },
      },
    },
    include: {
      character: {
        include: {
          characterStat: {
            select: {
              statType: true,
              value: true,
            },
          },
        },
      },
      monsterGladiatorStats: true,
    },
  });

  return gladiator;
};
