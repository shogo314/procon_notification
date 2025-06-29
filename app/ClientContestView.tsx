'use client';

import { useEffect, useState } from 'react';
import { ContestEntry } from '@/types/contest';
import { formatDistanceToNow } from 'date-fns';
import type { Locale } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import { ja, enUS } from 'date-fns/locale';

function TimeUntil({ target, locale }: { target: Date; locale?: Locale }) {
  const [text, setText] = useState(() =>
    formatDistanceToNow(target, { addSuffix: true, locale })
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setText(formatDistanceToNow(target, { addSuffix: true, locale }));
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, [target, locale]);

  return <>{text}</>;
}

function ContestTable({
  title,
  contests,
  locale,
  timeZone,
  timeTarget,
}: {
  title: string;
  contests: ContestEntry[];
  locale: Locale;
  timeZone: string;
  timeTarget: 'start' | 'end';
}) {
  const timeLabel =
    timeTarget === 'start' ? 'Starts in' : 'Ends / Ended';

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
                <th className="px-4 py-2 border">{timeLabel}</th>
                <th className="px-4 py-2 border">Duration</th>
                <th className="px-4 py-2 border">Event</th>
                <th className="px-4 py-2 border">Site</th>
              </tr>
            </thead>
            <tbody>
              {contests.map((contest) => {
                const start = new Date(contest.start);
                const end = new Date(contest.end);
                const durationMin = contest.duration / 60;
                const targetTime = timeTarget === 'start' ? start : end;

                return (
                  <tr key={contest.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border whitespace-nowrap">
                      {formatInTimeZone(start, timeZone, 'yyyy-MM-dd HH:mm', { locale })}
                    </td>
                    <td className="px-4 py-2 border whitespace-nowrap">
                      <TimeUntil target={targetTime} locale={locale} />
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

export default function ClientContestView() {
  const [contests, setContests] = useState<ContestEntry[] | null>(null);
  const [locale, setLocale] = useState<Locale>(ja);
  const [timeZone, setTimeZone] = useState('Asia/Tokyo');

  useEffect(() => {
    // locale / timezone 検出
    const detectedLocale = Intl.DateTimeFormat().resolvedOptions().locale;
    const detectedZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setLocale(detectedLocale.startsWith('ja') ? ja : enUS);
    setTimeZone(detectedZone);

    // API から取得
    fetch('/api/contests')
      .then((res) => res.json())
      .then((data: ContestEntry[]) => setContests(data));
  }, []);

  const [ongoing, upcoming, recentlyEnded] = (() => {
    if (!contests) return [[], [], []];

    const now = new Date();
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

    return [ongoing, upcoming, recentlyEnded];
  })();

  if (!contests) {
    return <p className="text-gray-500">読み込み中...</p>;
  }

  return (
    <>
      <ContestTable title="⏳ 現在進行中のコンテスト" contests={ongoing} locale={locale} timeZone={timeZone} timeTarget="end" />
      <ContestTable title="🕓 終了したコンテスト（24時間以内）" contests={recentlyEnded} locale={locale} timeZone={timeZone} timeTarget="end" />
      <ContestTable title="📅 今後のコンテスト" contests={upcoming} locale={locale} timeZone={timeZone} timeTarget="start" />
    </>
  );
}
