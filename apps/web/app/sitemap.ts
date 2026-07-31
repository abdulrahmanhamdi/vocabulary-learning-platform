import { MetadataRoute } from 'next';
import { BASE_URL } from '@/lib/seo';
import { allWords, DEFAULT_WORDS_PER_DAY } from '@vocabulary/shared';

export default function sitemap(): MetadataRoute.Sitemap {
  const totalWords = allWords.length;
  const totalDays = Math.ceil(totalWords / DEFAULT_WORDS_PER_DAY);

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/daily`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/words`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/quiz`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/statistics`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ];

  const dayRoutes: MetadataRoute.Sitemap = Array.from({ length: totalDays }, (_, i) => ({
    url: `${BASE_URL}/daily/${i + 1}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const quizTypeRoutes: MetadataRoute.Sitemap = ['daily', 'all', 'favorites', 'unknown'].map(
    (type) => ({
      url: `${BASE_URL}/quiz/${type}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    })
  );

  return [...staticRoutes, ...dayRoutes, ...quizTypeRoutes];
}
