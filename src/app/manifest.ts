import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Orient Auto Export — Brand-New Chinese Vehicle Export",
    short_name: "Orient Auto Export",
    description:
      "Hong Kong registered automobile trading company exporting brand-new Chinese vehicles to Algeria and North Africa.",
    start_url: "/",
    display: "standalone",
    background_color: "#0f1838",
    theme_color: "#0f1838",
    icons: [
      {
        src: "/images/og-cover.png",
        sizes: "1344x768",
        type: "image/png",
      },
    ],
  };
}
