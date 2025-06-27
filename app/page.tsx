import fs from 'fs';
import path from 'path';
import { ContestData } from '@/types/contest';
import { format, formatDistanceToNow } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import { ja } from 'date-fns/locale';

export default async function Home() {
  const contestDir = path.join(process.cwd(), 'data/contest');

  // contestDir 内の全 .json ファイルを読み込む
  const files = fs.readdirSync(contestDir).filter((file) => file.endsWith('.json'));

  let contests = [];

  for (const file of files) {
    const fullPath = path.join(contestDir, file);
    const json = fs.readFileSync(fullPath, 'utf-8');
    const data: ContestData = JSON.parse(json);

    contests.push(...Object.values(data));
  }

  // 開始時刻でソート
  contests.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6">プログラミングコンテスト一覧</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2 border">Start time</th>
              <th className="px-4 py-2 border">Starts in</th>
              <th className="px-4 py-2 border">Duration</th>
              <th className="px-4 py-2 border">Event</th>
              <th className="px-4 py-2 border">Site</th>
            </tr>
          </thead>
          <tbody>
            {contests.map((contest) => {
              const start = new Date(contest.start);
              const durationMin = contest.duration / 60;

              return (
                <tr key={contest.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border whitespace-nowrap">
                    {formatInTimeZone(start, 'Asia/Tokyo', 'yyyy-MM-dd HH:mm', { locale: ja })}
                  </td>
                  <td className="px-4 py-2 border whitespace-nowrap">
                    {formatDistanceToNow(start, {
                      addSuffix: true,
                      locale: ja,
                    })}
                  </td>
                  <td className="px-4 py-2 border">{durationMin} 分</td>
                  <td className="px-4 py-2 border">
                    <a
                      href={contest.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {contest.event}
                    </a>
                  </td>
                  <td className="px-4 py-2 border">{contest.resource}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
}
