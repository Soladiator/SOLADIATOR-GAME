import db from "@/lib/db";

export const getMonsters = async () => {
  const monsters = await db.monster.findMany({
    include: {
      character: {
        select: {
          name: true,
          currentHealth: true,
          availableStatPoints: true,
          characterStat: {
            select: {
              statType: true,
              value: true,
            },
          },
        },
      },
    },
  });
};
