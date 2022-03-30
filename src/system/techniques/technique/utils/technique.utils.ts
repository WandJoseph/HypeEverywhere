export enum Proficiency {
  IMPROVISATION = 'improvisation',
  BEGINNER = 'beginner',
  SKILLFUL = 'skillful',
  GRADUATE = 'graduate',
  MASTER = 'master',
  SPECIAL = 'special',
}
export enum Difficulty {
  EASY = 'easy',
  NORMAL = 'normal',
  MEDIUM = 'medium',
  DIFFICULT = 'difficult',
  SPECIAL = 'special',
}

export const ProficiencyModifier = {
  [Proficiency.IMPROVISATION]: -4,
  [Proficiency.BEGINNER]: -1,
  [Proficiency.SKILLFUL]: 0,
  [Proficiency.GRADUATE]: 1,
  [Proficiency.MASTER]: 2,
};

export const DifficultyModifier: {
  [key in Difficulty]?: number;
} = {
  [Difficulty.EASY]: 1,
  [Difficulty.NORMAL]: 0,
  [Difficulty.MEDIUM]: -1,
  [Difficulty.DIFFICULT]: -2,
};
