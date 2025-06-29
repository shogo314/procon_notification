import { NextResponse } from 'next/server';
import { loadMeta } from '@/lib/loadMeta';

export async function GET() {
  const meta = loadMeta();
  return NextResponse.json(meta);
}
