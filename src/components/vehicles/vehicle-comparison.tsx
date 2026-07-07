"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetHeader,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/components/providers/i18n-provider";
import { useQuoteStore } from "@/lib/quote-store";
import { resolveVehicles } from "@/lib/vehicle-store";
import type { PublicVehicle } from "@/lib/types";
import { X, ArrowRight, MessageCircle, FileText } from "lucide-react";
import { vehicleWhatsAppMessage, buildWhatsAppLink } from "@/lib/whatsapp";

function formatPrice(usd: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(usd);
}

interface CompareRow {
  key: keyof PublicVehicle["specs"] | "priceUsd" | "energyType" | "bodyType";
  label: string;
}

const ROWS: CompareRow[] = [
  { key: "priceUsd", label: "price" },
  { key: "energyType", label: "fuel" },
  { key: "bodyType", label: "body" },
  { key: "specs.range", label: "range" as never },
  { key: "specs.horsepower", label: "power" as never },
  { key: "specs.acceleration", label: "0-100" as never },
  { key: "specs.topSpeed", label: "top" as never },
  { key: "specs.battery", label: "battery" as never },
  { key: "specs.engine", label: "engine" as never },
  { key: "specs.transmission", label: "trans" as never },
  { key: "specs.dimensions", label: "dim" as never },
  { key: "specs.seating", label: "seats" as never },
];

export function VehicleComparison({
  vehicles,
  compareSlugs,
  open,
  onOpenChange,
  onRemove,
}: {
  vehicles: PublicVehicle[];
  compareSlugs: string[];
  open: boolean;
  onOpenChange: (o: boolean) => void;
  onRemove: (slug: string) => void;
}) {
  const { t } = useI18n();
  const requestQuote = useQuoteStore((s) => s.requestQuote);
  const selected = resolveVehicles(compareSlugs, vehicles);

  function getValue(v: PublicVehicle, key: CompareRow["key"]): string {
    if (key === "priceUsd") return formatPrice(v.priceUsd);
    if (key === "energyType") return v.energyType;
    if (key === "bodyType") return v.bodyType ?? "—";
    // specs nested
    const specKey = key as keyof PublicVehicle["specs"];
    return (v.specs[specKey] as string) ?? "—";
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="end"
        className="w-full overflow-y-auto p-0 sm:max-w-4xl"
      >
        <SheetHeader className="border-b border-border bg-navy-gradient p-6 text-white">
          <SheetTitle className="font-display text-xl font-bold text-white">
            {t("explorer.compare.title")}
          </SheetTitle>
          <SheetDescription className="text-white/70">
            {selected.length} / 3 {t("explorer.results")}
          </SheetDescription>
        </SheetHeader>

        {selected.length === 0 ? (
          <div className="flex min-h-[40vh] flex-col items-center justify-center gap-3 p-8 text-center">
            <p className="text-muted-foreground">{t("explorer.compare.empty")}</p>
          </div>
        ) : (
          <div className="p-4 sm:p-6">
            {/* Header row: images + names */}
            <div
              className="grid gap-3"
              style={{
                gridTemplateColumns: `repeat(${selected.length}, minmax(0, 1fr))`,
              }}
            >
              {selected.map((v) => (
                <div key={v.id} className="flex flex-col gap-2">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border bg-muted">
                    {v.image ? (
                      <Image
                        src={v.image}
                        alt={v.name}
                        fill
                        sizes="220px"
                        className="object-cover"
                      />
                    ) : null}
                    <button
                      onClick={() => onRemove(v.slug)}
                      aria-label={`${t("explorer.compare.remove")} — ${v.name}`}
                      className="absolute end-2 top-2 flex size-7 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm hover:bg-black/70 ltr:right-2 rtl:left-2"
                    >
                      <X className="size-3.5" />
                    </button>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[0.7rem] font-semibold uppercase tracking-wide text-primary">
                      {v.brandName}
                    </span>
                    <h4 className="font-display text-sm font-semibold leading-tight text-foreground">
                      {v.name}
                    </h4>
                  </div>
                </div>
              ))}
            </div>

            {/* Spec rows */}
            <div className="mt-6 overflow-hidden rounded-xl border border-border">
              {ROWS.map((row, idx) => (
                <div
                  key={String(row.key)}
                  className={idx > 0 ? "border-t border-border" : ""}
                >
                  <div
                    className="grid gap-2"
                    style={{
                      gridTemplateColumns: `repeat(${selected.length}, minmax(0, 1fr))`,
                    }}
                  >
                    {selected.map((v, i) => {
                      const value = getValue(v, row.key);
                      // Highlight the best numeric value across the row
                      const isBest =
                        i === bestIndex(selected, row.key) && value !== "—";
                      return (
                        <div
                          key={v.id}
                          className={cnRow(i, row.key)}
                          title={rowLabel(t, row.key)}
                        >
                          {i === 0 ? (
                            <span className="mb-1 block text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground">
                              {rowLabel(t, row.key)}
                            </span>
                          ) : null}
                          <span
                            className={
                              isBest
                                ? "font-semibold text-primary"
                                : "text-sm text-foreground"
                            }
                          >
                            {value}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Action row */}
            <div className="mt-6 flex flex-wrap gap-2">
              {selected.map((v) => (
                <div key={v.id} className="flex w-full gap-2 sm:w-auto">
                  <Button
                    size="sm"
                    className="flex-1 gap-1.5 sm:flex-none"
                    onClick={() => {
                      onOpenChange(false);
                      requestQuote({ vehicleSlug: v.slug, brand: v.brandName });
                    }}
                  >
                    <FileText className="size-3.5" />
                    {t("vehicles.inquire")}
                  </Button>
                  <a
                    href={buildWhatsAppLink(
                      vehicleWhatsAppMessage({ brandName: v.brandName, vehicleName: v.name })
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 rounded-full bg-[#25D366] px-3 py-1.5 text-xs font-semibold text-white"
                  >
                    <MessageCircle className="size-3.5" />
                    {t("vehicle.whatsapp")}
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

function rowLabel(t: (k: string) => string, key: string): string {
  const map: Record<string, string> = {
    priceUsd: t("vehicles.from"),
    energyType: t("explorer.filter.energy"),
    bodyType: t("explorer.filter.bodyType"),
    "specs.range": t("vehicles.range"),
    "specs.horsepower": t("vehicles.power"),
    "specs.acceleration": t("vehicles.acceleration"),
    "specs.topSpeed": t("vehicles.topSpeed"),
    "specs.battery": t("vehicles.battery"),
    "specs.engine": t("vehicles.engine"),
    "specs.transmission": t("vehicles.transmission"),
    "specs.dimensions": t("vehicles.dimensions"),
    "specs.seating": t("vehicles.seating"),
  };
  return map[key] ?? key;
}

function cnRow(_i: number, _key: CompareRow["key"]): string {
  return "bg-muted/30 p-3 ltr:[&:not(:first-child)]:border-l rtl:[&:not(:first-child)]:border-r rtl:[&:not(:first-child)]:border-l-0 border-border";
}

/** Return the index of the "best" value for highlighting (lowest 0-100 / price, highest power/range). */
function bestIndex(
  vehicles: PublicVehicle[],
  key: CompareRow["key"]
): number {
  if (vehicles.length < 2) return 0;
  const nums = vehicles.map((v) => {
    const raw =
      key === "priceUsd"
        ? String(v.priceUsd)
        : key === "energyType" || key === "bodyType"
        ? ""
        : (v.specs[key as keyof PublicVehicle["specs"]] as string) ?? "";
    const m = raw.match(/(\d+(?:[.,]\d+)?)/);
    return m ? parseFloat(m[1].replace(",", "")) : NaN;
  });
  if (nums.every((n) => isNaN(n))) return -1;
  const lowerIsBetter =
    key === "priceUsd" || key === "specs.acceleration";
  let bestIdx = -1;
  let best = lowerIsBetter ? Infinity : -Infinity;
  nums.forEach((n, i) => {
    if (isNaN(n)) return;
    if (lowerIsBetter ? n < best : n > best) {
      best = n;
      bestIdx = i;
    }
  });
  return bestIdx;
}
