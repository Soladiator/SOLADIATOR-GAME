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
  const item = await db.item.findFirst({
    where: {id: itemId},
    select: {
      weaponEquippedBy: true,
      armorEquippedBy: true,
      helmetEquippedBy: true,
      shieldEquippedBy: true,
      bootsEquippedBy: true,
      glovesEquippedBy: true,
      ring1EquippedBy: true,
      ring2EquippedBy: true,
      necklaceEquippedBy: true,
    },
  });

  if (!item) {
    throw new Error("Item not found");
  }

  const isEquipped = Object.values(item).some((relation) => relation !== null);

  if (isEquipped) {
    throw new Error("Item is currently equipped and cannot be deleted");
  }

  const deletedItem = await db.item.delete({
    where: {id: itemId},
  });

  return deletedItem;
};

export const getItem = async (itemId: number) => {
  const item = await db.item.findFirst({
    where: {
      id: itemId,
    },
  });

  if (!item) {
    throw new Error("Item not found");
  }

  return item;
};
