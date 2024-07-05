import db from '@/lib/db'

/**
 *
 * @returns User along with its gladiator and items
 */
export const getUserByWallet = async (walletAddress: string) => {
  let user = await db.user.findFirst({
    where: {
      walletAddress,
    },
    include: {
      gladiator: {
        select: {
          id: true,
        },
      },
      items: {
        select: {
          id: true,
        },
      },
    },
  })

  if (!user) {
    user = await db.user.create({
      data: {
        walletAddress,
      },
      include: {
        gladiator: {
          select: {
            id: true,
          },
        },
        items: {
          select: {
            id: true,
          },
        },
      },
    })
  }

  return user
}

export const deleteUser = async (walletAddress: string) => {
  const user = await db.user.delete({
    where: {
      walletAddress,
    },
  })

  return user
}
