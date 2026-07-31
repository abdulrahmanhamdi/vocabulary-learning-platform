// app/quiz/[type]/page.tsx
'use client';

import { useState, useEffect, useMemo } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/use-language';
import { useWords } from '@/hooks/use-words';
import { useFavorites } from '@/hooks/use-favorites';
import { useKnownWords } from '@/hooks/use-known-words';
import { translate } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { QuizQuestion, Word } from '@/types';
import { shuffleArray } from '@/lib/utils';
import { Check, X, ArrowRight, RotateCcw, Home } from 'lucide-react';

export default function QuizPlayPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const type = params.type as string;
  const mode = searchParams.get('mode') || 'en-tr';

  const { locale } = useLanguage();
  const { allWords, days } = useWords();
  const { favorites } = useFavorites();
  const { knownWords } = useKnownWords();

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState<Word[]>([]);
  const [quizComplete, setQuizComplete] = useState(false);

  const t = (key: string, params?: Record<string, string | number>) =>
    translate(locale, key, params);

  // Get words based on quiz type
  const getQuizWords = useMemo(() => {
    let words: Word[] = [];

    switch (type) {
      case 'daily': {
        // Get all words from all days
        const dayWords = days.flatMap((d) => d.words);
        words = dayWords;
        break;
      }
      case 'favorites': {
        words = allWords.filter((w) => favorites.includes(w.id));
        break;
      }
      case 'unknown': {
        words = allWords.filter((w) => !knownWords.includes(w.id));
        break;
      }
      default: {
        words = allWords;
        break;
      }
    }

    // Shuffle and limit to 50 questions
    return shuffleArray(words).slice(0, 50);
  }, [allWords, days, favorites, knownWords, type]);

  // Generate quiz questions
  useEffect(() => {
    const generatedQuestions = getQuizWords.map((word) => {
      let options: string[] = [];
      let correctAnswer = '';

      // Get other words for options
      const otherWords = shuffleArray(
        allWords.filter((w) => w.id !== word.id)
      ).slice(0, 3);

      switch (mode) {
        case 'en-tr': {
          correctAnswer = word.turkish;
          options = shuffleArray([word.turkish, ...otherWords.map((w) => w.turkish)]);
          break;
        }
        case 'en-ar': {
          correctAnswer = word.arabic;
          options = shuffleArray([word.arabic, ...otherWords.map((w) => w.arabic)]);
          break;
        }
        case 'tr-en': {
          correctAnswer = word.english;
          options = shuffleArray([word.english, ...otherWords.map((w) => w.english)]);
          break;
        }
        case 'ar-en': {
          correctAnswer = word.english;
          options = shuffleArray([word.english, ...otherWords.map((w) => w.english)]);
          break;
        }
        default: {
          correctAnswer = word.english;
          options = shuffleArray([word.english, ...otherWords.map((w) => w.english)]);
        }
      }

      return {
        word,
        options,
        correctAnswer,
        answered: false,
      };
    });

    setQuestions(generatedQuestions);
  }, [getQuizWords, allWords, mode]);

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;

  const handleAnswer = (answer: string) => {
    if (isAnswered) return;

    setSelectedAnswer(answer);
    setIsAnswered(true);

    if (answer === currentQuestion.correctAnswer) {
      setCorrectCount((prev) => prev + 1);
    } else {
      setWrongAnswers((prev) => [...prev, currentQuestion.word]);
    }
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setQuizComplete(true);
    }
  };

  const handleRetry = () => {
    setQuestions(shuffleArray(questions));
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setCorrectCount(0);
    setWrongAnswers([]);
    setQuizComplete(false);
  };

  const isCorrect = selectedAnswer === currentQuestion?.correctAnswer;

  if (!currentQuestion && !quizComplete) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
      </div>
    );
  }

  if (quizComplete) {
    const accuracy = totalQuestions > 0 ? (correctCount / totalQuestions) * 100 : 0;

    return (
      <div className="container mx-auto max-w-2xl px-4 py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold">{t('quiz.results')}</h2>

          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="rounded-lg border bg-card p-4">
              <div className="text-3xl font-bold text-green-500">{correctCount}</div>
              <div className="text-sm text-muted-foreground">{t('quiz.correct')}</div>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <div className="text-3xl font-bold text-red-500">
                {totalQuestions - correctCount}
              </div>
              <div className="text-sm text-muted-foreground">{t('quiz.incorrect')}</div>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between text-sm">
              <span>{t('quiz.accuracy')}</span>
              <span>{Math.round(accuracy)}%</span>
            </div>
            <Progress value={accuracy} className="h-3 mt-2" />
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button variant="outline" onClick={handleRetry} className="gap-2">
              <RotateCcw className="h-4 w-4" /> {t('quiz.retry')}
            </Button>
            {wrongAnswers.length > 0 && (
              <Button variant="outline" className="gap-2">
                <Check className="h-4 w-4" /> {t('quiz.review')}
              </Button>
            )}
            <Link href="/">
              <Button variant="gradient" className="gap-2">
                <Home className="h-4 w-4" /> {t('quiz.back')}
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8 md:py-12">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm">
          <span>{t('quiz.question', { current: currentIndex + 1, total: totalQuestions })}</span>
          <span>{Math.round(((currentIndex + 1) / totalQuestions) * 100)}%</span>
        </div>
        <Progress value={((currentIndex + 1) / totalQuestions) * 100} className="h-2" />
      </div>

      {/* Question */}
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        <Card>
          <CardContent className="p-6 md:p-8">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">What is the translation?</p>
              <h2 className="mt-2 text-2xl font-bold md:text-3xl">
                {currentQuestion.word.english}
              </h2>
            </div>

            <div className="mt-6 grid gap-3">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswer === option;
                const isCorrectAnswer = option === currentQuestion.correctAnswer;
                let variant: 'default' | 'outline' | 'destructive' = 'outline';

                if (isAnswered) {
                  if (isCorrectAnswer) {
                    variant = 'default';
                  } else if (isSelected && !isCorrectAnswer) {
                    variant = 'destructive';
                  }
                } else if (isSelected) {
                  variant = 'default';
                }

                return (
                  <Button
                    key={index}
                    variant={variant}
                    className="h-auto py-3 px-4 text-left justify-start gap-2"
                    onClick={() => handleAnswer(option)}
                    disabled={isAnswered}
                  >
                    <span className="flex-1">{option}</span>
                    {isAnswered && isCorrectAnswer && (
                      <Check className="h-4 w-4 text-green-500" />
                    )}
                    {isAnswered && isSelected && !isCorrectAnswer && (
                      <X className="h-4 w-4 text-red-500" />
                    )}
                  </Button>
                );
              })}
            </div>

            {isAnswered && (
              <div className="mt-4 text-center">
                <p className={`font-medium ${isCorrect ? 'text-green-500' : 'text-red-500'}`}>
                  {isCorrect ? t('quiz.correct') : t('quiz.incorrect')}
                </p>
                {!isCorrect && (
                  <p className="text-sm text-muted-foreground">
                    {t('quiz.correctAnswer')}: {currentQuestion.correctAnswer}
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Next Button */}
      <div className="mt-6 flex justify-end">
        <Button
          variant="gradient"
          onClick={handleNext}
          disabled={!isAnswered}
          className="gap-2"
        >
          {currentIndex < totalQuestions - 1 ? (
            <>
              {t('quiz.next')} <ArrowRight className="h-4 w-4" />
            </>
          ) : (
            <>
              {t('common.done')} <Check className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}