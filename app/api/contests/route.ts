import { NextResponse } from 'next/server';
import { loadAllContests } from '@/lib/loadContests';

export async function GET() {
  const contests = loadAllContests();
  return NextResponse.json(contests);
}
