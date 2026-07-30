// lib/api.ts
import { Word, DayData } from '@/types';
import allWordsData from '@/data/all-words.json';
import day1Data from '@/data/days/day-1.json';

export async function fetchAllWords(): Promise<Word[]> {
  // Simulating async data fetching
  return Promise.resolve(allWordsData as Word[]);
}

export async function fetchDayData(dayNumber: number): Promise<DayData | null> {
  if (dayNumber === 1) {
    return Promise.resolve({
      day: 1,
      words: day1Data as Word[],
    });
  }
  return Promise.resolve(null);
}

export async function fetchWordById(id: number): Promise<Word | undefined> {
  const words = allWordsData as Word[];
  return Promise.resolve(words.find((w) => w.id === id));
}
