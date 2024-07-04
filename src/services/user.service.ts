import db from "@/lib/db";

export const getUserByWallet = async (publicKey: string) => {
  let user = await db.user.findFirst({
    where: {
      walletAddress: publicKey,
    },
  });

  if (!user) {
    user = await db.user.create({
      data: {
        walletAddress: publicKey,
      },
    });
  }

  return user;
};
