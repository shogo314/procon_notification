export interface ContestEntry {
  resource: string;
  id: string;
  event: string;
  href: string;
  start: string; // ISO 8601 string
  end: string;
  duration: number; // 秒数
}

export type ContestData = Record<string, ContestEntry>;
