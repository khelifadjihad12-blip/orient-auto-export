import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.orientautoexport.com";
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

  return sections.map((s) => ({
    url: `${base}/${s}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: s === "" ? 1 : 0.7,
  }));
}
