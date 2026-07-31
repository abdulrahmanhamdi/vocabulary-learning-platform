// app/statistics/page.tsx
'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/use-language';
import { useWords } from '@/hooks/use-words';
import { useKnownWords } from '@/hooks/use-known-words';
import { useFavorites } from '@/hooks/use-favorites';
import { useCompletedLessons } from '@/hooks/use-completed-lessons';
import { translate } from '@/lib/i18n';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  Book,
  CheckCircle,
  Star,
  Calendar,
  TrendingUp,
  Award,
} from 'lucide-react';

const StatCard = ({
  icon: Icon,
  title,
  value,
  subtitle,
  color,
}: {
  icon: React.ElementType;
  title: string;
  value: string | number;
  subtitle?: string;
  color?: string;
}) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">
        {title}
      </CardTitle>
      <Icon className={`h-4 w-4 ${color || 'text-muted-foreground'}`} />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
    </CardContent>
  </Card>
);

export default function StatisticsPage() {
  const { locale } = useLanguage();
  const { getTotalWords, getTotalDays, isLoading } = useWords();
  const { knownWords } = useKnownWords();
  const { favorites } = useFavorites();
  const { completedLessons } = useCompletedLessons();

  const t = (key: string) => translate(locale, key);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      </div>
    );
  }

  const totalWords = getTotalWords();
  const totalDays = getTotalDays();
  const knownCount = knownWords.length;
  const favoriteCount = favorites.length;
  const completedCount = completedLessons.length;
  const unknownCount = totalWords - knownCount;
  const progress = totalWords > 0 ? (knownCount / totalWords) * 100 : 0;

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="mb-2 text-3xl font-bold">{t('statistics.title')}</h1>
        <p className="text-muted-foreground">{t('statistics.overview')}</p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        <StatCard
          icon={Book}
          title={t('statistics.totalWords')}
          value={totalWords}
          color="text-blue-500"
        />
        <StatCard
          icon={CheckCircle}
          title={t('statistics.knownWords')}
          value={knownCount}
          subtitle={`${Math.round(progress)}% of total`}
          color="text-green-500"
        />
        <StatCard
          icon={Award}
          title={t('statistics.unknownWords')}
          value={unknownCount}
          subtitle={`${Math.round((unknownCount / totalWords) * 100)}% of total`}
          color="text-red-500"
        />
        <StatCard
          icon={Star}
          title={t('statistics.favoriteWords')}
          value={favoriteCount}
          color="text-yellow-500"
        />
      </motion.div>

      {/* Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-8"
      >
        <Card>
          <CardHeader>
            <CardTitle>{t('statistics.learningProgress')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">
                {knownCount} / {totalWords} words
              </span>
              <span className="text-sm font-medium">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-3" />
          </CardContent>
        </Card>
      </motion.div>

      {/* Additional Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-8 grid gap-4 sm:grid-cols-2"
      >
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t('statistics.completedDays')}
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {completedCount} / {totalDays}
            </div>
            <p className="text-xs text-muted-foreground">
              {Math.round((completedCount / totalDays) * 100)}% completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t('statistics.studyStreak')}
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {completedCount > 0 ? `${completedCount} days` : '0 days'}
            </div>
            <p className="text-xs text-muted-foreground">
              Keep going! You&apos;re doing great.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}