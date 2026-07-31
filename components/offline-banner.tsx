'use client';

import { useState, useEffect } from 'react';
import { WifiOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/hooks/use-language';
import { translate } from '@/lib/i18n';

export function OfflineBanner() {
  const [isOffline, setIsOffline] = useState(false);
  const { locale } = useLanguage();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    setIsOffline(!window.navigator.onLine);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Register Service Worker for offline capabilities
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('[PWA] Service Worker registered successfully with scope:', registration.scope);
        })
        .catch((error) => {
          console.error('[PWA] Service Worker registration failed:', error);
        });
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const t = (key: string) => translate(locale, key);

  return (
    <AnimatePresence>
      {isOffline && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-16 left-0 right-0 z-40 flex items-center justify-center bg-yellow-600 px-4 py-2 text-sm font-medium text-white shadow-md transition-all duration-300"
        >
          <div className="flex items-center gap-2">
            <WifiOff className="h-4 w-4 animate-pulse" />
            <span>{t('common.offline')}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
