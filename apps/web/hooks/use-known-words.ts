// hooks/use-known-words.ts
'use client';

import { useCallback } from 'react';
import { useLocalStorage } from './use-local-storage';

export function useKnownWords() {
  const { storedValue: knownWords, setValue: setKnownWords } = useLocalStorage<
    number[]
  >('known', []);

  const isKnown = useCallback(
    (wordId: number): boolean => {
      return knownWords.includes(wordId);
    },
    [knownWords]
  );

  const toggleKnown = useCallback(
    (wordId: number) => {
      setKnownWords((prev) => {
        if (prev.includes(wordId)) {
          return prev.filter((id) => id !== wordId);
        } else {
          return [...prev, wordId];
        }
      });
    },
    [setKnownWords]
  );

  const markKnown = useCallback(
    (wordId: number) => {
      setKnownWords((prev) => {
        if (prev.includes(wordId)) return prev;
        return [...prev, wordId];
      });
    },
    [setKnownWords]
  );

  const markUnknown = useCallback(
    (wordId: number) => {
      setKnownWords((prev) => prev.filter((id) => id !== wordId));
    },
    [setKnownWords]
  );

  const getKnownCount = useCallback(() => knownWords.length, [knownWords]);

  return {
    knownWords,
    isKnown,
    toggleKnown,
    markKnown,
    markUnknown,
    getKnownCount,
  };
}