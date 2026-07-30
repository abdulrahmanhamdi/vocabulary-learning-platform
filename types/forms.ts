// types/forms.ts
import { QuizMode } from './index';

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
