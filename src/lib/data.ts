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

function safeParseJson<T>(value: string | null | undefined, fallback: T): T {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

/**
 * Wrap a DB query so that if the database is unreachable (e.g. during static
 * build before env vars are loaded, or a transient edge outage), we return
 * a fallback instead of crashing the build/render. The Worker re-renders on
 * the next request with live data.
 */
async function safeQuery<T>(fallback: T, fn: () => Promise<T>): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.error("[data] query failed, returning fallback:", err instanceof Error ? err.message : err);
    }
    return fallback;
  }
}

export async function getBrands(): Promise<PublicBrand[]> {
  return safeQuery([], async () => {
    const brands = await db.brand.findMany({
      orderBy: { name: "asc" },
      include: { _count: { select: { vehicles: true } } },
    });
    return brands.map((b) => ({
      id: b.id,
      slug: b.slug,
      name: b.name,
      country: b.country,
      founded: b.founded,
      description: b.description,
      history: b.history,
      modelCount: b._count.vehicles,
    }));
  });
}

export async function getVehicles(opts?: {
  featuredOnly?: boolean;
  limit?: number;
}): Promise<PublicVehicle[]> {
  return safeQuery([], async () => {
    const vehicles = await db.vehicle.findMany({
      where: {
        published: true,
        ...(opts?.featuredOnly ? { featured: true } : {}),
      },
      orderBy: [{ featured: "desc" }, { priceUsd: "asc" }],
      take: opts?.limit,
      include: { brand: true },
    });
    return vehicles.map((v) => ({
      id: v.id,
      slug: v.slug,
      name: v.name,
      brandId: v.brandId,
      brandName: v.brand.name,
      brandSlug: v.brand.slug,
      categoryId: v.categoryId,
      energyType: v.energyType,
      bodyType: v.bodyType,
      priceUsd: v.priceUsd,
      image: v.image,
      gallery: safeParseJson<string[]>(v.gallery, []),
      excerpt: v.excerpt,
      description: v.description,
      specs: safeParseJson<PublicSpec>(v.specs, {}),
      featured: v.featured,
    }));
  });
}

export async function getShippingRoutes(): Promise<PublicShippingRoute[]> {
  return safeQuery([], async () => {
    const routes = await db.shippingRoute.findMany({
      orderBy: [{ destinationCountry: "asc" }, { transitDays: "asc" }],
    });
    return routes.map((r) => ({
      id: r.id,
      originPort: r.originPort,
      originCountry: r.originCountry,
      destinationPort: r.destinationPort,
      destinationCountry: r.destinationCountry,
      transitDays: r.transitDays,
      incoterms: safeParseJson<string[]>(r.incoterms, []),
      frequency: r.frequency,
      notes: r.notes,
    }));
  });
}

export async function getTestimonials(): Promise<PublicTestimonial[]> {
  return safeQuery([], async () => {
    const testimonials = await db.testimonial.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
    });
    return testimonials.map((t) => ({
      id: t.id,
      name: t.name,
      company: t.company,
      country: t.country,
      rating: t.rating,
      quote: t.quote,
    }));
  });
}

export async function getFaqs(): Promise<PublicFaq[]> {
  return safeQuery([], async () => {
    const faqs = await db.fAQ.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    });
    return faqs.map((f) => ({
      id: f.id,
      question: f.question,
      answer: f.answer,
      category: f.category,
      order: f.order,
    }));
  });
}

export async function getArticles(opts?: { limit?: number }): Promise<PublicArticle[]> {
  return safeQuery([], async () => {
    const articles = await db.article.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
      take: opts?.limit,
    });
    return articles.map((a) => ({
      id: a.id,
      slug: a.slug,
      title: a.title,
      excerpt: a.excerpt,
      content: a.content,
      coverImage: a.coverImage,
      category: a.category,
      tags: safeParseJson<string[]>(a.tags, []),
      author: a.author,
      publishedAt: a.publishedAt.toISOString(),
    }));
  });
}

export async function getPlatformStats(): Promise<PlatformStats> {
  return safeQuery(
    {
      vehicleCount: 0,
      brandCount: 0,
      routeCount: 0,
      yearsInTrade: new Date().getFullYear() - 2017,
    },
    async () => {
      const [vehicleCount, brandCount, routeCount] = await Promise.all([
        db.vehicle.count({ where: { published: true } }),
        db.brand.count(),
        db.shippingRoute.count(),
      ]);
      return {
        vehicleCount,
        brandCount,
        routeCount,
        // Orient Auto Export established 2017
        yearsInTrade: new Date().getFullYear() - 2017,
      };
    }
  );
}
