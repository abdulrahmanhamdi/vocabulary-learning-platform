// hooks/use-completed-lessons.ts
'use client';

import { useCallback } from 'react';
import { useLocalStorage } from './use-local-storage';

export function useCompletedLessons() {
  const { storedValue: completedLessons, setValue: setCompletedLessons } =
    useLocalStorage<number[]>('completedLessons', []);

  const isCompleted = useCallback(
    (day: number): boolean => {
      return completedLessons.includes(day);
    },
    [completedLessons]
  );

  const markCompleted = useCallback(
    (day: number) => {
      setCompletedLessons((prev) => {
        if (prev.includes(day)) return prev;
        return [...prev, day];
      });
    },
    [setCompletedLessons]
  );

  const getCompletedCount = useCallback(() => completedLessons.length, [
    completedLessons,
  ]);

  return {
    completedLessons,
    isCompleted,
    markCompleted,
    getCompletedCount,
  };
}