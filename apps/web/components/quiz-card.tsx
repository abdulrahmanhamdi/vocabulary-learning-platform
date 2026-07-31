// components/quiz-card.tsx
'use client';

import { QuizQuestion } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuizCardProps {
  question: QuizQuestion;
  selectedAnswer: string | null;
  isAnswered: boolean;
  onSelectAnswer: (answer: string) => void;
  questionNumber: number;
  totalQuestions: number;
}

export function QuizCard({
  question,
  selectedAnswer,
  isAnswered,
  onSelectAnswer,
  questionNumber,
  totalQuestions,
}: QuizCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6 md:p-8">
        <div className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Question {questionNumber} of {totalQuestions}
        </div>
        <h2 className="mb-6 text-center text-2xl font-bold md:text-3xl">
          {question.word.english}
        </h2>
        <div className="grid gap-3">
          {question.options.map((option, idx) => {
            const isSelected = selectedAnswer === option;
            const isCorrect = option === question.correctAnswer;
            let variant: 'outline' | 'default' | 'destructive' = 'outline';
            let extraStyles = '';

            if (isAnswered) {
              if (isCorrect) {
                extraStyles = 'bg-green-500/10 border-green-500 text-green-600 dark:text-green-400 font-semibold';
              } else if (isSelected) {
                variant = 'destructive';
              }
            } else if (isSelected) {
              variant = 'default';
            }

            return (
              <Button
                key={idx}
                variant={variant}
                className={cn('justify-between h-auto py-3.5 px-4 text-base', extraStyles)}
                disabled={isAnswered}
                onClick={() => onSelectAnswer(option)}
              >
                <span>{option}</span>
                {isAnswered && isCorrect && <Check className="h-5 w-5 text-green-500" />}
                {isAnswered && isSelected && !isCorrect && <X className="h-5 w-5" />}
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
