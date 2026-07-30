// types/api.ts
import { Word, DayData, QuizResult } from './index';

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
