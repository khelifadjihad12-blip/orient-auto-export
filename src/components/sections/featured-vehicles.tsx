"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";
import { VehicleCard } from "@/components/vehicles/vehicle-card";
import { VehicleDetailDialog } from "@/components/vehicles/vehicle-detail-dialog";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/components/providers/i18n-provider";
import { useQuoteStore } from "@/lib/quote-store";
import type { PublicVehicle } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Zap, Battery, Fuel, LayoutGrid } from "lucide-react";

const FILTERS = [
  { key: "ALL", icon: LayoutGrid },
  { key: "EV", icon: Zap },
  { key: "HYBRID", icon: Battery },
  { key: "PETROL", icon: Fuel },
] as const;

export function FeaturedVehicles({ vehicles }: { vehicles: PublicVehicle[] }) {
  const { t } = useI18n();
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["key"]>("ALL");
  const [openVehicle, setOpenVehicle] = useState<PublicVehicle | null>(null);
  const requestQuote = useQuoteStore((s) => s.requestQuote);

  const filtered = useMemo(() => {
    if (filter === "ALL") return vehicles;
    return vehicles.filter((v) => v.energyType === filter);
  }, [filter, vehicles]);

  return (
    <section id="vehicles" className="scroll-mt-24 bg-muted/30 py-20 sm:py-28">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeading
          eyebrow={t("vehicles.eyebrow")}
          title={t("vehicles.title")}
          subtitle={t("vehicles.subtitle")}
        />

        {/* Filter tabs */}
        <Reveal className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {FILTERS.map((f) => {
            const Icon = f.icon;
            const active = filter === f.key;
            return (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all",
                  active
                    ? "border-primary bg-primary text-primary-foreground shadow-sm"
                    : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
                )}
              >
                <Icon className="size-4" />
                {f.key === "ALL" ? t("faq.categories.all") : f.key}
                <span
                  className={cn(
                    "rounded-full px-1.5 text-xs",
                    active ? "bg-white/20" : "bg-muted"
                  )}
                >
                  {f.key === "ALL"
                    ? vehicles.length
                    : vehicles.filter((v) => v.energyType === f.key).length}
                </span>
              </button>
            );
          })}
        </Reveal>

        {/* Grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((v) => (
              <motion.div
                key={v.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
              >
                <VehicleCard vehicle={v} onOpenDetails={setOpenVehicle} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 ? (
          <p className="mt-12 text-center text-muted-foreground">
            {t("vehicles.empty")}
          </p>
        ) : null}

        <Reveal className="mt-12 flex justify-center">
          <Button
            variant="outline"
            size="lg"
            className="gap-2"
            onClick={() => requestQuote({})}
          >
            {t("vehicles.viewAll")}
          </Button>
        </Reveal>
      </div>

      <VehicleDetailDialog
        vehicle={openVehicle}
        open={!!openVehicle}
        onOpenChange={(o) => !o && setOpenVehicle(null)}
      />
    </section>
  );
}
