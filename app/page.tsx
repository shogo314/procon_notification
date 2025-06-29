import { loadMeta } from '@/lib/loadMeta';
import { formatInTimeZone } from 'date-fns-tz';
import { ja } from 'date-fns/locale';
import ClientContestView from './ClientContestView';

export const revalidate = 600;

export default async function Home() {
  const meta = loadMeta();

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-8">プログラミングコンテスト一覧</h1>
      <p className="mb-8 text-gray-600">
        最終更新日時: {formatInTimeZone(new Date(meta.updatedAt), 'Asia/Tokyo', 'yyyy-MM-dd HH:mm', { locale: ja })}
      </p>

      <ClientContestView />
    </main>
  );
}
