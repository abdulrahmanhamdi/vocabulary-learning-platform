// hooks/use-words.ts
'use client';

import { useState, useEffect } from 'react';
import { Word, DayData } from '@/types';
import allWordsData from '@/data/all-words.json';
import dayData from '@/data/days/day-1.json';

export function useWords() {
  const [allWords, setAllWords] = useState<Word[]>([]);
  const [days, setDays] = useState<DayData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be an API call
    // For now, we load from local JSON
    try {
      const words = allWordsData as Word[];
      setAllWords(words);

      // Load all day files dynamically
      // For demo, we'll just use day-1
      const day1 = dayData as Word[];
      setDays([
        {
          day: 1,
          words: day1,
        },
      ]);
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading words:', error);
      setIsLoading(false);
    }
  }, []);

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