// hooks/use-words.ts
'use client';

import { useState, useEffect, useMemo } from 'react';
import { Word, generateDaysFromWords, DEFAULT_WORDS_PER_DAY } from '@vocabulary/shared';
import { fetchAllWords } from '@/lib/api';

export { generateDaysFromWords };

export function useWords() {
  const [allWords, setAllWords] = useState<Word[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    fetchAllWords()
      .then((words) => {
        if (isMounted) {
          setAllWords(words);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error('Error loading words:', error);
        if (isMounted) {
          setIsLoading(false);
        }
      });
    return () => {
      isMounted = false;
    };
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