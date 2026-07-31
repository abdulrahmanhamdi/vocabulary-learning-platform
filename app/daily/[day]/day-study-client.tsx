// app/daily/[day]/page.tsx
'use client';

import { useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/use-language';
import { useWords } from '@/hooks/use-words';
import { useKnownWords } from '@/hooks/use-known-words';
import { useFavorites } from '@/hooks/use-favorites';
import { useCompletedLessons } from '@/hooks/use-completed-lessons';
import { useKeyboardShortcuts } from '@/hooks/use-keyboard-shortcuts';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { translate } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { WordCard } from '@/components/word-card';
import {
  ChevronLeft,
  ChevronRight,
  Check,
} from 'lucide-react';

export default function StudyPage() {
  const params = useParams();
  const router = useRouter();
  const dayNumber = parseInt(params.day as string);
  const { locale } = useLanguage();
  const { getWordsForDay, isLoading } = useWords();
  const { knownWords, markKnown, markUnknown } = useKnownWords();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { markCompleted } = useCompletedLessons();

  const { storedValue: currentIndex, setValue: setCurrentIndex } = useLocalStorage<number>(
    `study-current-index-day-${dayNumber}`,
    0
  );
  const { storedValue: wordsPerStudy, setValue: setWordsPerStudy } = useLocalStorage<number>(
    `study-words-per-study-day-${dayNumber}`,
    50
  );
  const [showTranslation, setShowTranslation] = useState(false);

  const allWords = getWordsForDay(dayNumber);
  const words = useMemo(
    () => allWords.slice(0, wordsPerStudy),
    [allWords, wordsPerStudy]
  );
  
  const safeIndex = words.length > 0 ? Math.min(currentIndex, words.length - 1) : 0;
  const currentWord = words[safeIndex];

  const t = (key: string, params?: Record<string, string | number>) =>
    translate(locale, key, params);

  useKeyboardShortcuts({
    onNext: () => handleNext(),
    onPrevious: () => handlePrevious(),
    onToggleTranslation: () => setShowTranslation(!showTranslation),
    onMarkKnown: () => handleMarkKnown(),
    onFavorite: () => handleToggleFavorite(),
    onEscape: () => setShowTranslation(false),
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      </div>
    );
  }

  if (!currentWord) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold">{t('study.completed')}</h2>
        <p className="mt-2 text-muted-foreground">
          {t('common.loading')}
        </p>
      </div>
    );
  }

  const handleNext = () => {
    if (safeIndex < words.length - 1) {
      setCurrentIndex(safeIndex + 1);
      setShowTranslation(false);
    } else {
      // Completed all words
      markCompleted(dayNumber);
      setCurrentIndex(0);
      router.push('/daily');
    }
  };

  const handlePrevious = () => {
    if (safeIndex > 0) {
      setCurrentIndex(safeIndex - 1);
      setShowTranslation(false);
    }
  };

  const handleMarkKnown = () => {
    if (knownWords.includes(currentWord.id)) {
      markUnknown(currentWord.id);
    } else {
      markKnown(currentWord.id);
    }
  };

  const handleToggleFavorite = () => {
    toggleFavorite(currentWord.id);
  };

  const isCurrentKnown = knownWords.includes(currentWord.id);
  const isCurrentFavorite = isFavorite(currentWord.id);

  const progress = words.length > 0 ? ((safeIndex + 1) / words.length) * 100 : 0;

  const wordStatusOptions = [20, 30, 40, 50];

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8 md:py-12">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => router.push('/daily')}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          {t('common.back')}
        </button>
        <h1 className="text-lg font-semibold">{t('study.title', { number: dayNumber })}</h1>
        <div className="w-16" />
      </div>

      {/* Words per study selector */}
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <span className="text-sm text-muted-foreground">
          {t('study.wordsPerStudy')}:
        </span>
        {wordStatusOptions.map((option) => (
          <Button
            key={option}
            variant={wordsPerStudy === option ? 'default' : 'outline'}
            size="sm"
            onClick={() => {
              setWordsPerStudy(option);
              setCurrentIndex(0);
              setShowTranslation(false);
            }}
          >
            {option}
          </Button>
        ))}
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm">
          <span>
            {t('study.progress', { current: safeIndex + 1, total: words.length })}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Word Card */}
      <motion.div
        key={currentWord.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <WordCard
          word={currentWord}
          showTranslation={showTranslation}
          isFavorite={isCurrentFavorite}
          isKnown={isCurrentKnown}
          onToggleTranslation={() => setShowTranslation(!showTranslation)}
          onToggleFavorite={handleToggleFavorite}
          onToggleKnown={handleMarkKnown}
        />
      </motion.div>

      {/* Navigation */}
      <div className="mt-6 flex items-center justify-between gap-2">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={safeIndex === 0}
          className="flex-1 sm:flex-none"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="hidden sm:inline">{t('study.previous')}</span>
        </Button>

        {safeIndex < words.length - 1 ? (
          <Button
            variant="gradient"
            onClick={handleNext}
            className="flex-1 sm:flex-none"
          >
            <span className="hidden sm:inline">{t('study.next')}</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            variant="gradient"
            onClick={() => {
              markCompleted(dayNumber);
              setCurrentIndex(0);
              router.push('/daily');
            }}
            className="flex-1 sm:flex-none"
          >
            <span className="hidden sm:inline">{t('common.done')}</span>
            <Check className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Keyboard shortcuts info */}
      <div className="mt-8 rounded-lg border bg-muted/40 p-4 text-xs text-muted-foreground">
        <p className="font-medium">{t('common.keyboardShortcuts')}:</p>
        <div className="mt-2 flex flex-wrap gap-4">
          <span>
            <kbd className="rounded border bg-background px-1.5 py-0.5">→</kbd> /{' '}
            <kbd className="rounded border bg-background px-1.5 py-0.5">←</kbd>{' '}
            {t('study.navigate')}
          </span>
          <span>
            <kbd className="rounded border bg-background px-1.5 py-0.5">Space</kbd>{' '}
            {t('study.toggleTranslation')}
          </span>
          <span>
            <kbd className="rounded border bg-background px-1.5 py-0.5">Enter</kbd>{' '}
            {t('study.markKnown')}
          </span>
          <span>
            <kbd className="rounded border bg-background px-1.5 py-0.5">F</kbd>{' '}
            {t('study.favorite')}
          </span>
        </div>
      </div>
    </div>
  );
}