"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageSquare } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/components/providers/i18n-provider";
import { useQuoteStore } from "@/lib/quote-store";

export function Cta() {
  const { t } = useI18n();
  const requestQuote = useQuoteStore((s) => s.requestQuote);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="py-20 sm:py-24">
      <div className="container-px mx-auto max-w-7xl">
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-3xl bg-navy-gradient px-6 py-14 text-center text-white shadow-xl sm:px-12 sm:py-20">
            <div className="absolute inset-0 -z-10 bg-grid-light opacity-30" />
            <motion.div
              aria-hidden
              animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.6, 0.4] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -end-16 -top-16 size-64 rounded-full bg-[var(--gold)]/20 blur-3xl ltr:-right-16 rtl:-left-16"
            />
            <h2 className="mx-auto max-w-2xl text-balance font-display text-3xl font-bold leading-tight sm:text-4xl">
              {t("cta.title")}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-balance text-white/75 sm:text-lg">
              {t("cta.subtitle")}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button
                size="lg"
                className="gap-2 bg-white text-primary hover:bg-white/90"
                onClick={() => requestQuote({})}
              >
                {t("cta.button")}
                <ArrowRight className="size-4 rtl:rotate-180" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-2 border-white/25 bg-white/5 text-white hover:bg-white/15 hover:text-white"
                onClick={() => scrollTo("contact")}
              >
                <MessageSquare className="size-4" />
                {t("cta.contact")}
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
