// lib/i18n.ts
export type Locale = 'en' | 'tr' | 'ar';

export const defaultLocale: Locale = 'en';

export const locales: Locale[] = ['en', 'tr', 'ar'];

export const localeNames: Record<Locale, string> = {
  en: 'English',
  tr: 'Türkçe',
  ar: 'العربية',
};

export const translations = {
  en: {
    // Navigation
    nav: {
      home: 'Home',
      daily: 'Daily Lessons',
      words: 'All Words',
      quiz: 'Quiz',
      statistics: 'Statistics',
      theme: 'Theme',
      language: 'Language',
    },
    // Home
    home: {
      hero: {
        title: 'Master English Vocabulary',
        subtitle: 'Learn and practice English words with translations in Turkish and Arabic',
        cta: 'Start Learning',
        stats: 'Words to Learn',
      },
      quickNav: {
        daily: 'Daily Lessons',
        words: 'All Words',
        quiz: 'Quiz',
        statistics: 'Statistics',
      },
      progress: 'Your Progress',
      totalWords: 'Total Words',
      knownWords: 'Known Words',
      favoriteWords: 'Favorites',
      completedDays: 'Completed Days',
    },
    // Daily
    daily: {
      title: 'Daily Lessons',
      day: 'Day {{number}}',
      words: '{{count}} Words',
      start: 'Start',
      completed: 'Completed',
      inProgress: 'In Progress',
      notStarted: 'Not Started',
    },
    // Study
    study: {
      title: 'Day {{number}}',
      wordsPerStudy: 'Words per Study',
      showTranslation: 'Show Translation',
      hideTranslation: 'Hide Translation',
      previous: 'Previous',
      next: 'Next',
      favorite: 'Favorite',
      known: 'Mark as Known',
      unknown: 'Mark as Unknown',
      progress: 'Word {{current}} / {{total}}',
      completed: 'Lesson Completed!',
      continue: 'Continue',
      navigate: 'Navigate',
      toggleTranslation: 'Toggle Translation',
      markKnown: 'Mark Known',
    },
    // Words
    words: {
      title: 'All Words',
      search: 'Search words...',
      filter: 'Filter',
      sort: 'Sort',
      noResults: 'No words found',
      total: 'Total: {{count}} words',
    },
    // Quiz
    quiz: {
      title: 'Quiz',
      modes: {
        'en-tr': 'English → Turkish',
        'en-ar': 'English → Arabic',
        'tr-en': 'Turkish → English',
        'ar-en': 'Arabic → English',
      },
      selectMode: 'Select Quiz Mode',
      start: 'Start Quiz',
      question: 'Question {{current}} / {{total}}',
      correct: 'Correct!',
      incorrect: 'Incorrect!',
      next: 'Next Question',
      results: 'Quiz Results',
      accuracy: 'Accuracy',
      retry: 'Retry',
      review: 'Review Mistakes',
      back: 'Back Home',
      correctAnswer: 'Correct Answer',
    },
    // Statistics
    statistics: {
      title: 'Statistics',
      overview: 'Overview',
      learningProgress: 'Learning Progress',
      totalWords: 'Total Words',
      knownWords: 'Known Words',
      unknownWords: 'Unknown Words',
      favoriteWords: 'Favorite Words',
      completedDays: 'Completed Days',
      accuracy: 'Accuracy',
      studyStreak: 'Study Streak',
    },
    // Common
    common: {
      loading: 'Loading...',
      error: 'Something went wrong',
      retry: 'Retry',
      save: 'Save',
      cancel: 'Cancel',
      confirm: 'Confirm',
      close: 'Close',
      back: 'Back',
      continue: 'Continue',
      done: 'Done',
      all: 'All',
      none: 'None',
      clear: 'Clear',
      filter: 'Filter',
      sort: 'Sort',
      search: 'Search',
      keyboardShortcuts: 'Keyboard Shortcuts',
      theme: {
        light: 'Light',
        dark: 'Dark',
        system: 'System',
      },
    },
  },
  tr: {
    nav: {
      home: 'Ana Sayfa',
      daily: 'Günlük Dersler',
      words: 'Tüm Kelimeler',
      quiz: 'Test',
      statistics: 'İstatistikler',
      theme: 'Tema',
      language: 'Dil',
    },
    home: {
      hero: {
        title: 'İngilizce Kelimeleri Master Yap',
        subtitle: 'Türkçe ve Arapça çevirileriyle İngilizce kelimeleri öğrenin ve pratik yapın',
        cta: 'Öğrenmeye Başla',
        stats: 'Öğrenilecek Kelime',
      },
      quickNav: {
        daily: 'Günlük Dersler',
        words: 'Tüm Kelimeler',
        quiz: 'Test',
        statistics: 'İstatistikler',
      },
      progress: 'İlerlemen',
      totalWords: 'Toplam Kelime',
      knownWords: 'Bilinen Kelimeler',
      favoriteWords: 'Favoriler',
      completedDays: 'Tamamlanan Günler',
    },
    daily: {
      title: 'Günlük Dersler',
      day: 'Gün {{number}}',
      words: '{{count}} Kelime',
      start: 'Başla',
      completed: 'Tamamlandı',
      inProgress: 'Devam Ediyor',
      notStarted: 'Başlanmadı',
    },
    study: {
      title: 'Gün {{number}}',
      wordsPerStudy: 'Çalışma Başına Kelime',
      showTranslation: 'Çeviriyi Göster',
      hideTranslation: 'Çeviriyi Gizle',
      previous: 'Önceki',
      next: 'Sonraki',
      favorite: 'Favori',
      known: 'Biliyorum',
      unknown: 'Bilmiyorum',
      progress: 'Kelime {{current}} / {{total}}',
      completed: 'Ders Tamamlandı!',
      continue: 'Devam Et',
    },
    words: {
      title: 'Tüm Kelimeler',
      search: 'Kelimelerde ara...',
      filter: 'Filtrele',
      sort: 'Sırala',
      noResults: 'Kelime bulunamadı',
      total: 'Toplam: {{count}} kelime',
    },
    quiz: {
      title: 'Test',
      modes: {
        'en-tr': 'İngilizce → Türkçe',
        'en-ar': 'İngilizce → Arapça',
        'tr-en': 'Türkçe → İngilizce',
        'ar-en': 'Arapça → İngilizce',
      },
      selectMode: 'Test Modu Seç',
      start: 'Testi Başlat',
      question: 'Soru {{current}} / {{total}}',
      correct: 'Doğru!',
      incorrect: 'Yanlış!',
      next: 'Sonraki Soru',
      results: 'Test Sonuçları',
      accuracy: 'Doğruluk Oranı',
      retry: 'Tekrar Dene',
      review: 'Yanlışları İncele',
      back: 'Ana Sayfaya Dön',
      correctAnswer: 'Doğru Cevap',
    },
    statistics: {
      title: 'İstatistikler',
      overview: 'Genel Bakış',
      learningProgress: 'Öğrenme İlerlemesi',
      totalWords: 'Toplam Kelime',
      knownWords: 'Bilinen Kelimeler',
      unknownWords: 'Bilinmeyen Kelimeler',
      favoriteWords: 'Favori Kelimeler',
      completedDays: 'Tamamlanan Günler',
      accuracy: 'Doğruluk Oranı',
      studyStreak: 'Çalışma Serisi',
    },
    common: {
      loading: 'Yükleniyor...',
      error: 'Bir hata oluştu',
      retry: 'Tekrar Dene',
      save: 'Kaydet',
      cancel: 'İptal',
      confirm: 'Onayla',
      close: 'Kapat',
      back: 'Geri',
      continue: 'Devam Et',
      done: 'Tamam',
      all: 'Tümü',
      none: 'Hiçbiri',
      clear: 'Temizle',
      filter: 'Filtrele',
      sort: 'Sırala',
      search: 'Ara',
      theme: {
        light: 'Aydınlık',
        dark: 'Karanlık',
        system: 'Sistem',
      },
    },
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      daily: 'الدروس اليومية',
      words: 'جميع الكلمات',
      quiz: 'اختبار',
      statistics: 'الإحصائيات',
      theme: 'المظهر',
      language: 'اللغة',
    },
    home: {
      hero: {
        title: 'إتقان المفردات الإنجليزية',
        subtitle: 'تعلم وممارسة الكلمات الإنجليزية مع ترجمات بالتركية والعربية',
        cta: 'ابدأ التعلم',
        stats: 'كلمات للتعلم',
      },
      quickNav: {
        daily: 'الدروس اليومية',
        words: 'جميع الكلمات',
        quiz: 'اختبار',
        statistics: 'الإحصائيات',
      },
      progress: 'تقدمك',
      totalWords: 'إجمالي الكلمات',
      knownWords: 'الكلمات المعروفة',
      favoriteWords: 'المفضلة',
      completedDays: 'الأيام المكتملة',
    },
    daily: {
      title: 'الدروس اليومية',
      day: 'اليوم {{number}}',
      words: '{{count}} كلمة',
      start: 'ابدأ',
      completed: 'مكتمل',
      inProgress: 'قيد التقدم',
      notStarted: 'لم يبدأ',
    },
    study: {
      title: 'اليوم {{number}}',
      wordsPerStudy: 'كلمات لكل دراسة',
      showTranslation: 'إظهار الترجمة',
      hideTranslation: 'إخفاء الترجمة',
      previous: 'السابق',
      next: 'التالي',
      favorite: 'المفضلة',
      known: 'أعرفها',
      unknown: 'لا أعرفها',
      progress: 'كلمة {{current}} / {{total}}',
      completed: 'تم إكمال الدرس!',
      continue: 'استمر',
    },
    words: {
      title: 'جميع الكلمات',
      search: 'ابحث في الكلمات...',
      filter: 'تصفية',
      sort: 'ترتيب',
      noResults: 'لم يتم العثور على كلمات',
      total: 'الإجمالي: {{count}} كلمة',
    },
    quiz: {
      title: 'اختبار',
      modes: {
        'en-tr': 'إنجليزي → تركي',
        'en-ar': 'إنجليزي → عربي',
        'tr-en': 'تركي → إنجليزي',
        'ar-en': 'عربي → إنجليزي',
      },
      selectMode: 'اختر وضع الاختبار',
      start: 'ابدأ الاختبار',
      question: 'سؤال {{current}} / {{total}}',
      correct: 'صحيح!',
      incorrect: 'خطأ!',
      next: 'السؤال التالي',
      results: 'نتائج الاختبار',
      accuracy: 'نسبة الدقة',
      retry: 'إعادة المحاولة',
      review: 'مراجعة الأخطاء',
      back: 'العودة للرئيسية',
      correctAnswer: 'الإجابة الصحيحة',
    },
    statistics: {
      title: 'الإحصائيات',
      overview: 'نظرة عامة',
      learningProgress: 'تقدم التعلم',
      totalWords: 'إجمالي الكلمات',
      knownWords: 'الكلمات المعروفة',
      unknownWords: 'الكلمات غير المعروفة',
      favoriteWords: 'الكلمات المفضلة',
      completedDays: 'الأيام المكتملة',
      accuracy: 'نسبة الدقة',
      studyStreak: 'سلسلة الدراسة',
    },
    common: {
      loading: 'جاري التحميل...',
      error: 'حدث خطأ ما',
      retry: 'إعادة المحاولة',
      save: 'حفظ',
      cancel: 'إلغاء',
      confirm: 'تأكيد',
      close: 'إغلاق',
      back: 'رجوع',
      continue: 'استمر',
      done: 'تم',
      all: 'الكل',
      none: 'لا شيء',
      clear: 'مسح',
      filter: 'تصفية',
      sort: 'ترتيب',
      search: 'بحث',
      theme: {
        light: 'فاتح',
        dark: 'داكن',
        system: 'النظام',
      },
    },
  },
};

export function getTranslation(locale: Locale, key: string): string {
  const keys = key.split('.');
  let value: unknown = translations[locale];
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = (value as Record<string, unknown>)[k];
    } else {
      return key;
    }
  }
  return typeof value === 'string' ? value : key;
}

export function translate(locale: Locale, key: string, params?: Record<string, string | number>): string {
  let text = getTranslation(locale, key);
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      text = text.replace(`{{${k}}}`, String(v));
    }
  }
  return text;
}