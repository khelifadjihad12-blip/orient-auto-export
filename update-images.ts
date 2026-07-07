import { db } from "./src/lib/db";

/**
 * One-off migration: update vehicle images to real, high-quality photographs
 * sourced via the ZAI image-search service (OSS-hosted on sfile.chatglm.cn).
 *
 * Run with: bun run update-images.ts
 */
const IMAGE_MAP: Record<string, string> = {
  "byd-han-ev": "https://sfile.chatglm.cn/images-ppt/f2f9ba0df89d.jpg",
  "byd-atto-3": "https://sfile.chatglm.cn/images-ppt/cf859e0f027d.jpg",
  "geely-monjaro": "https://sfile.chatglm.cn/images-ppt/a83cc1b6ae3b.jpg",
  "chery-tiggo-8-pro": "https://sfile.chatglm.cn/images-ppt/3f8d207f2c88.jpg",
  "gac-gs8": "https://sfile.chatglm.cn/images-ppt/fbf0d0269062.jpg",
  "zeekr-001": "https://sfile.chatglm.cn/images-ppt/db1983ffbba4.jpg",
  "hongqi-h9": "https://sfile.chatglm.cn/images-ppt/2de1abd6dc2b.jpg",
  "haval-h6": "https://sfile.chatglm.cn/images-ppt/66cf8f5e59d3.jpg",
  "jetour-dashing": "https://sfile.chatglm.cn/images-ppt/2ddf9e28ffce.jpg",
  "changan-cs75-plus": "https://sfile.chatglm.cn/images-ppt/d66868b5cbb7.jpg",
  "mg-4-ev": "https://sfile.chatglm.cn/images-ppt/543cea326ce6.png",
  "dongfeng-rich-6-ev": "https://sfile.chatglm.cn/images-ppt/05e6c72e7a73.jpg",
};

async function main() {
  console.log("🖼️  Updating vehicle images to real photographs...");
  let updated = 0;
  for (const [slug, url] of Object.entries(IMAGE_MAP)) {
    const v = await db.vehicle.findUnique({ where: { slug } });
    if (!v) {
      console.warn(`  ⚠ vehicle not found: ${slug}`);
      continue;
    }
    await db.vehicle.update({
      where: { slug },
      data: {
        image: url,
        // Also seed the gallery with the hero image so the detail dialog has media
        gallery: JSON.stringify([url]),
      },
    });
    updated++;
    console.log(`  ✓ ${slug} → ${url}`);
  }
  console.log(`\n✅ Updated ${updated} vehicle images.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
