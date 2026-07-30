// types/index.ts
export interface Word {
  id: number;
  english: string;
  turkish: string;
  arabic: string;
}

export interface DayData {
  day: number;
  words: Word[];
}

export interface UserWordProgress {
  wordId: number;
  favorite: boolean;
  known: boolean;
}

export interface QuizQuestion {
  word: Word;
  options: string[];
  correctAnswer: string;
  userAnswer?: string;
  answered: boolean;
}

export interface QuizResult {
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  accuracy: number;
  wrongWords: Word[];
}

export interface Statistics {
  totalWords: number;
  knownWords: number;
  unknownWords: number;
  favoriteWords: number;
  completedDays: number;
  studyProgress: number;
}

export type Language = 'en' | 'tr' | 'ar';
export type QuizMode = 'en-tr' | 'en-ar' | 'tr-en' | 'ar-en';
export type Theme = 'light' | 'dark' | 'system';

export interface UserPreferences {
  theme: Theme;
  language: Language;
  wordsPerStudy: number;
  hideTranslations: boolean;
}

export interface LocalStorageData {
  favorites: number[];
  known: number[];
  completedLessons: number[];
  quizHistory: QuizResult[];
  wrongAnswers: number[];
  preferences: UserPreferences;
}