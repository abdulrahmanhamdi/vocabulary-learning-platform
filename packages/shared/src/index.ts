import { Word, DayData } from './types';
import { DEFAULT_WORDS_PER_DAY } from './constants';
import allWordsData from './data/all-words.json';

export * from './types';
export * from './constants';

export const allWords = allWordsData as Word[];

export function generateDaysFromWords(
  words: Word[],
  wordsPerDay: number = DEFAULT_WORDS_PER_DAY
): DayData[] {
  if (!words || words.length === 0 || wordsPerDay <= 0) return [];

  const daysCount = Math.ceil(words.length / wordsPerDay);
  const days: DayData[] = [];

  for (let i = 0; i < daysCount; i++) {
    const start = i * wordsPerDay;
    const end = start + wordsPerDay;
    days.push({
      day: i + 1,
      words: words.slice(start, end),
    });
  }

  return days;
}
