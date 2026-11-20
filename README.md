# Procon Notification

AtCoder、Codeforces、CodeChef などのプログラミングコンテストの日程をまとめたサイトです。開催予定、開催中、終了後24時間以内の大会を確認できます。

[コンテスト一覧を開く](https://procon-notification.pages.dev/)

## 開始告知を作る

「今後のコンテスト」で大会の「Xで告知を作成」を押すと、大会名、日本時間の開始時刻、大会URLを入力した投稿画面が開きます。予約日時はXで指定します。一覧の時刻はブラウザのタイムゾーンで表示します。

CodeChef の告知には大会名の先頭に `CodeChef` が付きます。Codeforces で同じラウンドの Div. 1 と Div. 2 が同時に始まる場合は、どちらの行からも両方をまとめた告知を作成できます。

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
