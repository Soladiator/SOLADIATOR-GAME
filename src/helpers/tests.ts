import {
  Character,
  CharacterStat,
  Item,
  ItemType,
  StatType,
} from '@prisma/client'

function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function generateRandomId(length: number): string {
  let result = ''
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result
}

function getRandomBonusType(): StatType | 'damage' | 'damageReduction' {
  const bonusTypes: Array<StatType | 'damage' | 'damageReduction'> = [
    StatType.STR,
    StatType.DEF,
    StatType.DEX,
    StatType.LCK,
    StatType.VIT,
    'damage',
    'damageReduction',
  ]
  return bonusTypes[getRandomInt(0, bonusTypes.length - 1)]
}

export function generateRandomMockCharacter(): Character {
  const nowDate = new Date()

  return {
    id: getRandomInt(1, 10000),
    name: `Test Character ${generateRandomId(5)}`,
    level: getRandomInt(1, 100),
    experience: getRandomInt(0, 10000),
    currentHealth: 100,
    lastHealthRefresh: nowDate,
    healthRefreshRate: getRandomInt(1, 10),
    availableStatPoints: getRandomInt(0, 20),
    createdAt: nowDate,
    updatedAt: nowDate,
  }
}

export function generateRandomMockCharacterStats(
  characterId: number,
): CharacterStat[] {
  const nowDate = new Date()
  const statTypes = [
    StatType.STR,
    StatType.DEF,
    StatType.DEX,
    StatType.LCK,
    StatType.VIT,
  ]
  return statTypes.map((statType, index) => ({
    id: index + 1,
    statType,
    value:
      statType == StatType.VIT ? getRandomInt(20, 30) : getRandomInt(1, 20),
    characterId,
    updatedAt: nowDate,
  }))
}

export function generateRandomMockWeapon(ownerWallet: string): Item {
  const nowDate = new Date()

  const baseDamage = getRandomInt(1, 10)

  return {
    id: getRandomInt(1, 10000),
    itemType: ItemType.Weapon,
    imgURL: null,
    name: 'Test Weapon' + generateRandomId(5),
    attributes: [
      {
        name: 'damage',
        value: `${baseDamage}-${baseDamage + getRandomInt(2, 5)}`,
      },
      {
        name: 'bonus',
        value: `${getRandomBonusType()}:${getRandomInt(1, 5)}`,
      },
      {
        name: 'bonus',
        value: `${getRandomBonusType()}:${getRandomInt(1, 5)}`,
      },
    ],
    minLevel: 1,
    ownerWallet,
    createdAt: nowDate,
  }
}

export function generateRandomMockShield(ownerWallet: string): Item {
  const nowDate = new Date()

  const damageReduction = getRandomInt(1, 10)

  return {
    id: getRandomInt(1, 10000),
    itemType: ItemType.Shield,
    imgURL: null,
    name: 'Test Shield' + generateRandomId(5),
    attributes: [
      {
        name: 'damageReduction',
        value: `${damageReduction}`,
      },
      {
        name: 'bonus',
        value: `${getRandomBonusType()}:${getRandomInt(1, 5)}`,
      },
      {
        name: 'bonus',
        value: `${getRandomBonusType()}:${getRandomInt(1, 5)}`,
      },
    ],
    minLevel: 1,
    ownerWallet,
    createdAt: nowDate,
  }
}

export function generateRandomMockItem(
  itemType: ItemType,
  ownerWallet: string,
): Item {
  if (itemType === ItemType.Shield || itemType === ItemType.Weapon) {
    throw new Error('Item type cannot be Shield or Weapon')
  }

  const nowDate = new Date()

  return {
    id: getRandomInt(1, 10000),
    itemType,
    imgURL: null,
    name: `Test ${ItemType[itemType]} ${generateRandomId(5)}`,
    attributes: [
      {
        name: 'bonus',
        value: `${getRandomBonusType()}:${getRandomInt(1, 5)}`,
      },
      {
        name: 'bonus',
        value: `${getRandomBonusType()}:${getRandomInt(1, 5)}`,
      },
    ],
    minLevel: 1,
    ownerWallet,
    createdAt: nowDate,
  }
}
