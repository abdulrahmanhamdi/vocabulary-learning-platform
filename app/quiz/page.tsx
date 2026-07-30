import { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo';
import QuizPage from './quiz-client';

export const metadata: Metadata = constructMetadata({
  title: 'Quiz',
  description: 'Test your English vocabulary knowledge with customizable directional quiz modes and instant scoring.',
  path: '/quiz',
});

export default function Page() {
  return <QuizPage />;
}
