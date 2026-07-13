import type { Metadata } from "next";
import Link from "next/link";
import { legalDocuments } from "@/lib/legal";
import { FileText, ArrowRight, ShieldCheck, Scale, Cookie, FileCheck2, Lock, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Legal Documents",
  description:
    "Privacy Policy, Terms of Trade, Cookie Policy, Trade Compliance, AML Policy, KYC Information, and Disclaimer for HAKO Global Trading Limited.",
  alternates: { canonical: "/legal" },
};

const ICONS: Record<string, typeof FileText> = {
  "privacy-policy": Lock,
  "terms-of-trade": Scale,
  "cookie-policy": Cookie,
  "trade-compliance-policy": ShieldCheck,
  "aml-policy": FileCheck2,
  "kyc-information": FileCheck2,
  "disclaimer": AlertCircle,
};

export default function LegalIndexPage() {
  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container-px mx-auto max-w-5xl py-16 sm:py-24">
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
            <ShieldCheck className="size-3.5" />
            Legal & Compliance
          </span>
          <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Legal Documents
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-balance text-base text-muted-foreground sm:text-lg">
            HAKO Global Trading Limited operates with full transparency. The following documents
            govern our business relationships and protect your rights.
          </p>
        </div>

        {/* Document grid */}
        <div className="grid gap-4 sm:grid-cols-2">
          {legalDocuments.map((doc) => {
            const Icon = ICONS[doc.slug] ?? FileText;
            return (
              <Link
                key={doc.slug}
                href={`/legal/${doc.slug}`}
                className="group flex flex-col gap-3 rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary/40 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-navy-gradient text-primary-foreground shadow-sm">
                    <Icon className="size-5" />
                  </span>
                  <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1 rtl:rotate-180" />
                </div>
                <div className="flex flex-col gap-1">
                  <h2 className="font-display text-lg font-semibold leading-tight text-foreground">
                    {doc.title}
                  </h2>
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    {doc.description}
                  </p>
                </div>
                <p className="mt-auto pt-2 text-xs text-muted-foreground">
                  Last updated: {doc.lastUpdated}
                </p>
              </Link>
            );
          })}
        </div>

        {/* Footer note */}
        <div className="mt-12 rounded-2xl border border-border bg-card p-6 text-center">
          <p className="text-sm text-muted-foreground">
            For questions regarding any of these documents, please contact us at{" "}
            <a href="mailto:CONTACT@hakoautomobile.com" className="font-medium text-primary hover:underline">
              CONTACT@hakoautomobile.com
            </a>{" "}
            or WhatsApp{" "}
            <a href="https://wa.me/213780442267" target="_blank" rel="noopener noreferrer" className="font-medium text-primary hover:underline">
              +213 780 442 267
            </a>.
          </p>
        </div>
      </div>
    </div>
  );
}
