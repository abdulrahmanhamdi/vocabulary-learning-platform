import { NextResponse } from 'next/server';
import { allWords } from '@vocabulary/shared';

export async function GET() {
  return NextResponse.json(allWords);
}
