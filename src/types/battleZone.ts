export interface CreateBattleZoneInput {
  zoneName: string
  monsterIDs: number[]
  minLevel: number
}

export interface UpdateBattleZoneInput extends CreateBattleZoneInput {
  zoneId: number
}
