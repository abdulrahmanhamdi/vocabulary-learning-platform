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

export interface SearchFilterFormValues {
  query: string;
  sortBy: 'az' | 'za';
  filterBy: 'all' | 'favorites' | 'known' | 'unknown';
}

export interface QuizSetupFormValues {
  type: 'daily' | 'all' | 'favorites' | 'unknown';
  mode: QuizMode;
  questionCount: number;
}

export interface UserPreferencesFormValues {
  theme: 'light' | 'dark' | 'system';
  language: 'en' | 'tr' | 'ar';
  wordsPerStudy: number;
  hideTranslations: boolean;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  success: boolean;
}

export interface WordsApiResponse extends ApiResponse<Word[]> {
  total: number;
  page?: number;
  pageSize?: number;
}

export interface DayApiResponse extends ApiResponse<DayData> {
  day: number;
}

export interface QuizResultApiResponse extends ApiResponse<QuizResult> {
  id?: string;
}
