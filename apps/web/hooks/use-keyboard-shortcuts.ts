// hooks/use-keyboard-shortcuts.ts
'use client';

import { useEffect, useCallback } from 'react';

interface ShortcutHandlers {
  onNext?: () => void;
  onPrevious?: () => void;
  onToggleTranslation?: () => void;
  onMarkKnown?: () => void;
  onFavorite?: () => void;
  onEscape?: () => void;
}

export function useKeyboardShortcuts({
  onNext,
  onPrevious,
  onToggleTranslation,
  onMarkKnown,
  onFavorite,
  onEscape,
}: ShortcutHandlers) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // Don't trigger shortcuts if user is typing in an input
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement ||
        event.target instanceof HTMLSelectElement
      ) {
        return;
      }

      switch (event.key) {
        case 'ArrowRight':
          event.preventDefault();
          onNext?.();
          break;
        case 'ArrowLeft':
          event.preventDefault();
          onPrevious?.();
          break;
        case ' ':
          event.preventDefault();
          onToggleTranslation?.();
          break;
        case 'Enter':
          event.preventDefault();
          onMarkKnown?.();
          break;
        case 'f':
        case 'F':
          event.preventDefault();
          onFavorite?.();
          break;
        case 'Escape':
          onEscape?.();
          break;
      }
    },
    [onNext, onPrevious, onToggleTranslation, onMarkKnown, onFavorite, onEscape]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);
}