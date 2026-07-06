import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  images: {
    // ZAI in-house image-search OSS host (real vehicle & stock photography)
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sfile.chatglm.cn",
        pathname: "/images-ppt/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
