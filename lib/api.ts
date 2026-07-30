// lib/api.ts
import { Word, DayData } from '@/types';
import allWordsData from '@/data/all-words.json';
import { generateDaysFromWords } from '@/hooks/use-words';
import { DEFAULT_WORDS_PER_DAY } from '@/lib/constants';

export async function fetchAllWords(): Promise<Word[]> {
  return Promise.resolve(allWordsData as Word[]);
}

export async function fetchDayData(dayNumber: number): Promise<DayData | null> {
  const words = allWordsData as Word[];
  const days = generateDaysFromWords(words, DEFAULT_WORDS_PER_DAY);
  const dayData = days.find((d) => d.day === dayNumber);
  return Promise.resolve(dayData || null);
}

export async function fetchWordById(id: number): Promise<Word | undefined> {
  const words = allWordsData as Word[];
  return Promise.resolve(words.find((w) => w.id === id));
}
