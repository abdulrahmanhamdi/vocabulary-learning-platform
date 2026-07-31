// hooks/use-favorites.ts
'use client';

import { useCallback } from 'react';
import { useLocalStorage } from './use-local-storage';

export function useFavorites() {
  const { storedValue: favorites, setValue: setFavorites } = useLocalStorage<
    number[]
  >('favorites', []);

  const isFavorite = useCallback(
    (wordId: number): boolean => {
      return favorites.includes(wordId);
    },
    [favorites]
  );

  const toggleFavorite = useCallback(
    (wordId: number) => {
      setFavorites((prev) => {
        if (prev.includes(wordId)) {
          return prev.filter((id) => id !== wordId);
        } else {
          return [...prev, wordId];
        }
      });
    },
    [setFavorites]
  );

  const addFavorite = useCallback(
    (wordId: number) => {
      setFavorites((prev) => {
        if (prev.includes(wordId)) return prev;
        return [...prev, wordId];
      });
    },
    [setFavorites]
  );

  const removeFavorite = useCallback(
    (wordId: number) => {
      setFavorites((prev) => prev.filter((id) => id !== wordId));
    },
    [setFavorites]
  );

  const clearFavorites = useCallback(() => {
    setFavorites([]);
  }, [setFavorites]);

  return {
    favorites,
    isFavorite,
    toggleFavorite,
    addFavorite,
    removeFavorite,
    clearFavorites,
  };
}