"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";
import { useI18n } from "@/components/providers/i18n-provider";
import type { PublicFaq } from "@/lib/types";
import { cn } from "@/lib/utils";

export function Faq({ faqs }: { faqs: PublicFaq[] }) {
  const { t } = useI18n();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("all");

  const categories = useMemo(() => {
    const set = new Set(faqs.map((f) => f.category));
    return ["all", ...Array.from(set)];
  }, [faqs]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return faqs.filter((f) => {
      const inCat = category === "all" || f.category === category;
      const inQuery =
        q === "" ||
        f.question.toLowerCase().includes(q) ||
        f.answer.toLowerCase().includes(q);
      return inCat && inQuery;
    });
  }, [faqs, query, category]);

  return (
    <section className="scroll-mt-24 bg-muted/30 py-20 sm:py-28">
      <div className="container-px mx-auto max-w-3xl">
        <SectionHeading
          eyebrow={t("faq.eyebrow")}
          title={t("faq.title")}
          subtitle={t("faq.subtitle")}
        />

        {/* Search + category chips */}
        <Reveal className="mt-10 flex flex-col gap-4">
          <div className="relative">
            <Search className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground ltr:left-3 rtl:right-3" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("faq.searchPlaceholder")}
              className="h-12 ps-10 text-base ltr:ps-10 rtl:pe-10"
              aria-label={t("faq.searchPlaceholder")}
            />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={cn(
                  "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
                  category === c
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
                )}
              >
                {c === "all" ? t("faq.categories.all") : t(`faq.categories.${c}`)}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Accordion */}
        <Reveal className="mt-8">
          {filtered.length > 0 ? (
            <Accordion type="single" collapsible className="flex flex-col gap-3">
              {filtered.map((f) => (
                <AccordionItem
                  key={f.id}
                  value={f.id}
                  className="overflow-hidden rounded-xl border border-border bg-card px-5 shadow-sm data-[state=open]:border-primary/40"
                >
                  <AccordionTrigger className="gap-3 text-left text-base font-semibold hover:no-underline">
                    {f.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                    {f.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <p className="rounded-xl border border-dashed border-border bg-card py-12 text-center text-sm text-muted-foreground">
              {t("faq.empty")}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
