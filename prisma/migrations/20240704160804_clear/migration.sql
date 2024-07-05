/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - Added the required column `walletAddress` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ItemType" AS ENUM ('Weapon', 'Armor', 'Boots', 'Helmet', 'Shield', 'Gloves', 'Ring', 'Necklace');

-- CreateEnum
CREATE TYPE "StatType" AS ENUM ('STR', 'VIT', 'DEX', 'DEF', 'LCK');

-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('Easy', 'Medium', 'Hard', 'Boss');

-- CreateEnum
CREATE TYPE "MonsterBonusTypes" AS ENUM ('IncreasedExperience', 'IncreasedGold', 'IncreasedItemDrop');

-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "email",
DROP COLUMN "id",
DROP COLUMN "name",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "walletAddress" TEXT NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("walletAddress");

-- CreateTable
CREATE TABLE "Gladiator" (
    "id" SERIAL NOT NULL,
    "characterId" INTEGER NOT NULL,
    "ownerWallet" TEXT NOT NULL,
    "maxEnergy" INTEGER NOT NULL DEFAULT 100,
    "currentEnergy" INTEGER NOT NULL DEFAULT 100,
    "lastEnergyRefresh" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "energyRefreshRate" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "Gladiator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Character" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 1,
    "currentHealth" INTEGER NOT NULL,
    "lastHealthRefresh" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "healthRefreshRate" INTEGER NOT NULL DEFAULT 1,
    "experience" INTEGER NOT NULL DEFAULT 0,
    "availableStatPoints" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CharacterStat" (
    "id" SERIAL NOT NULL,
    "statType" "StatType" NOT NULL,
    "value" INTEGER NOT NULL DEFAULT 5,
    "characterId" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CharacterStat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "itemType" "ItemType" NOT NULL,
    "minLevel" INTEGER NOT NULL DEFAULT 1,
    "attributes" JSONB NOT NULL,
    "ownerWallet" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemStat" (
    "id" SERIAL NOT NULL,
    "statType" "StatType" NOT NULL,
    "value" INTEGER NOT NULL,
    "itemId" INTEGER,

    CONSTRAINT "ItemStat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Monster" (
    "id" SERIAL NOT NULL,
    "characterId" INTEGER NOT NULL,
    "difficulty" "Difficulty" NOT NULL,
    "battleZoneName" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Monster_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MonsterGladiatorStat" (
    "id" SERIAL NOT NULL,
    "characterId" INTEGER NOT NULL,
    "gladiatorId" INTEGER NOT NULL,
    "gladiatorWins" INTEGER NOT NULL DEFAULT 0,
    "gladiatorLoss" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MonsterGladiatorStat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MonsterBonus" (
    "id" SERIAL NOT NULL,
    "bonusType" "MonsterBonusTypes" NOT NULL,
    "value" INTEGER NOT NULL,
    "monsterId" INTEGER,
    "requiredWins" INTEGER NOT NULL,

    CONSTRAINT "MonsterBonus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BattleZone" (
    "name" TEXT NOT NULL,
    "minLevel" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BattleZone_pkey" PRIMARY KEY ("name")
);

-- CreateIndex
CREATE UNIQUE INDEX "Gladiator_characterId_key" ON "Gladiator"("characterId");

-- CreateIndex
CREATE UNIQUE INDEX "Gladiator_ownerWallet_key" ON "Gladiator"("ownerWallet");

-- CreateIndex
CREATE UNIQUE INDEX "CharacterStat_characterId_statType_key" ON "CharacterStat"("characterId", "statType");

-- CreateIndex
CREATE UNIQUE INDEX "Item_ownerWallet_key" ON "Item"("ownerWallet");

-- CreateIndex
CREATE UNIQUE INDEX "Monster_characterId_key" ON "Monster"("characterId");

-- CreateIndex
CREATE UNIQUE INDEX "MonsterGladiatorStat_gladiatorId_characterId_key" ON "MonsterGladiatorStat"("gladiatorId", "characterId");

-- AddForeignKey
ALTER TABLE "Gladiator" ADD CONSTRAINT "Gladiator_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gladiator" ADD CONSTRAINT "Gladiator_ownerWallet_fkey" FOREIGN KEY ("ownerWallet") REFERENCES "User"("walletAddress") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterStat" ADD CONSTRAINT "CharacterStat_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_ownerWallet_fkey" FOREIGN KEY ("ownerWallet") REFERENCES "User"("walletAddress") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemStat" ADD CONSTRAINT "ItemStat_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Monster" ADD CONSTRAINT "Monster_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Monster" ADD CONSTRAINT "Monster_battleZoneName_fkey" FOREIGN KEY ("battleZoneName") REFERENCES "BattleZone"("name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MonsterGladiatorStat" ADD CONSTRAINT "MonsterGladiatorStat_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Monster"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MonsterGladiatorStat" ADD CONSTRAINT "MonsterGladiatorStat_gladiatorId_fkey" FOREIGN KEY ("gladiatorId") REFERENCES "Gladiator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MonsterBonus" ADD CONSTRAINT "MonsterBonus_monsterId_fkey" FOREIGN KEY ("monsterId") REFERENCES "Monster"("id") ON DELETE SET NULL ON UPDATE CASCADE;
