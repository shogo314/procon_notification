import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Procon Notification",
  description: "プログラミングコンテスト通知・一覧サービス",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${geistSans.variable} ${geistMono.variable}`}>
    <head>
      <link rel="icon" href="/favicon.png" type="image/png" />
    </head>
      <body className="antialiased bg-white text-black min-h-screen">
        <header className="border-b py-4 px-4 bg-gray-50">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <h1 className="text-xl font-bold">
              <Link href="/">Procon Notification</Link>
            </h1>
            <nav className="space-x-4 text-sm">
              <Link href="/" className="hover:underline">
                コンテスト一覧
              </Link>
              <Link href="/about" className="hover:underline">
                このサイトについて
              </Link>
            </nav>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
