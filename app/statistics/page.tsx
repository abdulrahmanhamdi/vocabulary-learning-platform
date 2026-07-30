import { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo';
import StatisticsPage from './statistics-client';

export const metadata: Metadata = constructMetadata({
  title: 'Statistics',
  description: 'View your vocabulary learning overview, progress metrics, completed lessons, and study streak statistics.',
  path: '/statistics',
});

export default function Page() {
  return <StatisticsPage />;
}
