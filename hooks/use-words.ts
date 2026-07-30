// hooks/use-words.ts
'use client';

import { useState, useEffect, useMemo } from 'react';
import { Word, DayData } from '@/types';
import allWordsData from '@/data/all-words.json';
import { DEFAULT_WORDS_PER_DAY } from '@/lib/constants';

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

export function useWords() {
  const [allWords, setAllWords] = useState<Word[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const words = allWordsData as Word[];
      setAllWords(words);
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading words:', error);
      setIsLoading(false);
    }
  }, []);

  const days = useMemo(
    () => generateDaysFromWords(allWords, DEFAULT_WORDS_PER_DAY),
    [allWords]
  );

  const getWordsForDay = (day: number): Word[] => {
    const dayEntry = days.find((d) => d.day === day);
    return dayEntry?.words || [];
  };

  const getWordById = (id: number): Word | undefined => {
    return allWords.find((w) => w.id === id);
  };

  const getTotalWords = (): number => allWords.length;

  const getTotalDays = (): number => days.length;

  return {
    allWords,
    days,
    isLoading,
    getWordsForDay,
    getWordById,
    getTotalWords,
    getTotalDays,
  };
}