import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cloudflare Pages で静的配信するため、ビルド結果を out/ に静的ファイルとして書き出す
  output: "export",
};

export default nextConfig;
