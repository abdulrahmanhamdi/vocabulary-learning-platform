import { NextResponse } from 'next/server';
import allWordsData from '@/data/all-words.json';

export async function GET() {
  return NextResponse.json(allWordsData);
}
