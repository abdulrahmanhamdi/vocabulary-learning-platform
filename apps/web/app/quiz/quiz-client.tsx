// app/quiz/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/use-language';
import { translate } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { QuizMode } from '@/types';
import { BookOpen, Star, XCircle, ArrowRight } from 'lucide-react';

const quizModes: { value: QuizMode; label: string }[] = [
  { value: 'en-tr', label: 'quiz.modes.en-tr' },
  { value: 'en-ar', label: 'quiz.modes.en-ar' },
  { value: 'tr-en', label: 'quiz.modes.tr-en' },
  { value: 'ar-en', label: 'quiz.modes.ar-en' },
];

const quizTypes = [
  {
    id: 'daily',
    icon: BookOpen,
    title: 'Quiz by Day',
    description: 'Test yourself on specific day lessons',
  },
  {
    id: 'all',
    icon: BookOpen,
    title: 'All Words',
    description: 'Test yourself on all vocabulary',
  },
  {
    id: 'favorites',
    icon: Star,
    title: 'Favorites',
    description: 'Test yourself on favorite words',
  },
  {
    id: 'unknown',
    icon: XCircle,
    title: 'Unknown Words',
    description: 'Test yourself on words you don\'t know',
  },
];

export default function QuizPage() {
  const { locale } = useLanguage();
  const [selectedMode, setSelectedMode] = useState<QuizMode>('en-tr');
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const t = (key: string) => translate(locale, key);

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="mb-2 text-3xl font-bold">{t('quiz.title')}</h1>
        <p className="text-muted-foreground">{t('quiz.selectMode')}</p>
      </motion.div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {quizTypes.map((type, index) => {
          const Icon = type.icon;
          return (
            <motion.div
              key={type.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  selectedType === type.id ? 'border-primary ring-2 ring-primary/20' : ''
                }`}
                onClick={() => setSelectedType(type.id)}
              >
                <CardHeader>
                  <Icon className="h-8 w-8 text-primary" />
                  <CardTitle className="text-lg">{type.title}</CardTitle>
                  <CardDescription>{type.description}</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {selectedType && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-8"
        >
          <h2 className="mb-4 text-lg font-semibold">{t('quiz.selectMode')}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {quizModes.map((mode) => (
              <Button
                key={mode.value}
                variant={selectedMode === mode.value ? 'default' : 'outline'}
                className="justify-start h-auto py-3 px-4"
                onClick={() => setSelectedMode(mode.value)}
              >
                {t(mode.label)}
              </Button>
            ))}
          </div>

          <div className="mt-6">
            <Link href={`/quiz/${selectedType}?mode=${selectedMode}`}>
              <Button size="lg" variant="gradient" className="gap-2">
                {t('quiz.start')} <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
}