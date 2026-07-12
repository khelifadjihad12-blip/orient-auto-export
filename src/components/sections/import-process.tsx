"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Car,
  FileText,
  ReceiptText,
  Lock,
  SearchCheck,
  FileCheck2,
  Ship,
  Building2,
  PackageCheck,
} from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";
import { useI18n } from "@/components/providers/i18n-provider";
import { useQuoteStore } from "@/lib/quote-store";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const STEPS = [
  { key: "step1", icon: Car },
  { key: "step2", icon: FileText },
  { key: "step3", icon: ReceiptText },
  { key: "step4", icon: Lock },
  { key: "step5", icon: SearchCheck },
  { key: "step6", icon: FileCheck2 },
  { key: "step7", icon: Ship },
  { key: "step8", icon: Building2 },
  { key: "step9", icon: PackageCheck },
] as const;

export function ImportProcess() {
  const { t } = useI18n();
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
          eyebrow={t("process.eyebrow")}
          title={t("process.title")}
          subtitle={t("process.subtitle")}
          light
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          {/* Timeline rail */}
          <Reveal>
            <ol className="relative flex flex-col gap-2">
              {/* vertical line */}
              <span className="absolute bottom-4 start-[1.35rem] top-4 w-px bg-white/15 ltr:left-[1.35rem] rtl:right-[1.35rem]" />
              {STEPS.map((step, i) => {
                const Icon = step.icon;
                const isActive = i === active;
                return (
                  <li key={step.key}>
                    <button
                      onClick={() => setActive(i)}
                      className="group flex w-full items-center gap-4 rounded-xl p-2 text-left transition-colors hover:bg-white/5"
                    >
                      <span
                        className={cn(
                          "relative z-10 flex size-11 shrink-0 items-center justify-center rounded-full border transition-all",
                          isActive
                            ? "border-[var(--gold)] bg-[var(--gold)] text-[oklch(0.2_0.02_80)] shadow-lg shadow-[var(--gold)]/20"
                            : "border-white/25 bg-white/5 text-white/70 group-hover:border-white/50"
                        )}
                      >
                        <Icon className="size-5" />
                      </span>
                      <span className="flex flex-1 flex-col">
                        <span className="flex items-center gap-2">
                          <span className="text-[0.7rem] font-semibold uppercase tracking-wider text-white/50">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span
                            className={cn(
                              "font-display text-base font-semibold transition-colors sm:text-lg",
                              isActive ? "text-white" : "text-white/80"
                            )}
                          >
                            {t(`process.${step.key}.title`)}
                          </span>
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </Reveal>

          {/* Active step detail card */}
          <Reveal delay={0.1}>
            <div className="sticky top-24 flex flex-col gap-5 rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-md sm:p-8">
              <div className="flex items-center gap-3">
                <span className="flex size-12 items-center justify-center rounded-xl bg-[var(--gold)] text-[oklch(0.2_0.02_80)]">
                  <ActiveIcon className="size-6" />
                </span>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[var(--gold)]">
                    {t("quote.step")} {active + 1} {t("quote.of")} {STEPS.length}
                  </span>
                  <h3 className="font-display text-xl font-bold text-white sm:text-2xl">
                    {t(`process.${STEPS[active].key}.title`)}
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
                  {t(`process.${STEPS[active].key}.desc`)}
                </motion.p>
              </AnimatePresence>

              {/* Progress dots */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                {STEPS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    aria-label={`Step ${i + 1}`}
                    className={cn(
                      "h-1.5 rounded-full transition-all",
                      i === active
                        ? "w-8 bg-[var(--gold)]"
                        : "w-4 bg-white/20 hover:bg-white/40"
                    )}
                  />
                ))}
              </div>

              <div className="mt-2 flex flex-wrap gap-3">
                <Button
                  variant="outline"
                  className="border-white/25 bg-white/5 text-white hover:bg-white/15 hover:text-white"
                  onClick={() => setActive((a) => Math.max(0, a - 1))}
                  disabled={active === 0}
                >
                  {t("quote.back")}
                </Button>
                {active < STEPS.length - 1 ? (
                  <Button
                    className="bg-[var(--gold)] text-[oklch(0.2_0.02_80)] hover:bg-[var(--gold)]/90"
                    onClick={() => setActive((a) => Math.min(STEPS.length - 1, a + 1))}
                  >
                    {t("quote.next")}
                  </Button>
                ) : (
                  <Button
                    className="bg-white text-primary hover:bg-white/90"
                    onClick={() => requestQuote({})}
                  >
                    {t("cta.button")}
                  </Button>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
