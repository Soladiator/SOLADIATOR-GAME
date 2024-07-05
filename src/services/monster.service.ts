import { getStatCorrespondingValue } from '@/helpers/stats'
import db from '@/lib/db'
import { MonsterCreateInput } from '@/types/monster'
import { StatType } from '@prisma/client'

export const getMonsters = async () => {
  const monsters = await db.monster.findMany({
    include: {
      character: {
        select: {
          name: true,
          currentHealth: true,
          availableStatPoints: true,
          characterStat: {
            select: {
              statType: true,
              value: true,
            },
          },
        },
      },
    },
  })

  return monsters
}

export const createMonster = async ({
  name,
  statDistribution,
  difficulty,
  battleZoneName,
}: MonsterCreateInput) => {
  const startMaxHealth = getStatCorrespondingValue(
    StatType.VIT,
    statDistribution.VIT,
  )

  const monster = await db.monster.create({
    data: {
      character: {
        create: {
          name,
          currentHealth: startMaxHealth,
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
      difficulty,
      battleZone: {
        connect: {
          name: battleZoneName,
        },
      },
    },
  })

  return monster
}
