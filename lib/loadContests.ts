import fs from 'fs';
import path from 'path';
import { ContestEntry } from '@/types/contest';

export function loadAllContests(): ContestEntry[] {
  const contestDir = path.join(process.cwd(), 'data/contest');
  const files = fs.readdirSync(contestDir).filter((file) => file.endsWith('.json'));

  let allContests: ContestEntry[] = [];

  for (const file of files) {
    const fullPath = path.join(contestDir, file);
    const json = fs.readFileSync(fullPath, 'utf-8');
    const data: Record<string, ContestEntry> = JSON.parse(json); // ここはRecord<string, ContestEntry>
    allContests.push(...Object.values(data)); // Object.valuesはContestEntry[]
  }

  return allContests;
}
