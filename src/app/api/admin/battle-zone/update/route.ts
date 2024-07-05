import {
  createBattleZone,
  updateBattleZone,
} from '@/services/battleZone.service'
import {
  CreateBattleZoneInput,
  UpdateBattleZoneInput,
} from '@/types/battleZone'
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(req: NextRequest, res: NextResponse) {
  const { zoneName, monsterIDs, minLevel, zoneId } =
    (await req.json()) as UpdateBattleZoneInput

  // Create the battle zone
  const battleZone = await updateBattleZone({
    zoneName,
    monsterIDs,
    minLevel,
    zoneId,
  })

  return NextResponse.json(battleZone)
}
