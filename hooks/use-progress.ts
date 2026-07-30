// hooks/use-progress.ts
'use client';

import { useMemo } from 'react';
import { useKnownWords } from './use-known-words';
import { useFavorites } from './use-favorites';
import { useCompletedLessons } from './use-completed-lessons';
import { useWords } from './use-words';
import { Statistics } from '@/types';

export function useProgress() {
  const { allWords, isLoading } = useWords();
  const { knownWords } = useKnownWords();
  const { favorites } = useFavorites();
  const { completedLessons } = useCompletedLessons();

  const statistics: Statistics = useMemo(() => {
    const totalWords = allWords.length;
    const knownCount = knownWords.length;
    const unknownCount = Math.max(0, totalWords - knownCount);
    const favoriteCount = favorites.length;
    const completedDays = completedLessons.length;
    const studyProgress = totalWords > 0 ? Math.round((knownCount / totalWords) * 100) : 0;

    return {
      totalWords,
      knownWords: knownCount,
      unknownWords: unknownCount,
      favoriteWords: favoriteCount,
      completedDays,
      studyProgress,
    };
  }, [allWords.length, knownWords.length, favorites.length, completedLessons.length]);

  return {
    statistics,
    isLoading,
  };
}
