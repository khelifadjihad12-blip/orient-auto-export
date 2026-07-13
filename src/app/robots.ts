import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: "https://orient-auto-export.khelifadjihad12.workers.dev/sitemap.xml",
    host: "https://orient-auto-export.khelifadjihad12.workers.dev",
  };
}
