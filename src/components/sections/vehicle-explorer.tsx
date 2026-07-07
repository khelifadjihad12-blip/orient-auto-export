"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  X,
  GitCompare,
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";
import { VehicleCard } from "@/components/vehicles/vehicle-card";
import { VehicleDetailDialog } from "@/components/vehicles/vehicle-detail-dialog";
import { VehicleComparison } from "@/components/vehicles/vehicle-comparison";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useI18n } from "@/components/providers/i18n-provider";
import { useQuoteStore } from "@/lib/quote-store";
import {
  useVehicleStore,
  MAX_COMPARE,
  resolveVehicles,
} from "@/lib/vehicle-store";
import { useMounted } from "@/hooks/use-mounted";
import type { PublicVehicle, PublicBrand } from "@/lib/types";
import { cn } from "@/lib/utils";

type SortKey = "featured" | "priceAsc" | "priceDesc" | "range" | "power";

const ENERGY_FILTERS = [
  { key: "ALL", labelKey: "explorer.filter.any" },
  { key: "EV", labelKey: "" },
  { key: "HYBRID", labelKey: "" },
  { key: "PETROL", labelKey: "" },
] as const;

function extractNumber(s?: string): number {
  if (!s) return 0;
  const m = s.match(/(\d+(?:[.,]\d+)?)/);
  return m ? parseFloat(m[1].replace(",", "")) : 0;
}

export function VehicleExplorer({
  vehicles,
  brands,
}: {
  vehicles: PublicVehicle[];
  brands: PublicBrand[];
}) {
  const { t } = useI18n();
  const requestQuote = useQuoteStore((s) => s.requestQuote);
  const compare = useVehicleStore((s) => s.compare);
  const removeFromCompare = useVehicleStore((s) => s.removeFromCompare);
  const clearCompare = useVehicleStore((s) => s.clearCompare);

  const [query, setQuery] = useState("");
  const [energy, setEnergy] = useState<string>("ALL");
  const [brandSlug, setBrandSlug] = useState<string>("all");
  const [bodyType, setBodyType] = useState<string>("all");
  const [sort, setSort] = useState<SortKey>("featured");
  const [showFilters, setShowFilters] = useState(false);
  const [openVehicle, setOpenVehicle] = useState<PublicVehicle | null>(null);
  const [compareOpen, setCompareOpen] = useState(false);
  const mounted = useMounted();

  const bodyTypes = useMemo(
    () =>
      Array.from(
        new Set(vehicles.map((v) => v.bodyType).filter(Boolean) as string[])
      ).sort(),
    [vehicles]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = vehicles.filter((v) => {
      if (energy !== "ALL" && v.energyType !== energy) return false;
      if (brandSlug !== "all" && v.brandSlug !== brandSlug) return false;
      if (bodyType !== "all" && v.bodyType !== bodyType) return false;
      if (q) {
        const hay = `${v.name} ${v.brandName} ${v.excerpt} ${v.energyType}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    list = [...list].sort((a, b) => {
      switch (sort) {
        case "priceAsc":
          return a.priceUsd - b.priceUsd;
        case "priceDesc":
          return b.priceUsd - a.priceUsd;
        case "range":
          return extractNumber(b.specs.range) - extractNumber(a.specs.range);
        case "power":
          return extractNumber(b.specs.horsepower) - extractNumber(a.specs.horsepower);
        case "featured":
        default:
          return Number(b.featured) - Number(a.featured) || a.priceUsd - b.priceUsd;
      }
    });
    return list;
  }, [vehicles, query, energy, brandSlug, bodyType, sort]);

  const activeFilterCount =
    (energy !== "ALL" ? 1 : 0) +
    (brandSlug !== "all" ? 1 : 0) +
    (bodyType !== "all" ? 1 : 0) +
    (query.trim() ? 1 : 0);

  const clearAll = () => {
    setQuery("");
    setEnergy("ALL");
    setBrandSlug("all");
    setBodyType("all");
    setSort("featured");
  };

  const compareVehicles = mounted ? resolveVehicles(compare, vehicles) : [];

  return (
    <section id="vehicles" className="scroll-mt-24 bg-muted/30 py-20 sm:py-28">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeading
          eyebrow={t("explorer.eyebrow")}
          title={t("explorer.title")}
          subtitle={t("explorer.subtitle")}
        />

        {/* Search + sort + filter toggle */}
        <Reveal className="mt-10">
          <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-3 shadow-sm sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground ltr:left-3 rtl:right-3" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("explorer.searchPlaceholder")}
                aria-label={t("explorer.searchPlaceholder")}
                className="h-11 w-full rounded-lg border border-transparent bg-muted/50 ps-10 pe-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:bg-card ltr:pl-10 rtl:pr-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
                <SelectTrigger className="h-11 w-[170px] gap-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">{t("explorer.sort.featured")}</SelectItem>
                  <SelectItem value="priceAsc">{t("explorer.sort.priceAsc")}</SelectItem>
                  <SelectItem value="priceDesc">{t("explorer.sort.priceDesc")}</SelectItem>
                  <SelectItem value="range">{t("explorer.sort.range")}</SelectItem>
                  <SelectItem value="power">{t("explorer.sort.power")}</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant={showFilters ? "default" : "outline"}
                size="default"
                className="h-11 gap-2"
                onClick={() => setShowFilters((v) => !v)}
                aria-expanded={showFilters}
              >
                <SlidersHorizontal className="size-4" />
                <span className="hidden sm:inline">{t("explorer.filters")}</span>
                {activeFilterCount > 0 ? (
                  <Badge variant="secondary" className="ml-1 h-5 min-w-5 justify-center px-1 text-xs">
                    {activeFilterCount}
                  </Badge>
                ) : null}
              </Button>
            </div>
          </div>

          {/* Energy quick-tabs (always visible) */}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {ENERGY_FILTERS.map((f) => {
              const active = energy === f.key;
              const count =
                f.key === "ALL"
                  ? vehicles.length
                  : vehicles.filter((v) => v.energyType === f.key).length;
              return (
                <button
                  key={f.key}
                  onClick={() => setEnergy(f.key)}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all",
                    active
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
                  )}
                >
                  {f.key === "ALL" ? t("explorer.filter.any") : f.key}
                  <span className={cn("rounded-full px-1.5 text-[0.65rem]", active ? "bg-white/20" : "bg-muted")}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Expanded advanced filters */}
          <AnimatePresence>
            {showFilters ? (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="mt-3 grid gap-3 rounded-2xl border border-border bg-card p-4 sm:grid-cols-3">
                  <FilterField label={t("explorer.filter.brand")}>
                    <Select value={brandSlug} onValueChange={setBrandSlug}>
                      <SelectTrigger className="h-10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{t("explorer.filter.any")}</SelectItem>
                        {brands.map((b) => (
                          <SelectItem key={b.id} value={b.slug}>
                            {b.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FilterField>
                  <FilterField label={t("explorer.filter.bodyType")}>
                    <Select value={bodyType} onValueChange={setBodyType}>
                      <SelectTrigger className="h-10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{t("explorer.filter.any")}</SelectItem>
                        {bodyTypes.map((bt) => (
                          <SelectItem key={bt} value={bt}>
                            {bt}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FilterField>
                  <FilterField label={t("explorer.filter.energy")}>
                    <Select value={energy} onValueChange={setEnergy}>
                      <SelectTrigger className="h-10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ALL">{t("explorer.filter.any")}</SelectItem>
                        <SelectItem value="EV">EV</SelectItem>
                        <SelectItem value="HYBRID">Hybrid</SelectItem>
                        <SelectItem value="PETROL">Petrol</SelectItem>
                      </SelectContent>
                    </Select>
                  </FilterField>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>

          {/* Active filter chips + result count */}
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{filtered.length}</span>{" "}
                {t("explorer.results")}
              </span>
              {activeFilterCount > 0 ? (
                <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs" onClick={clearAll}>
                  <X className="size-3" />
                  {t("explorer.clear")}
                </Button>
              ) : null}
            </div>
          </div>
        </Reveal>

        {/* Grid */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((v, i) => (
              <motion.div
                key={v.id}
                layout
                initial={{ opacity: 0, y: 16, scale: 0.96 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { duration: 0.4, delay: Math.min(i * 0.05, 0.3), ease: [0.22, 1, 0.36, 1] },
                }}
                exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
              >
                <VehicleCard vehicle={v} onOpenDetails={setOpenVehicle} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 ? (
          <div className="mt-12 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border bg-card py-16 text-center">
            <p className="text-muted-foreground">{t("explorer.noResults")}</p>
            <Button variant="outline" size="sm" onClick={clearAll}>
              {t("explorer.clear")}
            </Button>
          </div>
        ) : null}
      </div>

      {/* Comparison tray (sticky bottom bar) */}
      <AnimatePresence>
        {mounted && compare.length > 0 ? (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className="fixed inset-x-0 bottom-0 z-40 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:pb-6"
          >
            <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-border bg-card/95 shadow-2xl backdrop-blur-md">
              <div className="flex items-center gap-3 p-3">
                <div className="hidden flex-col leading-tight sm:flex">
                  <span className="text-sm font-semibold text-foreground">
                    {t("explorer.compareBar.title")}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {compare.length}/{MAX_COMPARE} · {t("explorer.compareBar.subtitle")}
                  </span>
                </div>
                {/* Selected thumbnails */}
                <div className="flex flex-1 items-center gap-2 overflow-x-auto no-scrollbar">
                  {compareVehicles.map((v) => (
                    <div
                      key={v.id}
                      className="relative flex shrink-0 items-center gap-2 rounded-full border border-border bg-muted/50 py-1 pe-2 ps-1"
                    >
                      <div className="relative size-8 overflow-hidden rounded-full bg-muted">
                        {v.image ? (
                          <img src={v.image} alt="" className="size-full object-cover" />
                        ) : null}
                      </div>
                      <span className="max-w-[7rem] truncate text-xs font-medium text-foreground">
                        {v.name}
                      </span>
                      <button
                        onClick={() => removeFromCompare(v.slug)}
                        aria-label={`${t("explorer.compare.remove")} — ${v.name}`}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <X className="size-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="hidden sm:inline-flex" onClick={clearCompare}>
                    {t("explorer.compareBar.clear")}
                  </Button>
                  <Button
                    size="sm"
                    className="gap-1.5"
                    onClick={() => setCompareOpen(true)}
                    disabled={compare.length < 2}
                  >
                    <GitCompare className="size-4" />
                    {t("explorer.compareBar.compare")}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <VehicleDetailDialog
        vehicle={openVehicle}
        open={!!openVehicle}
        onOpenChange={(o) => !o && setOpenVehicle(null)}
      />

      <VehicleComparison
        vehicles={vehicles}
        compareSlugs={compare}
        open={compareOpen}
        onOpenChange={setCompareOpen}
        onRemove={removeFromCompare}
      />
    </section>
  );
}

function FilterField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </label>
      {children}
    </div>
  );
}
