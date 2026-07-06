"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Ship, Clock, CalendarClock, Anchor, ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/site/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/components/providers/i18n-provider";
import { useQuoteStore } from "@/lib/quote-store";
import type { PublicShippingRoute } from "@/lib/types";

export function Shipping({ routes }: { routes: PublicShippingRoute[] }) {
  const { t } = useI18n();
  const requestQuote = useQuoteStore((s) => s.requestQuote);

  return (
    <section id="shipping" className="scroll-mt-24 py-20 sm:py-28">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeading
          eyebrow={t("shipping.eyebrow")}
          title={t("shipping.title")}
          subtitle={t("shipping.subtitle")}
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-start">
          {/* Visual + context */}
          <Reveal className="lg:sticky lg:top-24">
            <div className="relative overflow-hidden rounded-2xl border border-border shadow-sm">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/images/shipping-port.png"
                  alt="Modern Chinese container shipping port at blue hour"
                  fill
                  sizes="(max-width: 1024px) 100vw, 500px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.16_0.05_258/0.9)] via-transparent to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <div className="flex items-center gap-2 text-sm font-medium text-white/80">
                  <Anchor className="size-4 text-[var(--gold)]" />
                  China → North Africa Corridor
                </div>
                <p className="mt-1 font-display text-lg font-semibold">
                  Shanghai · Shenzhen · Nansha · Ningbo
                </p>
                <p className="text-sm text-white/70">
                  → Djendjen · Algiers · Tangier Med
                </p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-border bg-card p-4">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-primary">
                  <Ship className="size-4" /> FOB
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  Free On Board — you manage freight, we load at the Chinese port.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-4">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-primary">
                  <Ship className="size-4" /> CIF
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  Cost, Insurance & Freight — a delivered-to-port price with insurance.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Routes list */}
          <RevealGroup className="flex flex-col gap-3">
            <div className="hidden grid-cols-[1fr_auto_1fr_auto] items-center gap-4 px-5 py-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground sm:grid">
              <span>{t("shipping.origin")}</span>
              <span />
              <span>{t("shipping.destination")}</span>
              <span className="text-right">{t("shipping.transit")}</span>
            </div>
            {routes.map((r) => (
              <RevealItem key={r.id}>
                <motion.div
                  whileHover={{ y: -2 }}
                  className="rounded-2xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
                    {/* Origin */}
                    <div className="flex flex-col">
                      <span className="text-[0.7rem] uppercase tracking-wide text-muted-foreground">
                        {t("shipping.origin")}
                      </span>
                      <span className="font-display text-base font-semibold text-foreground">
                        {r.originPort}
                      </span>
                      <span className="text-xs text-muted-foreground">{r.originCountry}</span>
                    </div>

                    {/* Connector */}
                    <div className="flex items-center justify-center gap-2 text-primary">
                      <span className="hidden h-px w-6 bg-border sm:block" />
                      <motion.span
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="flex size-9 items-center justify-center rounded-full bg-primary/10"
                      >
                        <Ship className="size-4" />
                      </motion.span>
                      <ArrowRight className="size-4 text-muted-foreground rtl:rotate-180" />
                    </div>

                    {/* Destination */}
                    <div className="flex flex-col">
                      <span className="text-[0.7rem] uppercase tracking-wide text-muted-foreground">
                        {t("shipping.destination")}
                      </span>
                      <span className="font-display text-base font-semibold text-foreground">
                        {r.destinationPort}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {r.destinationCountry}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border pt-4">
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
                      <Clock className="size-4 text-[var(--gold)]" />
                      {r.transitDays} {t("shipping.days")}
                    </span>
                    {r.frequency ? (
                      <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                        <CalendarClock className="size-4" />
                        {r.frequency}
                      </span>
                    ) : null}
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-muted-foreground">{t("shipping.incoterms")}:</span>
                      {r.incoterms.map((term) => (
                        <Badge key={term} variant="secondary" className="font-semibold">
                          {term}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {r.notes ? (
                    <p className="mt-3 text-sm text-muted-foreground">{r.notes}</p>
                  ) : null}
                </motion.div>
              </RevealItem>
            ))}

            <RevealItem className="mt-2">
              <Button
                variant="outline"
                className="w-full gap-2"
                onClick={() => requestQuote({})}
              >
                {t("shipping.cta")}
                <ArrowRight className="size-4 rtl:rotate-180" />
              </Button>
            </RevealItem>
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
