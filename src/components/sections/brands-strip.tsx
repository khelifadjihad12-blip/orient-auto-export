"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/site/section-heading";
import { RevealGroup, RevealItem } from "@/components/site/reveal";
import { useI18n } from "@/components/providers/i18n-provider";
import type { PublicBrand } from "@/lib/types";

/** A compact strip of brand wordmarks — premium "trusted by" feel. */
export function BrandsStrip({ brands }: { brands: PublicBrand[] }) {
  const { t } = useI18n();
  return (
    <section className="border-y border-border bg-muted/30 py-12">
      <div className="container-px mx-auto max-w-7xl">
        <RevealGroup className="flex flex-col items-center gap-8">
          <RevealItem>
            <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              {t("trust.title")}
            </p>
          </RevealItem>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:gap-x-12">
            {brands.map((b) => (
              <RevealItem key={b.id}>
                <motion.span
                  whileHover={{ scale: 1.04 }}
                  className="font-display text-xl font-bold tracking-tight text-muted-foreground transition-colors hover:text-foreground sm:text-2xl"
                >
                  {b.name}
                </motion.span>
              </RevealItem>
            ))}
          </div>
          <RevealItem>
            <p className="max-w-2xl text-center text-sm text-muted-foreground">
              {t("trust.subtitle")}
            </p>
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
}
