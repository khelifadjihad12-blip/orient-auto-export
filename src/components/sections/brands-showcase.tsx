"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Building2, CalendarDays, Car, History, Download } from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/site/reveal";
import { GoldDivider } from "@/components/site/primitives";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useI18n } from "@/components/providers/i18n-provider";
import { useQuoteStore } from "@/lib/quote-store";
import type { PublicBrand, PublicVehicle } from "@/lib/types";

export function BrandsShowcase({
  brands,
  vehicles,
}: {
  brands: PublicBrand[];
  vehicles: PublicVehicle[];
}) {
  const { t } = useI18n();
  const [openBrand, setOpenBrand] = useState<PublicBrand | null>(null);
  const requestQuote = useQuoteStore((s) => s.requestQuote);

  const brandVehicles = openBrand
    ? vehicles.filter((v) => v.brandSlug === openBrand.slug)
    : [];

  return (
    <section id="brands" className="scroll-mt-24 py-20 sm:py-28">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeading
          eyebrow={t("brands.eyebrow")}
          title={t("brands.title")}
          subtitle={t("brands.subtitle")}
        />

        <RevealGroup className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {brands.map((brand) => (
            <RevealItem key={brand.id}>
              <motion.button
                type="button"
                whileHover={{ y: -4 }}
                onClick={() => setOpenBrand(brand)}
                className="group flex h-full w-full flex-col items-start gap-3 rounded-2xl border border-border bg-card p-5 text-left shadow-sm transition-shadow hover:shadow-lg"
              >
                <div className="flex size-12 items-center justify-center rounded-xl bg-navy-gradient font-display text-lg font-bold text-primary-foreground ring-1 ring-white/10">
                  {brand.name.charAt(0)}
                </div>
                <div className="flex flex-col">
                  <span className="font-display text-lg font-semibold text-foreground">
                    {brand.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {brand.country} · {t("brands.founded")} {brand.founded}
                  </span>
                </div>
                <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                  {brand.description}
                </p>
                <div className="mt-auto flex items-center gap-2 pt-2">
                  <Badge variant="secondary" className="gap-1">
                    <Car className="size-3" />
                    {brand.modelCount} {t("brands.lineup")}
                  </Badge>
                </div>
              </motion.button>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>

      {/* Brand detail dialog */}
      <Dialog open={!!openBrand} onOpenChange={(o) => !o && setOpenBrand(null)}>
        <DialogContent className="max-h-[92vh] overflow-hidden p-0 sm:max-w-2xl">
          {openBrand ? (
            <div className="flex max-h-[92vh] flex-col">
              <div className="relative shrink-0 bg-navy-gradient p-6 text-white">
                <DialogHeader className="sr-only">
                  <DialogTitle>{openBrand.name}</DialogTitle>
                  <DialogDescription>{openBrand.description}</DialogDescription>
                </DialogHeader>
                <div className="flex items-center gap-4">
                  <div className="flex size-14 items-center justify-center rounded-xl bg-white/10 font-display text-2xl font-bold ring-1 ring-white/20 backdrop-blur-sm">
                    {openBrand.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="font-display text-2xl font-bold">{openBrand.name}</h2>
                    <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-white/70">
                      <span className="inline-flex items-center gap-1.5">
                        <Building2 className="size-3.5" /> {openBrand.country}
                      </span>
                      {openBrand.founded ? (
                        <span className="inline-flex items-center gap-1.5">
                          <CalendarDays className="size-3.5" /> {t("brands.founded")} {openBrand.founded}
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>

              <div className="scrollbar-premium flex-1 overflow-y-auto p-6">
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {openBrand.description}
                </p>

                {openBrand.history ? (
                  <>
                    <div className="mt-5 flex items-center gap-2">
                      <History className="size-4 text-primary" />
                      <h3 className="font-display text-base font-semibold text-foreground">
                        {t("brands.history")}
                      </h3>
                    </div>
                    <GoldDivider className="my-2" />
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {openBrand.history}
                    </p>
                  </>
                ) : null}

                <h3 className="mt-6 font-display text-base font-semibold text-foreground">
                  {t("brands.lineup")}
                </h3>
                <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {brandVehicles.length > 0 ? (
                    brandVehicles.map((v) => (
                      <button
                        key={v.id}
                        onClick={() => {
                          setOpenBrand(null);
                          requestQuote({ vehicleSlug: v.slug, brand: v.brandName });
                        }}
                        className="flex items-center justify-between gap-2 rounded-lg border border-border bg-muted/40 px-3 py-2.5 text-left text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-accent"
                      >
                        <span>{v.name}</span>
                        <Badge variant="outline">{v.energyType}</Badge>
                      </button>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      {t("vehicles.empty")}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex shrink-0 items-center justify-between gap-3 border-t border-border bg-card px-6 py-4">
                <Button variant="ghost" size="sm" className="gap-1.5">
                  <Download className="size-4" />
                  {t("brands.catalog")}
                </Button>
                <Button
                  onClick={() => {
                    setOpenBrand(null);
                    requestQuote({ brand: openBrand.name });
                  }}
                >
                  {t("nav.quote")}
                </Button>
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </section>
  );
}
