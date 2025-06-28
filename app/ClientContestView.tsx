'use client';

import { useEffect, useState } from 'react';
import { ContestEntry } from '@/types/contest';
import { formatDistanceToNow } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import { ja } from 'date-fns/locale';

function TimeUntil({ target }: { target: Date }) {
  const [text, setText] = useState(() =>
    formatDistanceToNow(target, { addSuffix: true, locale: ja })
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setText(formatDistanceToNow(target, { addSuffix: true, locale: ja }));
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, [target]);

  return <>{text}</>;
}

function ContestTable({
  title,
  contests,
}: {
  title: string;
  contests: ContestEntry[];
}) {
  return (
    <section className="mb-12">
      <h2 className="text-xl font-bold mb-3">{title}</h2>
      {contests.length === 0 ? (
        <p className="text-gray-500">コンテストはありません。</p>
      ) : (
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
                      <TimeUntil target={start} />
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
      )}
    </section>
  );
}

export default function ClientContestView({ contests }: { contests: ContestEntry[] }) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60 * 1000);
    return () => clearInterval(timer);
  }, []);

  const ongoing: ContestEntry[] = [];
  const upcoming: ContestEntry[] = [];
  const recentlyEnded: ContestEntry[] = [];

  for (const contest of contests) {
    const start = new Date(contest.start);
    const end = new Date(contest.end);
    const diffSec = (now.getTime() - end.getTime()) / 1000;

    if (start <= now && now < end) {
      ongoing.push(contest);
    } else if (end <= now && diffSec <= 86400) {
      recentlyEnded.push(contest);
    } else if (start > now) {
      upcoming.push(contest);
    }
  }

  ongoing.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
  recentlyEnded.sort((a, b) => new Date(b.end).getTime() - new Date(a.end).getTime());
  upcoming.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());

  return (
    <>
      <ContestTable title="⏳ 現在進行中のコンテスト" contests={ongoing} />
      <ContestTable title="🕓 終了したコンテスト（24時間以内）" contests={recentlyEnded} />
      <ContestTable title="📅 今後のコンテスト" contests={upcoming} />
    </>
  );
}
