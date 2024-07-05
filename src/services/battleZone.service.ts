import db from '@/lib/db'

export const createBattleZone = async ({
  zoneName,
  monsterIDs,
  minLevel,
}: {
  zoneName: string
  monsterIDs: number[]
  minLevel: number
}) => {
  const battleZone = await db.battleZone.create({
    data: {
      name: zoneName,
      minLevel,
      monsters: {
        connect: monsterIDs.map((id) => ({ id })),
      },
    },
  })

  return battleZone
}

/**
 *
 * @description Updates a battle zone.
 * @param {string} zoneName - The name of the battle zone.
 * @param {Object} updateArgs - The updated battle zone data. Expects all data to be updated. Make sure to pass everything.
 */
export const updateBattleZone = async ({
  zoneName,
  updateArgs,
}: {
  zoneName: string
  updateArgs: {
    zoneName: string
    monsterIDs: number[]
    minLevel: number
  }
}) => {
  const battleZone = await db.battleZone.update({
    where: { name: zoneName },
    data: {
      name: zoneName,
      minLevel: updateArgs.minLevel,
      monsters: {
        connect: updateArgs.monsterIDs.map((id) => ({ id })),
      },
    },
  })

  return battleZone
}
