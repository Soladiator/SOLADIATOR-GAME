import { Difficulty } from '@prisma/client'
import { CharacterCreateInput } from './character'

export interface MonsterCreateInput extends CharacterCreateInput {
  difficulty: Difficulty
  battleZoneId: number
}
