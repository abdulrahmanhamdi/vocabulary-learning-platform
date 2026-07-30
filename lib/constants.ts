// lib/constants.ts
export const APP_NAME = 'VocabLearn';
export const APP_DESCRIPTION = 'Learn English vocabulary with translations in Turkish and Arabic';

export const DEFAULT_WORDS_PER_STUDY = 50;
export const STUDY_BATCH_OPTIONS = [20, 30, 40, 50];

export const STORAGE_KEYS = {
  FAVORITES: 'favorites',
  KNOWN: 'known',
  COMPLETED_LESSONS: 'completedLessons',
  QUIZ_HISTORY: 'quizHistory',
  WRONG_ANSWERS: 'wrongAnswers',
  PREFERENCES: 'preferences',
  LANGUAGE: 'language',
} as const;

export const QUIZ_MODES = [
  { value: 'en-tr', labelKey: 'quiz.modes.en-tr' },
  { value: 'en-ar', labelKey: 'quiz.modes.en-ar' },
  { value: 'tr-en', labelKey: 'quiz.modes.tr-en' },
  { value: 'ar-en', labelKey: 'quiz.modes.ar-en' },
] as const;
