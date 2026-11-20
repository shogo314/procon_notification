'use client';

import { useEffect, useState } from 'react';
import { ContestEntry } from '@/types/contest';
import { formatDistanceToNow } from 'date-fns';
import type { Locale } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import { ja, enUS } from 'date-fns/locale';

function announcementUrl(contest: ContestEntry, contests: ContestEntry[]) {
  let { event, href } = contest;
  if (contest.resource === 'codechef.com') {
    if (!/^CodeChef\b/i.test(event)) event = `CodeChef ${event}`;
    href = href.replace('https://www.codechef.com/', 'https://codechef.com/');
  }

  if (contest.resource === 'codeforces.com') {
    const divisions = event.match(/\bDiv\. \d+\b/g);
    if (divisions?.length === 1 && ['Div. 1', 'Div. 2'].includes(divisions[0])) {
      const division = divisions[0];
      const isFirst = division === 'Div. 1';
      const partnerName = event.replace(division, isFirst ? 'Div. 2' : 'Div. 1');
      const partner = contests.find(other =>
        other.resource === contest.resource && other.event === partnerName &&
        Date.parse(other.start) === Date.parse(contest.start)
      );
      if (partner) {
        event = event.replace(division, 'Div. 1, Div. 2');
        const ids = isFirst ? [contest.id, partner.id] : [partner.id, contest.id];
        href = `https://codeforces.com/contests/${ids.join(',')}`;
      }
    }
  }

  const time = formatInTimeZone(contest.start, 'Asia/Tokyo', 'HH:mm');
  const text = `${event}\nが ${time} から始まります\n${href}`;
  return `https://twitter.com/intent/tweet?${new URLSearchParams({ text })}`;
}

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
                <th className="px-4 py-2 border">
                  {timeTarget === 'start' ? 'Start time' : 'End time'}
                </th>
                <th className="px-4 py-2 border">{timeLabel}</th>
                <th className="px-4 py-2 border">Duration</th>
                <th className="px-4 py-2 border">Event</th>
                <th className="px-4 py-2 border">Site</th>
                {timeTarget === 'start' && <th className="px-4 py-2 border">開始告知</th>}
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
                      {formatInTimeZone(targetTime, timeZone, 'yyyy-MM-dd HH:mm', { locale })}
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
                    {timeTarget === 'start' && (
                      <td className="px-4 py-2 border whitespace-nowrap">
                        <a
                          href={announcementUrl(contest, contests)}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${contest.event} の告知をXで作成`}
                          className="inline-block rounded border px-3 py-1 text-sm hover:underline"
                        >
                          Xで告知を作成
                        </a>
                      </td>
                    )}
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
  // 静的書き出し時（ビルド時刻）とブラウザでの現在時刻がずれるため、
  // 時刻に依存する表示はマウント後にだけ行う（ハイドレーション不一致を避ける）
  const [mounted, setMounted] = useState(false);
  const [locale, setLocale] = useState<Locale>(ja);
  const [timeZone, setTimeZone] = useState('Asia/Tokyo');

  useEffect(() => {
    // locale / timezone 検出
    const detectedLocale = Intl.DateTimeFormat().resolvedOptions().locale;
    const detectedZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setLocale(detectedLocale.startsWith('ja') ? ja : enUS);
    setTimeZone(detectedZone);
    setMounted(true);
  }, []);

  const [ongoing, upcoming, recentlyEnded] = (() => {
    if (!mounted) return [[], [], []];

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

    ongoing.sort((a, b) => new Date(a.end).getTime() - new Date(b.end).getTime());
    recentlyEnded.sort((a, b) => new Date(b.end).getTime() - new Date(a.end).getTime());
    upcoming.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());

    return [ongoing, upcoming, recentlyEnded];
  })();

  if (!mounted) {
    return <p className="text-gray-500">読み込み中...</p>;
  }

  return (
    <>
      <p className="mb-6 text-sm text-gray-600">
        現在時刻: {formatInTimeZone(new Date(), timeZone, "yyyy-MM-dd'T'HH:mm:ssXXX")}
      </p>
      <ContestTable title="⏳ 現在進行中のコンテスト" contests={ongoing} locale={locale} timeZone={timeZone} timeTarget="end" />
      <ContestTable title="🕓 終了したコンテスト（24時間以内）" contests={recentlyEnded} locale={locale} timeZone={timeZone} timeTarget="end" />
      <ContestTable title="📅 今後のコンテスト" contests={upcoming} locale={locale} timeZone={timeZone} timeTarget="start" />
    </>
  );
}
