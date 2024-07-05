import db from '@/lib/db'
import {
  CreateBattleZoneInput,
  UpdateBattleZoneInput,
} from '@/types/battleZone'

export const createBattleZone = async ({
  zoneName,
  monsterIDs,
  minLevel,
}: CreateBattleZoneInput) => {
  const battleZone = await db.battleZone.create({
    data: {
      name: zoneName,
      minLevel,
      monsters: {
        connect: monsterIDs.map((id) => ({ id })),
      },
    },
    include: {
      monsters: true,
    },
  })

  return battleZone
}

/**
 *
 * @description Updates a battle zone.
 * @param {string} zoneName - The name of the battle zone.
 * @param {UpdateBattleZoneInput} updateArgs - The updated battle zone data. Expects all data to be updated. Make sure to pass everything.
 */
export const updateBattleZone = async ({
  zoneName,
  monsterIDs,
  minLevel,
  zoneId,
}: UpdateBattleZoneInput) => {
  const battleZone = await db.battleZone.update({
    where: { id: zoneId },
    data: {
      name: zoneName,
      minLevel: minLevel,
      monsters: {
        connect: monsterIDs.map((id) => ({ id })),
      },
    },
    include: {
      monsters: true,
    },
  })

  return battleZone
}
