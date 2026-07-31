import { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo';
import StudyPage from './day-study-client';

type Props = {
  params: Promise<{ day: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { day } = await params;
  return constructMetadata({
    title: `Daily Lesson - Day ${day}`,
    description: `Study vocabulary words for Day ${day} with interactive flashcards, audio pronunciation, and translations.`,
    path: `/daily/${day}`,
  });
}

export default function Page() {
  return <StudyPage />;
}
