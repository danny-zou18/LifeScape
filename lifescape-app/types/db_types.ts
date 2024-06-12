interface User {
  id: string;
  username: string;
  email: string;
  emailVerified?: Date | null;
  name: string;
  createdAt: Date;
  character?: Character | null;
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
  Dexterity: number;
  Agility: number;
  Vitality: number;
  Endurance: number;
  Will: number;
  Owner: User; // Assuming User is another type/interface
  OwnerId: string;
  Tasks: Task[]; // Assuming Task is another type/interface
}

interface Task {
  id: number;
  title: string;
  description?: string | null;
  createdAt: Date;
  dueDate?: Date | null;
  completed: boolean;
  experienceReward?: number | null;
  goldReward?: number | null;
  StrengthReward?: number | null;
  DefenseReward?: number | null;
  DexterityReward?: number | null;
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

export { User, Character, Task }