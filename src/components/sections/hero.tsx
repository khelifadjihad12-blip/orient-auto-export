"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Ship, ShieldCheck, Anchor, FileCheck2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/components/providers/i18n-provider";
import { useQuoteStore } from "@/lib/quote-store";
import { buildWhatsAppLink, quoteWhatsAppMessage } from "@/lib/whatsapp";
import type { PlatformStats } from "@/lib/types";

export function Hero({ stats }: { stats: PlatformStats }) {
  const { t } = useI18n();
  const requestQuote = useQuoteStore((s) => s.requestQuote);
  const reduce = useReducedMotion();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const stats_display = [
    { value: `${stats.vehicleCount}+`, label: t("hero.stat.vehicles") },
    { value: `${stats.brandCount}`, label: t("hero.stat.brands") },
    { value: `${stats.routeCount}`, label: t("hero.stat.routes") },
    { value: `${stats.yearsInTrade}+`, label: t("hero.stat.years") },
  ];

  return (
    <section id="top" className="relative isolate overflow-hidden bg-navy-gradient text-white">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/hero.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.18_0.05_258/0.95)] via-[oklch(0.22_0.06_258/0.8)] to-[oklch(0.26_0.06_258/0.5)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.16_0.05_258)] via-transparent to-transparent" />
      </div>
      <div className="absolute inset-0 -z-10 bg-grid-light opacity-40" />

      <div className="container-px mx-auto flex max-w-7xl flex-col gap-12 py-20 sm:py-28 lg:py-36">
        <div className="flex max-w-3xl flex-col gap-6">
          <motion.span
            initial={{ opacity: 0, y: reduce ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white/80 backdrop-blur-sm"
          >
            <Anchor className="size-3.5 text-[var(--gold)]" />
            {t("hero.eyebrow")}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: reduce ? 0 : 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="text-balance font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
          >
            {t("hero.title")}{" "}
            <span className="text-gradient-gold">{t("hero.titleHighlight")}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: reduce ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16 }}
            className="max-w-2xl text-balance text-base leading-relaxed text-white/75 sm:text-lg"
          >
            {t("hero.subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24 }}
            className="flex flex-wrap items-center gap-3"
          >
            <Button
              size="lg"
              className="gap-2 bg-white text-primary hover:bg-white/90"
              onClick={() => requestQuote({})}
            >
              {t("hero.cta.primary")}
              <ArrowRight className="size-4 rtl:rotate-180" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="gap-2 border-white/25 bg-white/5 text-white hover:bg-white/15 hover:text-white"
              onClick={() => scrollTo("vehicles")}
            >
              {t("hero.cta.secondary")}
            </Button>
            <a
              href={buildWhatsAppLink(quoteWhatsAppMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-[#25D366] px-6 text-sm font-semibold text-white shadow-lg shadow-[#25D366]/25 transition-colors hover:bg-[#1ebe5d]"
              aria-label={t("whatsapp.cta")}
            >
              <MessageCircle className="size-4" />
              {t("whatsapp.cta")}
            </a>
          </motion.div>

          {/* Trust chips */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.34 }}
            className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-sm text-white/70"
          >
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="size-4 text-[var(--gold)]" />
              Hong Kong Registered Entity
            </span>
            <span className="inline-flex items-center gap-2">
              <FileCheck2 className="size-4 text-[var(--gold)]" />
              KYC & AML Compliant
            </span>
            <span className="inline-flex items-center gap-2">
              <Ship className="size-4 text-[var(--gold)]" />
              FOB & CIF Incoterms
            </span>
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.42 }}
          className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/15 bg-white/5 backdrop-blur-md sm:grid-cols-4"
        >
          {stats_display.map((s) => (
            <div key={s.label} className="flex flex-col gap-1 p-5 sm:p-6">
              <span className="font-display text-3xl font-bold text-white sm:text-4xl">
                {s.value}
              </span>
              <span className="text-xs font-medium uppercase tracking-wider text-white/60 sm:text-sm">
                {s.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom wave */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[var(--gold)]/40 to-transparent" />
    </section>
  );
}
