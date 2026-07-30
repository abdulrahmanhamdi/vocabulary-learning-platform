// hooks/use-quiz.ts
'use client';

import { useCallback } from 'react';
import { QuizQuestion, QuizResult, Word } from '@/types';
import { shuffleArray } from '@/lib/utils';
import { useLocalStorage } from './use-local-storage';

export function useQuiz() {
  const { storedValue: quizHistory, setValue: setQuizHistory } = useLocalStorage<
    QuizResult[]
  >('quizHistory', []);

  const generateQuestions = useCallback(
    (words: Word[], mode: 'en-tr' | 'en-ar' | 'tr-en' | 'ar-en'): QuizQuestion[] => {
      return words.map((word) => {
        const options = words
          .filter((w) => w.id !== word.id)
          .slice(0, 3)
          .map((w) => {
            switch (mode) {
              case 'en-tr':
                return w.turkish;
              case 'en-ar':
                return w.arabic;
              case 'tr-en':
                return w.english;
              case 'ar-en':
                return w.english;
              default:
                return w.english;
            }
          });

        let correctAnswer = '';
        switch (mode) {
          case 'en-tr':
            correctAnswer = word.turkish;
            break;
          case 'en-ar':
            correctAnswer = word.arabic;
            break;
          case 'tr-en':
            correctAnswer = word.english;
            break;
          case 'ar-en':
            correctAnswer = word.english;
            break;
          default:
            correctAnswer = word.english;
        }

        return {
          word,
          options: shuffleArray([correctAnswer, ...options]),
          correctAnswer,
          answered: false,
        };
      });
    },
    []
  );

  const calculateResult = useCallback(
    (questions: QuizQuestion[]): QuizResult => {
      const correctAnswers = questions.filter((q) => q.userAnswer === q.correctAnswer)
        .length;
      const totalQuestions = questions.length;
      const wrongWords = questions
        .filter((q) => q.userAnswer !== q.correctAnswer)
        .map((q) => q.word);

      return {
        totalQuestions,
        correctAnswers,
        wrongAnswers: totalQuestions - correctAnswers,
        accuracy: (correctAnswers / totalQuestions) * 100,
        wrongWords,
      };
    },
    []
  );

  const saveResult = useCallback(
    (result: QuizResult) => {
      setQuizHistory((prev) => [result, ...prev]);
    },
    [setQuizHistory]
  );

  return {
    quizHistory,
    generateQuestions,
    calculateResult,
    saveResult,
  };
}