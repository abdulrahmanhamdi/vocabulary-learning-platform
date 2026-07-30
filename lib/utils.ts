// lib/utils.ts (updated with additional utilities)
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function generateId(): number {
  return Date.now() + Math.floor(Math.random() * 1000);
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export function calculateProgress(current: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((current / total) * 100);
}

export function calculateQuizScore(correct: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((correct / total) * 100);
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

export function getWordStatus(
  wordId: number,
  knownWords: Set<number>,
  favoriteWords: Set<number>
): { known: boolean; favorite: boolean } {
  return {
    known: knownWords.has(wordId),
    favorite: favoriteWords.has(wordId),
  };
}

export function searchWords<T extends Record<string, unknown>>(
  words: T[],
  query: string,
  fields: (keyof T & string)[]
): T[] {
  if (!query) return words;
  const lowerQuery = query.toLowerCase();
  return words.filter((word) =>
    fields.some((field) => {
      const value = word[field];
      if (typeof value === 'string') {
        return value.toLowerCase().includes(lowerQuery);
      }
      return false;
    })
  );
}

export function sortWords<T extends Record<string, unknown>>(
  words: T[],
  field: keyof T & string,
  direction: 'asc' | 'desc'
): T[] {
  return [...words].sort((a, b) => {
    const aVal = String(a[field] ?? '');
    const bVal = String(b[field] ?? '');
    const comparison = aVal.localeCompare(bVal);
    return direction === 'asc' ? comparison : -comparison;
  });
}

export function filterWords<T>(
  words: T[],
  filters: Record<string, (word: T) => boolean>
): T[] {
  return words.filter((word) =>
    Object.values(filters).every((filterFn) => filterFn(word))
  );
}

export function paginate<T>(array: T[], page: number, pageSize: number): T[] {
  const start = (page - 1) * pageSize;
  return array.slice(start, start + pageSize);
}