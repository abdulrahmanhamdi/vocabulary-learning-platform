// app/words/page.tsx
'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/use-language';
import { useWords } from '@/hooks/use-words';
import { useFavorites } from '@/hooks/use-favorites';
import { useKnownWords } from '@/hooks/use-known-words';
import { translate } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { WordCard } from '@/components/word-card';
import {
  Search,
  ChevronLeft,
  ChevronRight,
  X,
} from 'lucide-react';

const WORDS_PER_PAGE = 20;

export default function WordsPage() {
  const { locale } = useLanguage();
  const { allWords, isLoading } = useWords();
  const { favorites } = useFavorites();
  const { knownWords } = useKnownWords();

  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'az' | 'za'>('az');
  const [filterBy, setFilterBy] = useState<'all' | 'favorites' | 'known' | 'unknown'>(
    'all'
  );
  const [currentPage, setCurrentPage] = useState(1);

  const t = (key: string, params?: Record<string, string | number>) =>
    translate(locale, key, params);

  const filteredWords = useMemo(() => {
    let words = [...allWords];

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      words = words.filter(
        (w) =>
          w.english.toLowerCase().includes(query) ||
          w.turkish.toLowerCase().includes(query) ||
          w.arabic.includes(query)
      );
    }

    // Filter by type
    if (filterBy === 'favorites') {
      words = words.filter((w) => favorites.includes(w.id));
    } else if (filterBy === 'known') {
      words = words.filter((w) => knownWords.includes(w.id));
    } else if (filterBy === 'unknown') {
      words = words.filter((w) => !knownWords.includes(w.id));
    }

    // Sort
    if (sortBy === 'az') {
      words.sort((a, b) => a.english.localeCompare(b.english));
    } else {
      words.sort((a, b) => b.english.localeCompare(a.english));
    }

    return words;
  }, [allWords, searchQuery, filterBy, sortBy, favorites, knownWords]);

  const totalPages = Math.ceil(filteredWords.length / WORDS_PER_PAGE);
  const currentWords = useMemo(() => {
    const start = (currentPage - 1) * WORDS_PER_PAGE;
    return filteredWords.slice(start, start + WORDS_PER_PAGE);
  }, [filteredWords, currentPage]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setCurrentPage(1);
  };

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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="mb-2 text-3xl font-bold">{t('words.title')}</h1>
        <p className="text-muted-foreground">
          {t('words.total', { count: allWords.length })}
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mt-6 flex flex-wrap items-center gap-4"
      >
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={t('words.search')}
            value={searchQuery}
            onChange={handleSearch}
            className="pl-9 pr-9 search-input"
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <Select value={filterBy} onValueChange={(v: any) => setFilterBy(v)}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder={t('common.filter')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('common.all')}</SelectItem>
            <SelectItem value="favorites">{t('home.favoriteWords')}</SelectItem>
            <SelectItem value="known">{t('home.knownWords')}</SelectItem>
            <SelectItem value="unknown">Unknown</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={(v: any) => setSortBy(v)}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder={t('common.sort')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="az">A → Z</SelectItem>
            <SelectItem value="za">Z → A</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      {/* Word Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mt-8 grid gap-6 sm:grid-cols-1 md:grid-cols-2"
      >
        {currentWords.map((word, index) => (
          <motion.div
            key={word.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <WordCard
              word={word}
              showTranslation={false}
              isFavorite={favorites.includes(word.id)}
              isKnown={knownWords.includes(word.id)}
              onToggleTranslation={() => {}}
              onToggleFavorite={() => {}}
              onToggleKnown={() => {}}
              className="h-full"
            />
          </motion.div>
        ))}
      </motion.div>

      {currentWords.length === 0 && (
        <div className="mt-8 text-center py-12">
          <p className="text-muted-foreground">{t('words.noResults')}</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm text-muted-foreground">
            {currentPage} / {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}