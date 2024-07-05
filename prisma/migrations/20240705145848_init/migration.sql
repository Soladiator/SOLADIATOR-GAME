/*
  Warnings:

  - You are about to drop the `ItemStat` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `gender` to the `Gladiator` table without a default value. This is not possible if the table is not empty.
  - Made the column `battleZoneName` on table `Monster` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female');

-- DropForeignKey
ALTER TABLE "ItemStat" DROP CONSTRAINT "ItemStat_itemId_fkey";

-- DropForeignKey
ALTER TABLE "Monster" DROP CONSTRAINT "Monster_battleZoneName_fkey";

-- DropIndex
DROP INDEX "Item_ownerWallet_key";

-- AlterTable
ALTER TABLE "Gladiator" ADD COLUMN     "gender" "Gender" NOT NULL;

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "imgURL" TEXT;

-- AlterTable
ALTER TABLE "Monster" ALTER COLUMN "battleZoneName" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avatarURL" TEXT,
ADD COLUMN     "username" TEXT;

-- DropTable
DROP TABLE "ItemStat";

-- CreateTable
CREATE TABLE "EquippedItems" (
    "id" SERIAL NOT NULL,
    "gladiatorId" INTEGER NOT NULL,
    "weaponId" INTEGER,
    "armorId" INTEGER,
    "helmetId" INTEGER,
    "shieldId" INTEGER,
    "bootsId" INTEGER,
    "glovesId" INTEGER,
    "ring1Id" INTEGER,
    "ring2Id" INTEGER,
    "necklaceId" INTEGER,

    CONSTRAINT "EquippedItems_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EquippedItems_gladiatorId_key" ON "EquippedItems"("gladiatorId");

-- CreateIndex
CREATE UNIQUE INDEX "EquippedItems_weaponId_key" ON "EquippedItems"("weaponId");

-- CreateIndex
CREATE UNIQUE INDEX "EquippedItems_armorId_key" ON "EquippedItems"("armorId");

-- CreateIndex
CREATE UNIQUE INDEX "EquippedItems_helmetId_key" ON "EquippedItems"("helmetId");

-- CreateIndex
CREATE UNIQUE INDEX "EquippedItems_shieldId_key" ON "EquippedItems"("shieldId");

-- CreateIndex
CREATE UNIQUE INDEX "EquippedItems_bootsId_key" ON "EquippedItems"("bootsId");

-- CreateIndex
CREATE UNIQUE INDEX "EquippedItems_glovesId_key" ON "EquippedItems"("glovesId");

-- CreateIndex
CREATE UNIQUE INDEX "EquippedItems_ring1Id_key" ON "EquippedItems"("ring1Id");

-- CreateIndex
CREATE UNIQUE INDEX "EquippedItems_ring2Id_key" ON "EquippedItems"("ring2Id");

-- CreateIndex
CREATE UNIQUE INDEX "EquippedItems_necklaceId_key" ON "EquippedItems"("necklaceId");

-- AddForeignKey
ALTER TABLE "EquippedItems" ADD CONSTRAINT "EquippedItems_gladiatorId_fkey" FOREIGN KEY ("gladiatorId") REFERENCES "Gladiator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EquippedItems" ADD CONSTRAINT "EquippedItems_weaponId_fkey" FOREIGN KEY ("weaponId") REFERENCES "Item"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EquippedItems" ADD CONSTRAINT "EquippedItems_armorId_fkey" FOREIGN KEY ("armorId") REFERENCES "Item"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EquippedItems" ADD CONSTRAINT "EquippedItems_helmetId_fkey" FOREIGN KEY ("helmetId") REFERENCES "Item"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EquippedItems" ADD CONSTRAINT "EquippedItems_shieldId_fkey" FOREIGN KEY ("shieldId") REFERENCES "Item"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EquippedItems" ADD CONSTRAINT "EquippedItems_bootsId_fkey" FOREIGN KEY ("bootsId") REFERENCES "Item"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EquippedItems" ADD CONSTRAINT "EquippedItems_glovesId_fkey" FOREIGN KEY ("glovesId") REFERENCES "Item"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EquippedItems" ADD CONSTRAINT "EquippedItems_ring1Id_fkey" FOREIGN KEY ("ring1Id") REFERENCES "Item"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EquippedItems" ADD CONSTRAINT "EquippedItems_ring2Id_fkey" FOREIGN KEY ("ring2Id") REFERENCES "Item"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EquippedItems" ADD CONSTRAINT "EquippedItems_necklaceId_fkey" FOREIGN KEY ("necklaceId") REFERENCES "Item"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Monster" ADD CONSTRAINT "Monster_battleZoneName_fkey" FOREIGN KEY ("battleZoneName") REFERENCES "BattleZone"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
