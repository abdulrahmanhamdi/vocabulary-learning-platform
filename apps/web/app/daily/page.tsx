import { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo';
import DailyPage from './daily-client';

export const metadata: Metadata = constructMetadata({
  title: 'Daily Lessons',
  description: 'Practice English vocabulary sorted into daily bite-sized lessons with interactive study progress.',
  path: '/daily',
});

export default function Page() {
  return <DailyPage />;
}
