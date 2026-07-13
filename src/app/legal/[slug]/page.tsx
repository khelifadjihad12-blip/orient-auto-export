import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { legalDocuments, getLegalDocument, getAllLegalSlugs } from "@/lib/legal";
import { LegalDocumentView } from "@/components/legal/legal-document-view";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { WhatsAppFab } from "@/components/site/whatsapp-fab";

export function generateStaticParams() {
  return getAllLegalSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then((p) => {
    const doc = getLegalDocument(p.slug);
    if (!doc) return { title: "Not Found" };
    return {
      title: doc.title,
      description: doc.description,
      alternates: { canonical: `/legal/${doc.slug}` },
      openGraph: {
        title: `${doc.title} | HAKO AUTOMOBILE`,
        description: doc.description,
        type: "article",
      },
    };
  });
}

export default async function LegalDocumentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = getLegalDocument(slug);
  if (!doc) notFound();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main id="main-content" className="flex-1 bg-muted/30 py-16 sm:py-24">
        <LegalDocumentView doc={doc} />
      </main>
      <Footer />
      <WhatsAppFab />
    </div>
  );
}
