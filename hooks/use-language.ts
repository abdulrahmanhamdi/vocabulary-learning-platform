// hooks/use-language.ts
'use client';

import { useEffect, useMemo } from 'react';
import { useLocalStorage } from './use-local-storage';
import { Locale, defaultLocale } from '@/lib/i18n';

export function useLanguage() {
  const { storedValue: locale, setValue: setLocale } = useLocalStorage<Locale>(
    'language',
    defaultLocale
  );

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
  }, [locale]);

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      isRTL: locale === 'ar',
    }),
    [locale, setLocale]
  );

  return value;
}