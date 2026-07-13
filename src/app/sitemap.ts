import type { MetadataRoute } from "next";
import { legalDocuments } from "@/lib/legal";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://orient-auto-export.khelifadjihad12.workers.dev";
  const now = new Date();

  const sections = [
    "",
    "#brands",
    "#vehicles",
    "#process",
    "#shipping",
    "#about",
    "#insights",
    "#contact",
    "#quote",
  ];

  const sectionEntries: MetadataRoute.Sitemap = sections.map((s) => ({
    url: `${base}/${s}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: s === "" ? 1 : 0.7,
  }));

  const legalEntries: MetadataRoute.Sitemap = [
    {
      url: `${base}/legal`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    ...legalDocuments.map((doc) => ({
      url: `${base}/legal/${doc.slug}`,
      lastModified: new Date(doc.lastUpdated),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];

  return [...sectionEntries, ...legalEntries];
}
