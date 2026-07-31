// app/page.tsx
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/use-language';
import { useWords } from '@/hooks/use-words';
import { useKnownWords } from '@/hooks/use-known-words';
import { useFavorites } from '@/hooks/use-favorites';
import { translate } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  BookOpen,
  Book,
  HelpCircle,
  BarChart3,
} from 'lucide-react';

const quickNavItems = [
  { href: '/daily', icon: BookOpen, label: 'daily' },
  { href: '/words', icon: Book, label: 'words' },
  { href: '/quiz', icon: HelpCircle, label: 'quiz' },
  { href: '/statistics', icon: BarChart3, label: 'statistics' },
];

export default function HomePage() {
  const { locale } = useLanguage();
  const { getTotalWords, getTotalDays, isLoading } = useWords();
  const { knownWords } = useKnownWords();
  const { favorites } = useFavorites();

  const t = (key: string) => translate(locale, key);

  const totalWords = getTotalWords();
  const totalDays = getTotalDays();
  const knownCount = knownWords.length;
  const favoriteCount = favorites.length;
  const progress = totalWords > 0 ? (knownCount / totalWords) * 100 : 0;

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
          {t('home.hero.title')}
          <span className="text-gradient block mt-2">VocabLearn</span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          {t('home.hero.subtitle')}
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          <Link href="/daily">
            <Button size="lg" variant="gradient">
              {t('home.hero.cta')}
            </Button>
          </Link>
          <div className="text-sm text-muted-foreground">
            {totalWords} {t('home.hero.stats')}
          </div>
        </div>
      </motion.section>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-12 grid grid-cols-2 gap-4 md:grid-cols-4"
      >
        <div className="rounded-lg border bg-card p-4 text-center">
          <div className="text-2xl font-bold text-primary">{totalWords}</div>
          <div className="text-sm text-muted-foreground">
            {t('home.totalWords')}
          </div>
        </div>
        <div className="rounded-lg border bg-card p-4 text-center">
          <div className="text-2xl font-bold text-green-500">{knownCount}</div>
          <div className="text-sm text-muted-foreground">
            {t('home.knownWords')}
          </div>
        </div>
        <div className="rounded-lg border bg-card p-4 text-center">
          <div className="text-2xl font-bold text-yellow-500">
            {favoriteCount}
          </div>
          <div className="text-sm text-muted-foreground">
            {t('home.favoriteWords')}
          </div>
        </div>
        <div className="rounded-lg border bg-card p-4 text-center">
          <div className="text-2xl font-bold text-purple-500">{totalDays}</div>
          <div className="text-sm text-muted-foreground">
            {t('home.completedDays')}
          </div>
        </div>
      </motion.div>

      {/* Progress Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-12 rounded-lg border bg-card p-6"
      >
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold">{t('home.progress')}</h2>
          <span className="text-sm text-muted-foreground">
            {Math.round(progress)}%
          </span>
        </div>
        <Progress value={progress} className="h-3" />
        <p className="mt-2 text-sm text-muted-foreground">
          {knownCount} / {totalWords} {t('home.totalWords').toLowerCase()}
        </p>
      </motion.div>

      {/* Quick Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {quickNavItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.1 * (index + 1) }}
                className="group rounded-lg border bg-card p-6 transition-all hover:shadow-lg hover:border-primary/50"
              >
                <Icon className="mb-3 h-8 w-8 text-primary" />
                <h3 className="font-semibold">{t(`home.quickNav.${item.label}`)}</h3>
                <p className="text-sm text-muted-foreground">
                  {t(`nav.${item.label}`)}
                </p>
              </motion.div>
            </Link>
          );
        })}
      </motion.div>
    </div>
  );
}