import { db } from "@/lib/db";
import type {
  PublicSpec,
  PublicVehicle,
  PublicBrand,
  PublicShippingRoute,
  PublicTestimonial,
  PublicFaq,
  PublicArticle,
  PlatformStats,
} from "@/lib/types";

export type {
  PublicSpec,
  PublicVehicle,
  PublicBrand,
  PublicShippingRoute,
  PublicTestimonial,
  PublicFaq,
  PublicArticle,
  PlatformStats,
};

/**
 * Server-side data accessors using the libSQL client directly.
 *
 * This bypasses Prisma to avoid the native query engine's `fs.readdir`
 * dependency, which is unavailable on Cloudflare Workers.
 *
 * All list-type fields stored as JSON strings are parsed here.
 */

function safeParseJson<T>(value: unknown, fallback: T): T {
  if (typeof value !== "string") return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

/** Wrap a DB query so transient failures return a fallback. */
async function safeQuery<T>(fallback: T, fn: () => Promise<T>): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.error("[data] query failed:", err instanceof Error ? err.message : err);
    }
    return fallback;
  }
}

interface DbRow {
  [key: string]: unknown;
}

function str(val: unknown): string {
  return (val as string) ?? "";
}
function num(val: unknown): number {
  return (val as number) ?? 0;
}
function maybeStr(val: unknown): string | null {
  return val == null ? null : String(val);
}
function maybeNum(val: unknown): number | null {
  return val == null ? null : Number(val);
}

export async function getBrands(): Promise<PublicBrand[]> {
  return safeQuery([], async () => {
    const result = await db.execute(
      'SELECT id, slug, name, country, founded, description, history FROM "Brand" ORDER BY name ASC'
    );
    const brands = result.rows as DbRow[];
    // Get model counts
    const countResult = await db.execute(
      'SELECT "brandId", COUNT(*) as cnt FROM "Vehicle" GROUP BY "brandId"'
    );
    const counts = new Map<string, number>();
    for (const row of countResult.rows as DbRow[]) {
      counts.set(str(row.brandId), num(row.cnt));
    }
    return brands.map((b) => ({
      id: str(b.id),
      slug: str(b.slug),
      name: str(b.name),
      country: str(b.country),
      founded: maybeNum(b.founded),
      description: str(b.description),
      history: maybeStr(b.history),
      modelCount: counts.get(str(b.id)) ?? 0,
    }));
  });
}

export async function getVehicles(opts?: {
  featuredOnly?: boolean;
  limit?: number;
}): Promise<PublicVehicle[]> {
  return safeQuery([], async () => {
    const where = opts?.featuredOnly ? ' WHERE "published" = 1 AND "featured" = 1' : ' WHERE "published" = 1';
    const limit = opts?.limit ? ` LIMIT ${Number(opts.limit)}` : "";
    const result = await db.execute(
      `SELECT v.id, v.slug, v.name, v."brandId", v."categoryId", v."energyType", v."bodyType", v."priceUsd", v.image, v.gallery, v.excerpt, v.description, v.specs, v.featured, b.name as "brandName", b.slug as "brandSlug" FROM "Vehicle" v JOIN "Brand" b ON v."brandId" = b.id${where} ORDER BY v.featured DESC, v."priceUsd" ASC${limit}`
    );
    return (result.rows as DbRow[]).map((v) => ({
      id: str(v.id),
      slug: str(v.slug),
      name: str(v.name),
      brandId: str(v.brandId),
      brandName: str(v.brandName),
      brandSlug: str(v.brandSlug),
      categoryId: maybeStr(v.categoryId),
      energyType: str(v.energyType),
      bodyType: maybeStr(v.bodyType),
      priceUsd: num(v.priceUsd),
      image: maybeStr(v.image),
      gallery: safeParseJson<string[]>(v.gallery, []),
      excerpt: str(v.excerpt),
      description: str(v.description),
      specs: safeParseJson<PublicSpec>(v.specs, {}),
      featured: Boolean(v.featured),
    }));
  });
}

export async function getShippingRoutes(): Promise<PublicShippingRoute[]> {
  return safeQuery([], async () => {
    const result = await db.execute(
      'SELECT id, "originPort", "originCountry", "destinationPort", "destinationCountry", "transitDays", incoterms, frequency, notes FROM "ShippingRoute" ORDER BY "destinationCountry" ASC, "transitDays" ASC'
    );
    return (result.rows as DbRow[]).map((r) => ({
      id: str(r.id),
      originPort: str(r.originPort),
      originCountry: str(r.originCountry),
      destinationPort: str(r.destinationPort),
      destinationCountry: str(r.destinationCountry),
      transitDays: num(r.transitDays),
      incoterms: safeParseJson<string[]>(r.incoterms, []),
      frequency: maybeStr(r.frequency),
      notes: maybeStr(r.notes),
    }));
  });
}

export async function getTestimonials(): Promise<PublicTestimonial[]> {
  return safeQuery([], async () => {
    const result = await db.execute(
      'SELECT id, name, company, country, rating, quote FROM "Testimonial" WHERE published = 1 ORDER BY "createdAt" DESC'
    );
    return (result.rows as DbRow[]).map((t) => ({
      id: str(t.id),
      name: str(t.name),
      company: maybeStr(t.company),
      country: str(t.country),
      rating: num(t.rating),
      quote: str(t.quote),
    }));
  });
}

export async function getFaqs(): Promise<PublicFaq[]> {
  return safeQuery([], async () => {
    const result = await db.execute(
      'SELECT id, question, answer, category, "order" FROM "FAQ" ORDER BY "order" ASC, "createdAt" ASC'
    );
    return (result.rows as DbRow[]).map((f) => ({
      id: str(f.id),
      question: str(f.question),
      answer: str(f.answer),
      category: str(f.category),
      order: num(f.order),
    }));
  });
}

export async function getArticles(opts?: { limit?: number }): Promise<PublicArticle[]> {
  return safeQuery([], async () => {
    const limit = opts?.limit ? ` LIMIT ${Number(opts.limit)}` : "";
    const result = await db.execute(
      `SELECT id, slug, title, excerpt, content, "coverImage", category, tags, author, "publishedAt" FROM "Article" WHERE published = 1 ORDER BY "publishedAt" DESC${limit}`
    );
    return (result.rows as DbRow[]).map((a) => ({
      id: str(a.id),
      slug: str(a.slug),
      title: str(a.title),
      excerpt: str(a.excerpt),
      content: str(a.content),
      coverImage: maybeStr(a.coverImage),
      category: str(a.category),
      tags: safeParseJson<string[]>(a.tags, []),
      author: str(a.author),
      publishedAt: new Date(str(a.publishedAt)).toISOString(),
    }));
  });
}

export async function getPlatformStats(): Promise<PlatformStats> {
  return safeQuery(
    { vehicleCount: 0, brandCount: 0, routeCount: 0, yearsInTrade: new Date().getFullYear() - 2017 },
    async () => {
      const [vehicles, brands, routes] = await Promise.all([
        db.execute('SELECT COUNT(*) as cnt FROM "Vehicle" WHERE published = 1'),
        db.execute('SELECT COUNT(*) as cnt FROM "Brand"'),
        db.execute('SELECT COUNT(*) as cnt FROM "ShippingRoute"'),
      ]);
      return {
        vehicleCount: num((vehicles.rows[0] as DbRow).cnt),
        brandCount: num((brands.rows[0] as DbRow).cnt),
        routeCount: num((routes.rows[0] as DbRow).cnt),
        yearsInTrade: new Date().getFullYear() - 2017,
      };
    }
  );
}
