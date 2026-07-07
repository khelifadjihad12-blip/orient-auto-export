"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Building2,
  ShieldCheck,
  SearchCheck,
  BadgeCheck,
  Globe2,
  Handshake,
  ReceiptText,
  Lock,
  FileCheck2,
  MapPin,
} from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/site/reveal";
import { GoldDivider, Stat } from "@/components/site/primitives";
import { useI18n } from "@/components/providers/i18n-provider";
import type { PlatformStats } from "@/lib/types";

const PILLARS = [
  { key: "registration", icon: Building2 },
  { key: "compliance", icon: ShieldCheck },
  { key: "inspection", icon: SearchCheck },
  { key: "quality", icon: BadgeCheck },
] as const;

const WHY = [
  { key: "why1", icon: Handshake },
  { key: "why2", icon: ReceiptText },
  { key: "why3", icon: Lock },
  { key: "why4", icon: FileCheck2 },
  { key: "why5", icon: MapPin },
] as const;

export function TrustCompliance({ stats }: { stats: PlatformStats }) {
  const { t } = useI18n();

  const businessStats = [
    { value: `${stats.yearsInTrade}+`, label: t("trust.stats.years") },
    { value: "2,400+", label: t("trust.stats.units") },
    { value: "6", label: t("trust.stats.markets") },
    { value: `${stats.brandCount}`, label: t("trust.stats.brands") },
  ];

  return (
    <section id="trust" className="scroll-mt-24 py-20 sm:py-28">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeading
          eyebrow={t("trust.eyebrow")}
          title={t("trust.title")}
          subtitle={t("trust.subtitle")}
        />

        {/* Business stats strip */}
        <Reveal className="mt-12">
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border shadow-sm sm:grid-cols-4">
            {businessStats.map((s) => (
              <div
                key={s.label}
                className="flex flex-col items-center gap-1 bg-navy-gradient p-6 text-center text-white"
              >
                <span className="font-display text-3xl font-bold text-white sm:text-4xl">
                  {s.value}
                </span>
                <span className="text-xs font-medium uppercase tracking-wider text-white/60 sm:text-sm">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Four compliance pillars */}
        <RevealGroup className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p) => {
            const Icon = p.icon;
            return (
              <RevealItem key={p.key}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="flex h-full flex-col gap-3 rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-6" />
                  </div>
                  <h3 className="font-display text-base font-semibold text-foreground">
                    {t(`trust.${p.key}.title`)}
                  </h3>
                  <GoldDivider />
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {t(`trust.${p.key}.body`)}
                  </p>
                </motion.div>
              </RevealItem>
            );
          })}
        </RevealGroup>

        {/* Why choose us */}
        <Reveal className="mt-16">
          <div className="text-center">
            <h3 className="font-display text-2xl font-semibold text-foreground sm:text-3xl">
              {t("trust.why.title")}
            </h3>
            <p className="mx-auto mt-3 max-w-2xl text-balance text-muted-foreground">
              {t("trust.why.subtitle")}
            </p>
          </div>
        </Reveal>

        <RevealGroup className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {WHY.map((w, i) => {
            const Icon = w.icon;
            return (
              <RevealItem key={w.key}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="flex h-full flex-col gap-3 rounded-2xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="flex items-center gap-2">
                    <span className="flex size-9 items-center justify-center rounded-lg bg-[var(--gold)]/15 text-[oklch(0.45_0.1_70)]">
                      <Icon className="size-4" />
                    </span>
                    <span className="font-display text-sm font-bold text-[var(--gold)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h4 className="font-display text-sm font-semibold text-foreground">
                    {t(`trust.${w.key}.title`)}
                  </h4>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {t(`trust.${w.key}.body`)}
                  </p>
                </motion.div>
              </RevealItem>
            );
          })}
        </RevealGroup>

        {/* Global expertise banner */}
        <Reveal className="mt-12">
          <div className="relative isolate overflow-hidden rounded-3xl border border-border bg-navy-gradient p-8 text-white shadow-xl sm:p-12">
            <div className="absolute inset-0 -z-10 bg-grid-light opacity-30" />
            <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
              <div className="flex flex-col gap-4">
                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--gold)]">
                  <Globe2 className="size-3.5" />
                  {t("trust.global.title")}
                </span>
                <p className="max-w-xl text-balance text-lg leading-relaxed text-white/85">
                  {t("trust.global.subtitle")}
                </p>
                <div className="flex flex-wrap gap-x-8 gap-y-3 pt-2">
                  <Stat value="4" label="Chinese Ports" light />
                  <Stat value="3" label="North African Ports" light />
                  <Stat value="26–33" label="Transit Days" light />
                  <Stat value="Weekly" label="Sailings" light />
                </div>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-white/15">
                <Image
                  src="/images/shipping-port.png"
                  alt="Chinese container shipping port at blue hour"
                  fill
                  sizes="(max-width: 1024px) 100vw, 480px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
