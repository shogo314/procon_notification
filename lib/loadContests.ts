import fs from 'fs';
import path from 'path';
import { ContestEntry } from '@/types/contest';

/** 終了後この時間以内のコンテストまでを表示対象として残す（ClientContestView の「24時間以内」と合わせる） */
const PAST_WINDOW_MS = 24 * 60 * 60 * 1000;

export function loadAllContests(): ContestEntry[] {
  const contestDir = path.join(process.cwd(), 'data/contest');
  const files = fs.readdirSync(contestDir).filter((file) => file.endsWith('.json'));

  const allContests: ContestEntry[] = [];

  for (const file of files) {
    const fullPath = path.join(contestDir, file);
    const json = fs.readFileSync(fullPath, 'utf-8');
    const data: Record<string, ContestEntry> = JSON.parse(json);
    allContests.push(...Object.values(data));
  }

  return allContests;
}

/**
 * ビルド時点で「今後・開催中・終了後24時間以内」のコンテストだけを返す。
 * data/contest/*.json は過去分も保持しているので、ページに埋め込むデータ量を抑えるために絞り込む。
 * 表示時の最終的な分類はクライアント側で現在時刻を使って行う。
 */
export function loadActiveContests(now: Date = new Date()): ContestEntry[] {
  const threshold = now.getTime() - PAST_WINDOW_MS;
  return loadAllContests().filter((contest) => new Date(contest.end).getTime() >= threshold);
}
