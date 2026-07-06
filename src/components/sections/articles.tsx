"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, Tag } from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/site/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/components/providers/i18n-provider";
import { useQuoteStore } from "@/lib/quote-store";
import type { PublicArticle } from "@/lib/types";

function formatDate(iso: string, locale: string) {
  try {
    return new Intl.DateTimeFormat(locale === "ar" ? "ar" : locale === "fr" ? "fr-FR" : "en-GB", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export function Articles({ articles }: { articles: PublicArticle[] }) {
  const { t, locale } = useI18n();
  const requestQuote = useQuoteStore((s) => s.requestQuote);
  if (articles.length === 0) return null;

  const [featured, ...rest] = articles;

  return (
    <section id="insights" className="scroll-mt-24 py-20 sm:py-28">
      <div className="container-px mx-auto max-w-7xl">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow={t("blog.eyebrow")}
            title={t("blog.title")}
            subtitle={t("blog.subtitle")}
            align="left"
          />
          <Reveal>
            <Button
              variant="outline"
              className="gap-1.5"
              onClick={() => requestQuote({})}
            >
              {t("blog.viewAll")}
              <ArrowRight className="size-4 rtl:rotate-180" />
            </Button>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {/* Featured article */}
          <Reveal className="lg:row-span-2">
            <motion.article
              whileHover={{ y: -4 }}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-xl"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
                {featured.coverImage ? (
                  <Image
                    src={featured.coverImage}
                    alt={featured.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 600px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : null}
                <div className="absolute start-4 top-4 ltr:left-4 rtl:right-4">
                  <Badge className="bg-navy-gradient text-primary-foreground">
                    {featured.category}
                  </Badge>
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-3 p-6">
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="size-3.5" />
                    {formatDate(featured.publishedAt, locale)}
                  </span>
                </div>
                <h3 className="font-display text-2xl font-semibold leading-tight text-foreground">
                  {featured.title}
                </h3>
                <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                  {featured.excerpt}
                </p>
                <Button variant="link" className="mt-auto w-fit gap-1 p-0">
                  {t("blog.readMore")}
                  <ArrowRight className="size-4 rtl:rotate-180" />
                </Button>
              </div>
            </motion.article>
          </Reveal>

          {/* Secondary articles */}
          <RevealGroup className="flex flex-col gap-6">
            {rest.slice(0, 4).map((a) => (
              <RevealItem key={a.id}>
                <motion.article
                  whileHover={{ x: 4 }}
                  className="group flex gap-4 rounded-2xl border border-border bg-card p-4 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="relative hidden size-24 shrink-0 overflow-hidden rounded-xl bg-muted sm:block">
                    {a.coverImage ? (
                      <Image
                        src={a.coverImage}
                        alt={a.title}
                        fill
                        sizes="96px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : null}
                  </div>
                  <div className="flex flex-1 flex-col gap-1.5">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Tag className="size-3" />
                      <span className="font-medium text-primary">{a.category}</span>
                      <span>·</span>
                      <span>{formatDate(a.publishedAt, locale)}</span>
                    </div>
                    <h4 className="font-display text-base font-semibold leading-snug text-foreground">
                      {a.title}
                    </h4>
                    <p className="line-clamp-2 text-sm text-muted-foreground">
                      {a.excerpt}
                    </p>
                  </div>
                </motion.article>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
