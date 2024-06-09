/*
  Warnings:

  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `hashedPassword` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
DROP COLUMN "hashedPassword",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "users_id_seq";

-- CreateTable
CREATE TABLE "Character" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 1,
    "experience" INTEGER NOT NULL DEFAULT 0,
    "health" INTEGER NOT NULL DEFAULT 100,
    "mana" INTEGER NOT NULL DEFAULT 50,
    "energy" INTEGER NOT NULL DEFAULT 100,
    "Strength" INTEGER NOT NULL DEFAULT 10,
    "Defense" INTEGER NOT NULL DEFAULT 10,
    "Dexterity" INTEGER NOT NULL DEFAULT 10,
    "Agility" INTEGER NOT NULL DEFAULT 10,
    "Vitality" INTEGER NOT NULL DEFAULT 10,
    "Endurance" INTEGER NOT NULL DEFAULT 10,
    "Will" INTEGER NOT NULL DEFAULT 10,
    "OwnerId" TEXT NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Character_name_key" ON "Character"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Character_OwnerId_key" ON "Character"("OwnerId");

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_OwnerId_fkey" FOREIGN KEY ("OwnerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
