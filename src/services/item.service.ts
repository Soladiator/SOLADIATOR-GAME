import db from "@/lib/db";
import {ItemCreateInput} from "@/types/items";
import {Prisma} from "@prisma/client";

export const createItem = async ({
  name,
  itemType,
  minLevel,
  ownerWallet,
  attributes,
}: ItemCreateInput) => {
  const typedAttributes = [...attributes] as any as Prisma.JsonArray;

  const item = await db.item.create({
    data: {
      name,
      itemType,
      minLevel,
      ownerWallet,
      attributes: typedAttributes,
    },
  });

  return item;
};

export const deleteItem = async (itemId: number) => {
  const item = await db.item.delete({
    where: {
      id: itemId,
    },
  });

  return item;
};
