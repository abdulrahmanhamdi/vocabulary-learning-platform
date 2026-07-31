import { Metadata } from 'next';

export const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://vocab-learn.vercel.app';
export const SITE_NAME = 'Vocabulary Learning Platform';

export function constructMetadata({
  title,
  description,
  path = '',
  keywords = [],
  image = '/icon.svg',
}: {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  image?: string;
}): Metadata {
  const pageTitle = title.includes(SITE_NAME) ? title : `${SITE_NAME} | ${title}`;
  const url = `${BASE_URL}${path}`;
  const defaultKeywords = [
    'vocabulary',
    'english learning',
    'turkish translation',
    'arabic translation',
    'language platform',
    'daily lessons',
    'word quiz',
    ...keywords,
  ];

  return {
    title: pageTitle,
    description,
    keywords: defaultKeywords,
    authors: [{ name: 'Eng: Abdulrahaman Hamdi' }],
    creator: 'Eng: Abdulrahaman Hamdi',
    publisher: 'VocabLearn',
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: pageTitle,
      description,
      url,
      siteName: SITE_NAME,
      images: [
        {
          url: image,
          width: 800,
          height: 600,
          alt: `${SITE_NAME} Logo`,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description,
      images: [image],
      creator: '@vocab_learn',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    icons: {
      icon: '/icon.svg',
      shortcut: '/icon.svg',
      apple: '/icon.svg',
    },
  };
}
