"use client";

import { motion } from "framer-motion";
import {
  Target,
  Eye,
  ShieldCheck,
  BadgeCheck,
  Gauge,
  Headset,
} from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/site/reveal";
import { GoldDivider } from "@/components/site/primitives";
import { useI18n } from "@/components/providers/i18n-provider";

const VALUES = [
  { key: "value1", icon: BadgeCheck },
  { key: "value2", icon: ShieldCheck },
  { key: "value3", icon: Gauge },
  { key: "value4", icon: Headset },
] as const;

export function About() {
  const { t } = useI18n();
  return (
    <section id="about" className="scroll-mt-24 py-20 sm:py-28">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeading
          eyebrow={t("about.eyebrow")}
          title={t("about.title")}
          subtitle={t("about.subtitle")}
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {/* Mission */}
          <Reveal>
            <div className="flex h-full flex-col gap-4 rounded-2xl border border-border bg-card p-7 shadow-sm sm:p-8">
              <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Target className="size-6" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground">
                {t("about.mission.title")}
              </h3>
              <GoldDivider />
              <p className="text-base leading-relaxed text-muted-foreground">
                {t("about.mission.body")}
              </p>
            </div>
          </Reveal>

          {/* Vision */}
          <Reveal delay={0.08}>
            <div className="flex h-full flex-col gap-4 rounded-2xl border border-border bg-navy-gradient p-7 text-white shadow-sm sm:p-8">
              <div className="flex size-12 items-center justify-center rounded-xl bg-[var(--gold)] text-[oklch(0.2_0.02_80)]">
                <Eye className="size-6" />
              </div>
              <h3 className="font-display text-xl font-semibold text-white">
                {t("about.vision.title")}
              </h3>
              <GoldDivider />
              <p className="text-base leading-relaxed text-white/75">
                {t("about.vision.body")}
              </p>
            </div>
          </Reveal>
        </div>

        {/* Core values */}
        <RevealGroup className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v) => {
            const Icon = v.icon;
            return (
              <RevealItem key={v.key}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="flex h-full flex-col gap-3 rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </div>
                  <h4 className="font-display text-base font-semibold text-foreground">
                    {t(`about.${v.key}.title`)}
                  </h4>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {t(`about.${v.key}.body`)}
                  </p>
                </motion.div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
