import { DEFAULTS } from '@/helpers/constants'
import { getStatCorrespondingValue } from '@/helpers/stats'
import db from '@/lib/db'
import { GladiatorCreateInput, ItemFieldType } from '@/types/gladiator'
import { CharacterStats } from '@/types/stats'
import { StatType } from '@prisma/client'

/**
 *
 * @param publicKey of the user
 * @returns Gladiator along with Character, Character Stats, Equipped Items and Monster stats
 */
export const getGladiatorByWallet = async (publicKey: string) => {
  const gladiator = await db.gladiator.findFirst({
    where: {
      ownerWallet: publicKey,
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
      equippedItems: true,
    },
  })

  if (!gladiator) {
    throw new Error('Gladiator not found')
  }

  return gladiator
}

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
  //Check if sum of stat distribution is valid
  const sum = Object.values(statDistribution).reduce(
    (acc, curr) => acc + curr,
    0,
  )

  if (sum !== DEFAULTS.BASE_STAT_COUNT + DEFAULTS.AVAILABLE_STAT_PER_LEVEL) {
    throw new Error(
      'Stat distribution must sum to ' +
        (DEFAULTS.BASE_STAT_COUNT + DEFAULTS.AVAILABLE_STAT_PER_LEVEL),
    )
  }

  const startMaxHealth = getStatCorrespondingValue(
    StatType.VIT,
    statDistribution.VIT,
  )

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
  })

  return gladiator
}

/**
 * Equips an item to a gladiator.
 * @param {number} params.gladiatorId - The ID of the gladiator.
 * @param {number} params.itemId - The ID of the item.
 *
 * @returns {Promise} The updated equipped items for the gladiator.
 *
 * @throws {Error} Will throw an error if the item or gladiator does not exist, or if the gladiator's level is too low to equip the item.
 */
export const equipItemToGladiator = async ({
  gladiatorId,
  itemId,
}: {
  gladiatorId: number
  itemId: number
}) => {
  //Check if item exists
  const item = await db.item.findUnique({
    where: { id: itemId },
  })

  if (!item) {
    throw new Error('Item not found')
  }

  //Check if gladiator exists
  const gladiator = await db.gladiator.findUnique({
    where: { id: gladiatorId },
    include: {
      character: true,
    },
  })

  if (!gladiator) {
    throw new Error('Gladiator not found')
  }

  //Check if gladiator level meets item minLevel requirement
  if (gladiator.character.level < item.minLevel) {
    throw new Error('Gladiator level is too low to equip this item')
  }

  let equippedItems = await db.equippedItems.findUnique({
    where: { gladiatorId: gladiatorId },
  })

  // If the gladiator doesn't have any equipped items yet, create a new record
  if (!equippedItems) {
    equippedItems = await db.equippedItems.create({
      data: { gladiatorId: gladiatorId },
    })
  }

  // Now, equip the item to the gladiator based on its type
  const itemField = (item.itemType.toLowerCase() + 'Id') as ItemFieldType
  equippedItems[itemField] = itemId

  // Finally, update the equipped items for the gladiator
  equippedItems = await db.equippedItems.update({
    where: { id: equippedItems.id },
    data: equippedItems,
    include: {
      [item.itemType.toLowerCase()]: true,
    },
  })

  return equippedItems
}

/**
 * Updates the stats of a gladiator.
 *
 * @param {Object} params - The function parameters.
 * @param {number} params.gladiatorId - The ID of the gladiator to update.
 * @param {CharacterStats} params.newStats - The new stats for the gladiator's character.
 * @returns {Promise<Gladiator>} The updated gladiator.
 * @throws {Error} If the gladiator is not found.
 * @throws {Error} If any of the new stats are less than the existing stats.
 * @throws {Error} If the sum of the new stats is greater than the gladiator's available stat points.
 */
export const updateGladiatorStats = async ({
  gladiatorId,
  newStats,
}: {
  gladiatorId: number
  newStats: CharacterStats
}) => {
  const gladiator = await db.gladiator.findUnique({
    where: { id: gladiatorId },
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
    },
  })

  if (!gladiator) {
    throw new Error('Gladiator not found')
  }

  const existingStats = gladiator.character.characterStat.reduce(
    (acc, stat) => {
      acc[stat.statType] = stat.value
      return acc
    },
    {} as CharacterStats,
  )

  //Check that existing stats have not been decreased
  for (const [statType, value] of Object.entries(newStats)) {
    if (value < existingStats[statType as StatType]) {
      throw new Error('Stats cannot be decreased')
    }
  }

  //Calculate the difference between the new stats sum and existing stats sum
  const diff =
    Object.values(newStats).reduce((acc, curr) => acc + curr, 0) -
    Object.values(existingStats).reduce((acc, curr) => acc + curr, 0)

  //Check that the difference is not greater than the available stat points
  if (diff > gladiator.character.availableStatPoints) {
    throw new Error('Not enough available stat points')
  }

  const updates = await db.$transaction([
    db.gladiator.update({
      where: { id: gladiatorId },
      data: {
        character: {
          update: {
            availableStatPoints: {
              decrement: diff,
            },
          },
        },
      },
      include: {
        character: {
          include: {
            characterStat: true,
          },
        },
        monsterGladiatorStats: true,
        equippedItems: true,
      },
    }),
    ...Object.entries(newStats).map(([statType, value]) => {
      return db.characterStat.update({
        where: {
          characterId_statType: {
            characterId: gladiator.characterId,
            statType: statType as StatType,
          },
        },
        data: { value },
      })
    }),
  ])

  const updatedGladiator = updates[0]

  return updatedGladiator
}

/**
 * Unequips an item to a gladiator.
 * @param {number} params.gladiatorId - The ID of the gladiator.
 * @param {number} params.itemId - The ID of the item.
 *
 * @returns {Promise} The updated equipped items for the gladiator.
 *
 * @throws {Error} Will throw an error if the item or gladiator does not exist, or if the gladiator's level is too low to equip the item.
 */
export const unequipItemToGladiator = async ({
  gladiatorId,
  itemId,
}: {
  gladiatorId: number
  itemId: number
}) => {
  //Check if item exists
  const item = await db.item.findUnique({
    where: { id: itemId },
  })

  if (!item) {
    throw new Error('Item not found')
  }

  //Check if gladiator exists
  const gladiator = await db.gladiator.findUnique({
    where: { id: gladiatorId },
    include: {
      character: true,
      equippedItems: true,
    },
  })

  if (!gladiator) {
    throw new Error('Gladiator not found')
  } else if (!gladiator.equippedItems) {
    throw new Error('Item is not equipped to the gladiator')
  }

  //Check if gladiator level meets item minLevel requirement
  if (gladiator.character.level < item.minLevel) {
    throw new Error('Gladiator level is too low to equip this item')
  }

  const itemField = (item.itemType.toLowerCase() + 'Id') as ItemFieldType

  //Check if item is equipped to the gladiator
  const equippedItemId = gladiator.equippedItems[itemField]

  // If the gladiator doesn't have any equipped items yet, create a new record
  if (!equippedItemId || equippedItemId !== itemId) {
    throw new Error('Item is not equipped to the gladiator')
  }

  gladiator.equippedItems[itemField] = null

  // Update the equipped items for the gladiator
  const updatedEquippedItems = await db.equippedItems.update({
    where: { id: gladiator.equippedItems.id },
    data: gladiator.equippedItems,
    include: {
      [item.itemType.toLowerCase()]: true,
    },
  })

  return updatedEquippedItems
}

export const deleteGladiator = async (gladiatorId: number) => {
  // Get the gladiator's characterId
  const gladiator = await db.gladiator.findUnique({
    where: { id: gladiatorId },
    select: { characterId: true },
  })

  if (!gladiator) {
    throw new Error('Gladiator not found')
  }

  // Delete the equipped items associated with the gladiator
  const deleteEquippedItems = db.equippedItems.deleteMany({
    where: { gladiatorId: gladiatorId },
  })

  // Delete the gladiator
  const deleteGladiator = db.gladiator.delete({
    where: { id: gladiatorId },
  })

  // Delete the character stats associated with the gladiator's character
  const deleteCharacterStats = db.characterStat.deleteMany({
    where: { characterId: gladiator.characterId },
  })

  // Delete the character associated with the gladiator
  const deleteCharacter = db.character.delete({
    where: { id: gladiator.characterId },
  })

  // Perform all operations in a single transaction
  const [_, __, ___, deletedGladiator] = await db.$transaction([
    deleteEquippedItems,
    deleteGladiator,
    deleteCharacterStats,
    deleteCharacter,
  ])

  return deletedGladiator
}
