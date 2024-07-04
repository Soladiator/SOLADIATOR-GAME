import db from "@/lib/db";

export const getUserByWallet = async (walletAddress: string) => {
  let user = await db.user.findFirst({
    where: {
      walletAddress,
    },
  });

  if (!user) {
    user = await db.user.create({
      data: {
        walletAddress,
      },
    });
  }

  return user;
};

export const deleteUser = async (walletAddress: string) => {
  const user = await db.user.delete({
    where: {
      walletAddress,
    },
  });

  return user;
};
