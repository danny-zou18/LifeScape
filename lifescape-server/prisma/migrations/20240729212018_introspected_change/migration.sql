/*
  Warnings:

  - You are about to drop the column `Dexterity` on the `Character` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Class" AS ENUM ('NONE', 'WARRIOR', 'MAGE', 'ROGUE', 'RANGER', 'CLERIC', 'ASSASSIN');

-- CreateEnum
CREATE TYPE "Subclass" AS ENUM ('NONE', 'BERSERKER', 'PALADIN', 'GUARDIAN', 'DESTROYER', 'SLAYER', 'SORCERER', 'SUMMONER', 'ELEMENTALIST', 'NECROMANCER', 'ALCHEMIST', 'THIEF', 'SHARPSHOOTER', 'GUNSLINGER', 'ARTILLERIST', 'PRIEST', 'MONK', 'DRUID', 'SHAMAN', 'BARD', 'NINJA', 'SOULREAPER', 'SHADOWHUNTER', 'DEATHBLADE', 'NIGHTSTALKER');

-- CreateEnum
CREATE TYPE "DifficultyRank" AS ENUM ('F', 'E', 'D', 'C', 'B', 'A', 'S', 'SS', 'SSS');

-- CreateEnum
CREATE TYPE "Repeat" AS ENUM ('DAILY', 'WEEKLY', 'MONTHLY');

-- DropIndex
DROP INDEX "Character_name_key";

-- AlterTable
ALTER TABLE "Character" DROP COLUMN "Dexterity",
ADD COLUMN     "TotalHabitsDone" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "TotalRoutinesDone" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "TotalTasksDone" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "agilityXp" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "class" "Class" DEFAULT 'NONE',
ADD COLUMN     "defenseXp" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "enduranceXp" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "gold" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "maxEnergy" INTEGER NOT NULL DEFAULT 100,
ADD COLUMN     "maxHealth" INTEGER NOT NULL DEFAULT 100,
ADD COLUMN     "maxMana" INTEGER NOT NULL DEFAULT 50,
ADD COLUMN     "strengthXp" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "subclass" "Subclass" DEFAULT 'NONE',
ADD COLUMN     "vitalityXp" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "willXp" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "Friendship" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "friend_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Friendship_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dueDate" TIMESTAMP(3),
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "experienceReward" INTEGER,
    "goldReward" INTEGER,
    "StrengthReward" INTEGER,
    "DefenseReward" INTEGER,
    "AgilityReward" INTEGER,
    "VitalityReward" INTEGER,
    "EnduranceReward" INTEGER,
    "WillReward" INTEGER,
    "CharacterId" INTEGER NOT NULL,
    "difficultyRank" "DifficultyRank" NOT NULL DEFAULT 'E',

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Habit" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "streak" INTEGER NOT NULL DEFAULT 0,
    "repeat" "Repeat" NOT NULL DEFAULT 'DAILY',
    "completionGoalWeekly" INTEGER,
    "completionGoalMonthly" INTEGER,
    "quitting" BOOLEAN NOT NULL DEFAULT false,
    "difficultyRank" "DifficultyRank" NOT NULL DEFAULT 'E',
    "experienceReward" INTEGER,
    "goldReward" INTEGER,
    "StrengthReward" INTEGER,
    "DefenseReward" INTEGER,
    "AgilityReward" INTEGER,
    "VitalityReward" INTEGER,
    "EnduranceReward" INTEGER,
    "WillReward" INTEGER,
    "CharacterId" INTEGER NOT NULL,
    "currentCompletions" INTEGER NOT NULL DEFAULT 0,
    "lastCompleted" TIMESTAMP(3),
    "completeBy" TIMESTAMP(3),
    "totalCompletion" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Habit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Routine" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "daysOfWeek" INTEGER[],
    "startTimeOfDayInMinutes" INTEGER NOT NULL,
    "difficultyRank" "DifficultyRank" NOT NULL DEFAULT 'E',
    "experienceReward" INTEGER,
    "goldReward" INTEGER,
    "StrengthReward" INTEGER,
    "DefenseReward" INTEGER,
    "AgilityReward" INTEGER,
    "VitalityReward" INTEGER,
    "EnduranceReward" INTEGER,
    "WillReward" INTEGER,
    "CharacterId" INTEGER NOT NULL,
    "endTimeOfDayInMinutes" INTEGER NOT NULL,
    "lastCompleted" TIMESTAMP(3),

    CONSTRAINT "Routine_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Friendship_user_id_friend_id_key" ON "Friendship"("user_id", "friend_id");

-- CreateIndex
CREATE UNIQUE INDEX "Friendship_friend_id_user_id_key" ON "Friendship"("friend_id", "user_id");

-- AddForeignKey
ALTER TABLE "Friendship" ADD CONSTRAINT "Friendship_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friendship" ADD CONSTRAINT "Friendship_friend_id_fkey" FOREIGN KEY ("friend_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_CharacterId_fkey" FOREIGN KEY ("CharacterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Habit" ADD CONSTRAINT "Habit_CharacterId_fkey" FOREIGN KEY ("CharacterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Routine" ADD CONSTRAINT "Routine_CharacterId_fkey" FOREIGN KEY ("CharacterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
