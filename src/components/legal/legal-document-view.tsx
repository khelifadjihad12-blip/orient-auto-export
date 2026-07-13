"use client";

import Link from "next/link";
import { ArrowRight, ArrowLeft, FileText } from "lucide-react";
import type { LegalDocument } from "@/lib/legal";
import { Button } from "@/components/ui/button";

/**
 * Renders a legal document in a clean, readable typographic layout.
 * Converts simple markdown (headings, bold, lists, paragraphs) to JSX.
 */
export function LegalDocumentView({ doc }: { doc: LegalDocument }) {
  return (
    <article className="mx-auto max-w-3xl">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground" aria-label="Breadcrumb">
        <Link href="/legal" className="hover:text-foreground transition-colors">
          Legal
        </Link>
        <span className="text-border">/</span>
        <span className="text-foreground font-medium">{doc.title}</span>
      </nav>

      {/* Header */}
      <header className="mb-10 border-b border-border pb-6">
        <div className="mb-3 flex items-center gap-2">
          <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <FileText className="size-5" />
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {doc.category}
          </span>
        </div>
        <h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {doc.title}
        </h1>
        <p className="mt-3 text-base text-muted-foreground">{doc.description}</p>
        <p className="mt-2 text-xs text-muted-foreground">
          Last updated: {doc.lastUpdated}
        </p>
      </header>

      {/* Content */}
      <div className="legal-content">{renderMarkdown(doc.content)}</div>

      {/* Footer */}
      <footer className="mt-12 border-t border-border pt-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link href="/legal">
            <Button variant="outline" size="sm" className="gap-1.5">
              <ArrowLeft className="size-4 rtl:rotate-180" />
              All legal documents
            </Button>
          </Link>
          <Link href="/#contact">
            <Button variant="ghost" size="sm" className="gap-1.5">
              Contact us
              <ArrowRight className="size-4 rtl:rotate-180" />
            </Button>
          </Link>
        </div>
      </footer>
    </article>
  );
}

/** Minimal markdown-to-JSX renderer for legal content. */
function renderMarkdown(md: string): React.ReactNode {
  const lines = md.split("\n");
  const blocks: React.ReactNode[] = [];
  let listItems: React.ReactNode[] = [];
  let listType: "ul" | "ol" | null = null;
  let key = 0;

  function flushList() {
    if (listItems.length === 0) return;
    if (listType === "ol") {
      blocks.push(
        <ol key={key++} className="my-3 list-decimal space-y-2 ps-6 text-sm leading-relaxed text-foreground ltr:pl-6 rtl:pr-6">
          {listItems}
        </ol>
      );
    } else {
      blocks.push(
        <ul key={key++} className="my-3 list-disc space-y-2 ps-6 text-sm leading-relaxed text-foreground ltr:pl-6 rtl:pr-6">
          {listItems}
        </ul>
      );
    }
    listItems = [];
    listType = null;
  }

  for (const raw of lines) {
    const line = raw.trimEnd();

    // Heading
    if (line.startsWith("### ")) {
      flushList();
      blocks.push(
        <h3 key={key++} className="mt-6 mb-2 font-display text-lg font-semibold text-foreground">
          {inline(line.slice(4))}
        </h3>
      );
    } else if (line.startsWith("## ")) {
      flushList();
      blocks.push(
        <h2 key={key++} className="mt-8 mb-3 font-display text-xl font-bold text-foreground sm:text-2xl">
          {inline(line.slice(3))}
        </h2>
      );
    } else if (line.startsWith("# ")) {
      flushList();
      // Skip the H1 — the header already shows the title
    } else if (line.startsWith("- ")) {
      if (listType && listType !== "ul") flushList();
      listType = "ul";
      listItems.push(
        <li key={key++}>{inline(line.slice(2))}</li>
      );
    } else if (/^\d+\.\s/.test(line)) {
      if (listType && listType !== "ol") flushList();
      listType = "ol";
      listItems.push(
        <li key={key++}>{inline(line.replace(/^\d+\.\s/, ""))}</li>
      );
    } else if (line === "") {
      flushList();
    } else {
      flushList();
      blocks.push(
        <p key={key++} className="my-3 text-sm leading-relaxed text-foreground sm:text-base">
          {inline(line)}
        </p>
      );
    }
  }
  flushList();

  return blocks;
}

/** Render inline markdown: **bold** and *italic*. */
function inline(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    // Bold
    const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
    if (boldMatch && boldMatch.index !== undefined) {
      if (boldMatch.index > 0) parts.push(remaining.slice(0, boldMatch.index));
      parts.push(
        <strong key={key++} className="font-semibold text-foreground">
          {boldMatch[1]}
        </strong>
      );
      remaining = remaining.slice(boldMatch.index + boldMatch[0].length);
      continue;
    }
    // Italic
    const italicMatch = remaining.match(/\*(.+?)\*/);
    if (italicMatch && italicMatch.index !== undefined) {
      if (italicMatch.index > 0) parts.push(remaining.slice(0, italicMatch.index));
      parts.push(
        <em key={key++} className="italic">
          {italicMatch[1]}
        </em>
      );
      remaining = remaining.slice(italicMatch.index + italicMatch[0].length);
      continue;
    }
    parts.push(remaining);
    break;
  }

  return parts;
}
