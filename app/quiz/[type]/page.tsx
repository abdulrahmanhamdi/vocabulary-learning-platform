import { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo';
import QuizPlayPage from './quiz-play-client';

type Props = {
  params: Promise<{ type: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { type } = await params;
  const formattedType = type.charAt(0).toUpperCase() + type.slice(1);
  return constructMetadata({
    title: `Quiz - ${formattedType}`,
    description: `Take a interactive ${formattedType} vocabulary quiz and evaluate your speed and accuracy.`,
    path: `/quiz/${type}`,
  });
}

export default function Page() {
  return <QuizPlayPage />;
}
