'use client';

import React, { createContext, useEffect, useMemo } from 'react';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { Locale, defaultLocale } from '@/lib/i18n';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  isRTL: boolean;
}

export const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const { storedValue: locale, setValue: setLocale } = useLocalStorage<Locale>(
    'language',
    defaultLocale
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.lang = locale;
      document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
    }
  }, [locale]);

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      isRTL: locale === 'ar',
    }),
    [locale, setLocale]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
