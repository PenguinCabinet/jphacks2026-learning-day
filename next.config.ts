import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cloudflare Pages は静的アセットを配信するため static export して out/ を生成する
  output: "export",
  images: {
    unoptimized: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
