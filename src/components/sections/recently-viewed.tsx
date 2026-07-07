"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { useI18n } from "@/components/providers/i18n-provider";
import { useVehicleStore, resolveVehicles } from "@/lib/vehicle-store";
import { useQuoteStore } from "@/lib/quote-store";
import { useMounted } from "@/hooks/use-mounted";
import type { PublicVehicle } from "@/lib/types";
import { formatPrice } from "@/lib/format";

export function RecentlyViewed({
  vehicles,
}: {
  vehicles: PublicVehicle[];
}) {
  const { t } = useI18n();
  const recent = useVehicleStore((s) => s.recent);
  const requestQuote = useQuoteStore((s) => s.requestQuote);
  const mounted = useMounted();

  const list = mounted ? resolveVehicles(recent, vehicles) : [];
  if (list.length === 0) return null;

  return (
    <section className="py-12">
      <div className="container-px mx-auto max-w-7xl">
        <Reveal className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Clock className="size-5" />
            </span>
            <div>
              <h2 className="font-display text-xl font-semibold text-foreground sm:text-2xl">
                {t("recent.title")}
              </h2>
              <p className="text-sm text-muted-foreground">{t("recent.subtitle")}</p>
            </div>
          </div>
        </Reveal>

        <div className="mt-6 flex gap-4 overflow-x-auto pb-2 no-scrollbar">
          <AnimatePresence>
            {list.map((v) => (
              <motion.button
                key={v.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={() =>
                  requestQuote({ vehicleSlug: v.slug, brand: v.brandName })
                }
                className="group flex w-56 shrink-0 flex-col gap-2 rounded-2xl border border-border bg-card p-3 text-left shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-muted">
                  {v.image ? (
                    <Image
                      src={v.image}
                      alt={v.name}
                      fill
                      sizes="220px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : null}
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[0.7rem] font-semibold uppercase tracking-wide text-primary">
                    {v.brandName}
                  </span>
                  <span className="line-clamp-1 font-display text-sm font-semibold text-foreground">
                    {v.name}
                  </span>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-sm font-bold text-foreground">
                      {formatPrice(v.priceUsd)}
                    </span>
                    <ArrowRight className="size-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5 rtl:rotate-180" />
                  </div>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
