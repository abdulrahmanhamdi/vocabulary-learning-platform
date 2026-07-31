// app/daily/page.tsx
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/use-language';
import { useWords } from '@/hooks/use-words';
import { useKnownWords } from '@/hooks/use-known-words';
import { useCompletedLessons } from '@/hooks/use-completed-lessons';
import { translate } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Play, Lock } from 'lucide-react';

export default function DailyPage() {
  const { locale } = useLanguage();
  const { days, isLoading } = useWords();
  const { knownWords } = useKnownWords();
  const { completedLessons } = useCompletedLessons();

  const t = (key: string, params?: Record<string, string | number>) =>
    translate(locale, key, params);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      </div>
    );
  }

  const getDayStatus = (day: number) => {
    if (completedLessons.includes(day)) return 'completed';
    // Check if any words from this day are known
    const dayWords = days.find((d) => d.day === day)?.words || [];
    const knownCount = dayWords.filter((w) => knownWords.includes(w.id)).length;
    if (knownCount > 0) return 'in-progress';
    return 'not-started';
  };

  const getDayProgress = (day: number) => {
    const dayWords = days.find((d) => d.day === day)?.words || [];
    const knownCount = dayWords.filter((w) => knownWords.includes(w.id)).length;
    return dayWords.length > 0 ? (knownCount / dayWords.length) * 100 : 0;
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="mb-2 text-3xl font-bold">{t('daily.title')}</h1>
        <p className="text-muted-foreground">
          {days.length} {t('daily.words', { count: days.length })}
        </p>
      </motion.div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {days.map((day, index) => {
          const status = getDayStatus(day.day);
          const progress = getDayProgress(day.day);
          const wordCount = day.words.length;

          const statusIcons = {
            completed: <CheckCircle className="h-5 w-5 text-green-500" />,
            'in-progress': <Play className="h-5 w-5 text-yellow-500" />,
            'not-started': <Lock className="h-5 w-5 text-muted-foreground" />,
          };

          const statusText = {
            completed: t('daily.completed'),
            'in-progress': t('daily.inProgress'),
            'not-started': t('daily.notStarted'),
          };

          return (
            <motion.div
              key={day.day}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="group rounded-lg border bg-card p-6 transition-all hover:shadow-lg"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold">
                    {t('daily.day', { number: day.day })}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t('daily.words', { count: wordCount })}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {statusIcons[status]}
                  <span className="text-xs text-muted-foreground">
                    {statusText[status]}
                  </span>
                </div>
              </div>

              {status !== 'not-started' && (
                <div className="mt-4">
                  <Progress value={progress} className="h-2" />
                  <p className="mt-1 text-xs text-muted-foreground">
                    {Math.round(progress)}%
                  </p>
                </div>
              )}

              <div className="mt-4">
                <Link href={`/daily/${day.day}`}>
                  <Button
                    variant={status === 'completed' ? 'outline' : 'gradient'}
                    className="w-full"
                    size="sm"
                  >
                    {status === 'completed'
                      ? t('common.continue')
                      : status === 'in-progress'
                      ? t('common.continue')
                      : t('daily.start')}
                  </Button>
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}