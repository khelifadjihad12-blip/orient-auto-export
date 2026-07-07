"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  ShieldCheck,
  Ship,
  FileCheck2,
  ArrowRight,
  Check,
  MapPin,
} from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/components/providers/i18n-provider";
import { useQuoteStore } from "@/lib/quote-store";
import { cn } from "@/lib/utils";

const STEPS = [
  { key: "step1", icon: FileText },
  { key: "step2", icon: ShieldCheck },
  { key: "step3", icon: Ship },
  { key: "step4", icon: FileCheck2 },
] as const;

export function ImportJourney() {
  const { t, dir } = useI18n();
  const [active, setActive] = useState(0);
  const requestQuote = useQuoteStore((s) => s.requestQuote);
  const ActiveIcon = STEPS[active].icon;

  return (
    <section
      id="process"
      className="scroll-mt-24 bg-navy-gradient py-20 text-white sm:py-28"
    >
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeading
          eyebrow={t("journey.eyebrow")}
          title={t("journey.title")}
          subtitle={t("journey.subtitle")}
          light
        />

        {/* ── Horizontal stepper (desktop) / vertical (mobile) ── */}
        <Reveal className="mt-14">
          <div className="relative">
            {/* Connecting line — horizontal on sm+, vertical on mobile */}
            <span
              className="absolute top-7 hidden h-0.5 bg-white/15 sm:block ltr:left-0 rtl:right-0"
              style={{ width: "calc(100% - 0px)" }}
            />
            <span className="absolute start-[1.75rem] top-7 h-[calc(100%-3.5rem)] w-0.5 bg-white/15 sm:hidden ltr:left-[1.75rem] rtl:right-[1.75rem]" />

            <ol className="relative grid gap-6 sm:grid-cols-4 sm:gap-4">
              {STEPS.map((step, i) => {
                const Icon = step.icon;
                const isActive = i === active;
                const isDone = i < active;
                return (
                  <li key={step.key} className="relative">
                    <button
                      onClick={() => setActive(i)}
                      className="group flex w-full items-center gap-4 text-left sm:flex-col sm:items-start sm:gap-3 sm:text-center"
                    >
                      <span
                        className={cn(
                          "relative z-10 flex size-14 shrink-0 items-center justify-center rounded-full border-2 transition-all sm:mx-auto",
                          isActive
                            ? "border-[var(--gold)] bg-[var(--gold)] text-[oklch(0.2_0.02_80)] shadow-lg shadow-[var(--gold)]/30"
                            : isDone
                            ? "border-white/40 bg-white/10 text-white"
                            : "border-white/25 bg-white/5 text-white/60 group-hover:border-white/50"
                        )}
                      >
                        {isDone ? (
                          <Check className="size-6" />
                        ) : (
                          <Icon className="size-6" />
                        )}
                        {/* Step number badge */}
                        <span
                          className={cn(
                            "absolute -end-1 -top-1 flex size-5 items-center justify-center rounded-full text-[0.6rem] font-bold ring-2 ring-[oklch(0.22_0.06_258)] ltr:-right-1 rtl:-left-1",
                            isActive
                              ? "bg-[oklch(0.2_0.02_80)] text-[var(--gold)]"
                              : "bg-white/15 text-white"
                          )}
                        >
                          {i + 1}
                        </span>
                      </span>
                      <span className="flex flex-1 flex-col gap-1 sm:items-center">
                        <span className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[var(--gold)]">
                          {t(`journey.${step.key}.tag`)}
                        </span>
                        <span
                          className={cn(
                            "font-display text-sm font-semibold leading-tight transition-colors sm:text-base",
                            isActive ? "text-white" : "text-white/75"
                          )}
                        >
                          {t(`journey.${step.key}.title`)}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        </Reveal>

        {/* ── Active step detail card ── */}
        <Reveal delay={0.1} className="mt-10">
          <div className="grid gap-6 rounded-3xl border border-white/15 bg-white/5 p-6 backdrop-blur-md sm:p-8 lg:grid-cols-[1.3fr_1fr] lg:gap-10">
            {/* Left: description */}
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <span className="flex size-12 items-center justify-center rounded-xl bg-[var(--gold)] text-[oklch(0.2_0.02_80)]">
                  <ActiveIcon className="size-6" />
                </span>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[var(--gold)]">
                    {t("journey.step")} {active + 1} {t("quote.of")} {STEPS.length}
                  </span>
                  <h3 className="font-display text-xl font-bold text-white sm:text-2xl">
                    {t(`journey.${STEPS[active].key}.title`)}
                  </h3>
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.p
                  key={active}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                  className="text-base leading-relaxed text-white/75"
                >
                  {t(`journey.${STEPS[active].key}.desc`)}
                </motion.p>
              </AnimatePresence>

              <ul className="flex flex-col gap-2">
                {[1, 2].map((n) => (
                  <motion.li
                    key={n}
                    initial={{ opacity: 0, x: dir === "rtl" ? 12 : -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 + n * 0.05 }}
                    className="flex items-center gap-2.5 text-sm text-white/80"
                  >
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[var(--gold)]/20 text-[var(--gold)]">
                      <Check className="size-3" />
                    </span>
                    {t(`journey.${STEPS[active].key}.points.${n}`)}
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Right: stage visual + nav */}
            <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-[oklch(0.18_0.05_258)] p-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-white/50">
                  {t("journey.step")} {active + 1} / {STEPS.length}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--gold)]/15 px-2.5 py-1 text-xs font-semibold text-[var(--gold)]">
                  <MapPin className="size-3" />
                  {t(`journey.${STEPS[active].key}.tag`)}
                </span>
              </div>

              {/* Progress bar */}
              <div className="flex items-center gap-1.5">
                {STEPS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    aria-label={`${t("journey.step")} ${i + 1}`}
                    className={cn(
                      "h-1.5 rounded-full transition-all",
                      i === active
                        ? "flex-[2] bg-[var(--gold)]"
                        : i < active
                        ? "flex-1 bg-white/50"
                        : "flex-1 bg-white/15 hover:bg-white/30"
                    )}
                  />
                ))}
              </div>

              <div className="mt-auto flex flex-wrap gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white/25 bg-white/5 text-white hover:bg-white/15 hover:text-white"
                  onClick={() => setActive((a) => Math.max(0, a - 1))}
                  disabled={active === 0}
                >
                  {t("quote.back")}
                </Button>
                {active < STEPS.length - 1 ? (
                  <Button
                    size="sm"
                    className="bg-[var(--gold)] text-[oklch(0.2_0.02_80)] hover:bg-[var(--gold)]/90"
                    onClick={() => setActive((a) => Math.min(STEPS.length - 1, a + 1))}
                  >
                    {t("quote.next")}
                    <ArrowRight className="size-3.5 rtl:rotate-180" />
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    className="bg-white text-primary hover:bg-white/90"
                    onClick={() => requestQuote({})}
                  >
                    {t("journey.cta")}
                    <ArrowRight className="size-3.5 rtl:rotate-180" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
