interface User {
  id: string;
  username: string;
  email: string;
  emailVerified?: Date | null;
  name: string;
  createdAt: Date;
  character?: Character | null;
  friends: Friendship[];
  friendShips: Friendship[];
}
interface Friendship {
  id: string;
  user_id: string;
  friend_id: string;
  user_username: string;
  friend_username: string;
  created_at: Date;
  updated_at: Date;
  friend: User;
  user: User;
  status: FriendShipStatus;
}

interface Character {
  id: number;
  name: string;

  level: number;
  gold: number;
  class: Class | null;
  subclass: Subclass | null;
  experience: number;
  health: number;
  maxHealth: number;
  mana: number;
  maxMana: number;
  energy: number;
  maxEnergy: number;

  Strength: number;
  Defense: number;
  Agility: number;
  Vitality: number;
  Endurance: number;
  Will: number;

  strengthXp: number;
  defenseXp: number;
  agilityXp: number;
  vitalityXp: number;
  enduranceXp: number;
  willXp: number;

  Owner: User; // Assuming User is another type/interface
  OwnerId: string;
  Tasks: Task[]; // Assuming Task is another type/interface
  Habits: Habit[]; // Assuming Habit is another type/interface
  Routine: Routine[]; // Assuming Routine is another type/interface

  TotalTasksDone: number;
  TotalHabitsDone: number;
  TotalRoutinesDone: number;
}

interface Task {
  id: number;

  title: string;
  description?: string | null;

  createdAt: Date;
  dueDate?: Date | null;
  completed: boolean;

  difficultyRank: DifficultyRank;

  experienceReward?: number | null;
  goldReward?: number | null;
  StrengthReward?: number | null;
  DefenseReward?: number | null;
  AgilityReward?: number | null;
  VitalityReward?: number | null;
  EnduranceReward?: number | null;
  WillReward?: number | null;

  Character: Character; // Assuming Character is another type/interface
  CharacterId: number;
}

interface Habit {
  id: number;

  title: string;
  description?: string | null;

  createdAt: Date;
  lastCompleted?: Date | null;
  completeBy?: Date | null;
  totalCompletion: number;
  streak: number;

  repeat: Repeat;
  currentCompletions: number;
  completionGoalWeekly?: number | null;
  completionGoalMonthly?: number | null;

  quitting: boolean;

  difficultyRank: DifficultyRank;

  experienceReward?: number | null;
  goldReward?: number | null;
  StrengthReward?: number | null;
  DefenseReward?: number | null;
  AgilityReward?: number | null;
  VitalityReward?: number | null;
  EnduranceReward?: number | null;
  WillReward?: number | null;

  Character: Character; // Assuming Character is another type/interface
  CharacterId: number;
}

interface Routine {
  id: number;

  title: string;
  description?: string | null;

  createdAt: Date;
  lastCompleted?: Date | null;

  daysOfWeek: number[];
  startTimeOfDayInMinutes: number;
  endTimeOfDayInMinutes: number;

  difficultyRank: DifficultyRank;

  experienceReward?: number | null;
  goldReward?: number | null;
  StrengthReward?: number | null;
  DefenseReward?: number | null;
  AgilityReward?: number | null;
  VitalityReward?: number | null;
  EnduranceReward?: number | null;
  WillReward?: number | null;

  Character: Character; // Assuming Character is another type/interface
  CharacterId: number;
}

enum Class {
  NONE = "NONE",
  WARRIOR = "WARRIOR",
  MAGE = "MAGE",
  ROGUE = "ROGUE",
  RANGER = "RANGER",
  CLERIC = "CLERIC",
  ASSASSIN = "ASSASSIN",
}
enum Subclass {
  NONE = "NONE",

  BERSERKER = "BERSERKER",
  PALADIN = "PALADIN",
  GUARDIAN = "GUARDIAN",
  DESTROYER = "DESTROYER",
  SLAYER = "SLAYER",

  SORCERER = "SORCERER",
  SUMMONER = "SUMMONER",
  ELEMENTALIST = "ELEMENTALIST",
  NECROMANCER = "NECROMANCER",
  ALCHEMIST = "ALCHEMIST",

  THIEF = "THIEF",

  SHARPSHOOTER = "SHARPSHOOTER",
  GUNSLINGER = "GUNSLINGER",
  ARTILLERIST = "ARTILLERIST",

  PRIEST = "PRIEST",
  MONK = "MONK",
  DRUID = "DRUID",
  SHAMAN = "SHAMAN",
  BARD = "BARD",

  NINJA = "NINJA",
  SOULREAPER = "SOULREAPER",
  SHADOWHUNTER = "SHADOWHUNTER",
  DEATHBLADE = "DEATHBLADE",
  NIGHTSTALKER = "NIGHTSTALKER",
}

enum DifficultyRank {
  F = "F",
  E = "E",
  D = "D",
  C = "C",
  B = "B",
  A = "A",
  S = "S",
  SS = "SS",
  SSS = "SSS",
}

enum Repeat {
  DAILY = "DAILY",
  WEEKLY = "WEEKLY",
  MONTHLY = "MONTHLY",
}

enum FriendShipStatus {
  PENDING = "PENDING",
  FRIENDS = "FRIENDS",
  DECLINED = "DECLINED",
  BLOCKED = "BLOCKED",
  REMOVED = "REMOVED",
}

export {
  User,
  Friendship,
  FriendShipStatus,
  Character,
  Task,
  Habit,
  Routine,
  Class,
  Subclass,
  DifficultyRank,
  Repeat,
};
