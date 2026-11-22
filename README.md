# Procon Notification

AtCoder、Codeforces、CodeChef などのプログラミングコンテストの日程をまとめたサイトです。開催予定、開催中、終了後24時間以内の大会を確認できます。

[コンテスト一覧を開く](https://procon-notification.pages.dev/)

## 開始告知を作る

「今後のコンテスト」の各大会には、告知用のボタンが2つあります。告知文には大会名、日本時間の開始時刻、大会URLが入ります。一覧の時刻はブラウザのタイムゾーンで表示します。

- 「今すぐ投稿」: 告知文を入力したXの投稿画面が開きます。この画面では予約できません。
- 「コピーして予約」: 告知文をクリップボードにコピーし、Xの通常の投稿画面を新しいタブで開きます。貼り付けてから、予約ボタンで日時を指定します。

CodeChef と LeetCode の告知には、大会名の先頭にそれぞれ `CodeChef`、`LeetCode` が付きます。Codeforces で同じラウンドの Div. 1 と Div. 2 が同時に始まる場合は、どちらの行からも両方をまとめた告知を作成できます。

## ローカルで動かす

Node.js 22 を使い、リポジトリのルートで次のコマンドを実行します。

```sh
npm ci
npm run dev
```

ブラウザで [ローカルのコンテスト一覧](http://localhost:3000/) を開きます。大会情報は `data/contest/*.json`、最終更新日時は `data/meta.json` にあります。

## 公開用ビルド

```sh
npm run build
```

Next.js が静的ファイルを `out/` に生成します。Cloudflare Pages の出力ディレクトリには `out` を指定します。
