import { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo';
import WordsPage from './words-client';

export const metadata: Metadata = constructMetadata({
  title: 'All Words',
  description: 'Search, filter, and sort through the full English vocabulary directory with Turkish and Arabic translations.',
  path: '/words',
});

export default function Page() {
  return <WordsPage />;
}
