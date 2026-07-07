import type { PublicVehicle, PublicFaq, PublicArticle } from "@/lib/types";

const SITE_URL = "https://www.orientautoexport.com";

/**
 * JSON-LD structured data for SEO. Rendered server-side in the page <head>
 * via a <script type="application/ld+json"> tag. Improves rich-result
 * eligibility for products, FAQs and breadcrumbs.
 */
export function StructuredData({
  vehicles,
  faqs,
  articles,
}: {
  vehicles: PublicVehicle[];
  faqs: PublicFaq[];
  articles: PublicArticle[];
}) {
  const blocks: Record<string, unknown>[] = [];

  // ── ItemList of vehicles (Product schema) ─────────────────────
  if (vehicles.length > 0) {
    blocks.push({
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Brand-New Chinese Vehicles for Export",
      itemListElement: vehicles.slice(0, 12).map((v, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Product",
          name: `${v.brandName} ${v.name}`,
          description: v.excerpt,
          category: v.bodyType ?? "Vehicle",
          brand: {
            "@type": "Brand",
            name: v.brandName,
          },
          image: v.image ? `${SITE_URL}${v.image}` : undefined,
          offers: {
            "@type": "Offer",
            priceCurrency: "USD",
            price: v.priceUsd,
            availability: "https://schema.org/InStock",
            seller: {
              "@type": "Organization",
              name: "Orient Auto Export Limited",
            },
          },
        },
      })),
    });
  }

  // ── FAQPage schema ────────────────────────────────────────────
  if (faqs.length > 0) {
    blocks.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: f.answer,
        },
      })),
    });
  }

  // ── BreadcrumbList ────────────────────────────────────────────
  blocks.push({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Vehicles",
        item: `${SITE_URL}/#vehicles`,
      },
    ],
  });

  // ── Article schema for the latest article ────────────────────
  if (articles.length > 0) {
    const a = articles[0];
    blocks.push({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: a.title,
      description: a.excerpt,
      image: a.coverImage ? `${SITE_URL}${a.coverImage}` : undefined,
      datePublished: a.publishedAt,
      author: {
        "@type": "Organization",
        name: a.author,
      },
      publisher: {
        "@type": "Organization",
        name: "Orient Auto Export Limited",
      },
    });
  }

  return (
    <>
      {blocks.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
    </>
  );
}
