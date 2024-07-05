import { createBattleZone } from '@/services/battleZone.service'
import { CreateBattleZoneInput } from '@/types/battleZone'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest, res: NextResponse) {
  const { zoneName, monsterIDs, minLevel } =
    (await req.json()) as CreateBattleZoneInput

  // Create the battle zone
  const battleZone = await createBattleZone({ zoneName, monsterIDs, minLevel })

  return NextResponse.json(battleZone)
}
