-- CreateEnum
CREATE TYPE "ItemType" AS ENUM ('Weapon', 'Armor', 'Boots', 'Helmet', 'Shield', 'Gloves', 'Ring', 'Necklace');

-- CreateEnum
CREATE TYPE "StatType" AS ENUM ('STR', 'VIT', 'DEX', 'DEF', 'LCK');

-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('Easy', 'Medium', 'Hard', 'Boss');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female');

-- CreateEnum
CREATE TYPE "MonsterBonusTypes" AS ENUM ('IncreasedExperience', 'IncreasedGold', 'IncreasedItemDrop');

-- CreateTable
CREATE TABLE "User" (
    "walletAddress" TEXT NOT NULL,
    "username" TEXT,
    "avatarURL" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("walletAddress")
);

-- CreateTable
CREATE TABLE "Gladiator" (
    "id" SERIAL NOT NULL,
    "characterId" INTEGER NOT NULL,
    "ownerWallet" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
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
    "imgURL" TEXT,
    "itemType" "ItemType" NOT NULL,
    "minLevel" INTEGER NOT NULL DEFAULT 1,
    "attributes" JSONB NOT NULL,
    "ownerWallet" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

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

-- CreateTable
CREATE TABLE "Monster" (
    "id" SERIAL NOT NULL,
    "characterId" INTEGER NOT NULL,
    "difficulty" "Difficulty" NOT NULL,
    "battleZoneId" INTEGER NOT NULL,
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
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "minLevel" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BattleZone_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Gladiator_characterId_key" ON "Gladiator"("characterId");

-- CreateIndex
CREATE UNIQUE INDEX "Gladiator_ownerWallet_key" ON "Gladiator"("ownerWallet");

-- CreateIndex
CREATE UNIQUE INDEX "CharacterStat_characterId_statType_key" ON "CharacterStat"("characterId", "statType");

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
ALTER TABLE "Monster" ADD CONSTRAINT "Monster_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Monster" ADD CONSTRAINT "Monster_battleZoneId_fkey" FOREIGN KEY ("battleZoneId") REFERENCES "BattleZone"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MonsterGladiatorStat" ADD CONSTRAINT "MonsterGladiatorStat_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Monster"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MonsterGladiatorStat" ADD CONSTRAINT "MonsterGladiatorStat_gladiatorId_fkey" FOREIGN KEY ("gladiatorId") REFERENCES "Gladiator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MonsterBonus" ADD CONSTRAINT "MonsterBonus_monsterId_fkey" FOREIGN KEY ("monsterId") REFERENCES "Monster"("id") ON DELETE SET NULL ON UPDATE CASCADE;
