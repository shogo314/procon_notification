import fs from 'fs';
import path from 'path';

export function loadMeta() {
  const metaPath = path.join(process.cwd(), 'data/meta.json');
  const json = fs.readFileSync(metaPath, 'utf-8');
  return JSON.parse(json) as { updatedAt: string };
}
