export enum Gender {
  MALE = 'Male',
  FEMALE = 'Female',
  OTHER = 'Prefer not to say'
}

export interface UserProfile {
  age: number;
  gender: Gender;
  location: string;
  currentWeight: number; // in lbs
  targetWeight: number; // in lbs
  activityLevel: string;
  healthConditions?: string;
}

export interface DailyPlan {
  day: string;
  breakfast: string;
  lunch: string;
  dinner: string;
  snack: string;
  exercise: string;
  hydrationGoal: string;
}

export interface WeightLossPlan {
  summary: string;
  dailyCalories: number;
  proteinTarget: number; // grams
  weeklyPlan: DailyPlan[];
  tips: string[];
  motivationalQuote: string;
}

export interface LocalPlace {
  title: string;
  uri: string;
}

export enum AppState {
  ONBOARDING = 'ONBOARDING',
  GENERATING = 'GENERATING',
  DASHBOARD = 'DASHBOARD'
}
