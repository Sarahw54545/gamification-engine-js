export interface GamificationEvent {
  type: string;
}

export interface AchievementCriteria {
  type: "event" | "counter" | "total";
  event: string;
}

export interface AchievementTier {
  threshold: number;
  xp: number;
  label?: string;
}

export interface AchievementDefinition {
  key: string;
  type: "daily" | "progressive";
  title: string;
  description: string;
  criteria: AchievementCriteria;
  xp?: number;
  tiers?: AchievementTier[];
}

export interface AchievementState {
  completedTiers?: number[];
  lastCompletedDate?: Date | null;
}

export interface UserState {
  userId: string;
  totalXp: number;
  counters: Record<string, number>;
  achievements: Record<string, AchievementState>;
}

export interface GamificationResult {
  xpAwarded: number;
  totalXp: number;
  unlockedAchievements: Array<{
    key: string;
    xp: number;
    type?: string;
    tier?: number;
    label?: string;
  }>;
  progressedAchievements: Array<{
    key: string;
    currentValue: number;
    nextThreshold: number;
  }>;
}

export function evaluateGamification(options: {
  userState: UserState;
  event: GamificationEvent;
  achievements: AchievementDefinition[];
  today: Date;
}): GamificationResult;

export function calculateLevel(totalXp: number, baseXp?: number): number;
export function xpForNextLevel(level: number, baseXp?: number): number;