export default function AboutPage() {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Procon Notificationについて</h1>
            <p className="text-gray-700 leading-relaxed mb-4">
                このサイトは、Xアカウント <a href="https://x.com/procon_notify" className="text-blue-600 underline">@procon_notify</a> によるプログラミングコンテスト通知を補助する目的で作られた、コンテスト情報一覧サイトです。
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">対応しているサイト</h2>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                <li><a href="https://atcoder.jp/" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">AtCoder</a></li>
                <li><a href="https://codeforces.com/" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">Codeforces</a></li>
                <li><a href="https://yukicoder.me/" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">yukicoder</a></li>
                <li><a href="https://leetcode.com/" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">LeetCode</a></li>
                <li><a href="https://www.codechef.com/" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">CodeChef</a></li>
                <li><a href="https://uoj.ac/" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">Universal Online Judge (UOJ)</a></li>
                <li><a href="https://hoj.hamako-ths.ed.jp/onlinejudge/" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">HOJ</a></li>
                <li><a href="https://olympicode.rs/" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">OlympiCode</a></li>
                <li><a href="https://kep.uz/" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">KEP</a></li>
                <li><a href="https://www.eolymp.com/" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">Eolymp</a></li>
                <li><a href="https://www.acmicpc.net/" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">Baekjoon Online Judge</a></li>
                <li><a href="https://judge.eluminatis-of-lu.com/" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">SeriousOJ</a></li>
                <li><a href="https://toph.co/" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">Toph</a></li>
                <li>ICPC（国内予選、それ以降の日本人が参加していそうなRegional）</li>
                <li>ICPC OB/OG の会によるコンテスト</li>
                <li>
                    <a href="https://www.luogu.com.cn/" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">
                        洛谷（Luogu）
                    </a>
                    （日本人参加者が少ないわりに、数が多いため通知対象外です）
                </li>
                <li>
                    <a href="https://ac.nowcoder.com/" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">
                        牛客竞赛（NowCoder）
                    </a>
                    （日本人参加者が少ないわりに、数が多いため通知対象外です）
                </li>
            </ul>


            <h2 className="text-xl font-semibold mt-6 mb-2">運営</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
                本サービスは <a href="https://x.com/shogo3142" className="text-blue-600 underline">@shogo3142</a> によって運用されています。
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">掲載依頼</h2>
            <p className="text-gray-700 leading-relaxed">
                掲載してほしいコンテストがあれば、<a href="https://x.com/procon_notify" className="text-blue-600 underline">@procon_notify</a> までご連絡ください。
            </p>
        </div>
    );
}
