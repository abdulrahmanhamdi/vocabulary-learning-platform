// components/day-card.tsx
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { DayData } from '@/types';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Play, Lock } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';
import { translate } from '@/lib/i18n';

interface DayCardProps {
  dayData: DayData;
  status: 'completed' | 'in-progress' | 'not-started';
  progress: number;
  index: number;
}

export function DayCard({ dayData, status, progress, index }: DayCardProps) {
  const { locale } = useLanguage();
  const t = (key: string, params?: Record<string, string | number>) =>
    translate(locale, key, params);

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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group rounded-lg border bg-card p-6 transition-all hover:shadow-lg"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold">
            {t('daily.day', { number: dayData.day })}
          </h3>
          <p className="text-sm text-muted-foreground">
            {t('daily.words', { count: dayData.words.length })}
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
        <Link href={`/daily/${dayData.day}`}>
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
}
