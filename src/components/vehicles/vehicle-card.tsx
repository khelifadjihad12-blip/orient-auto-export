"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Gauge,
  BatteryCharging,
  Fuel,
  GitCompare,
  Check,
  MessageCircle,
  Wind,
} from "lucide-react";
import type { PublicVehicle } from "@/lib/types";
import { EnergyBadge } from "@/components/site/primitives";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/components/providers/i18n-provider";
import { useQuoteStore } from "@/lib/quote-store";
import { useVehicleStore } from "@/lib/vehicle-store";
import { useMounted } from "@/hooks/use-mounted";
import { vehicleWhatsAppMessage, buildWhatsAppLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

function formatPrice(usd: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(usd);
}

/**
 * Extract a clean, compact spec token from a raw spec string.
 *   "715 km (NEDC)"          → "715 km"
 *   "0–100 km/h in 3.9s"     → "3.9s"
 *   "517 hp (388 kW)"        → "517 hp"
 *   "185 km/h"               → "185 km/h"
 */
function specToken(value?: string): string {
  if (!value) return "—";
  const cleaned = value.split("(")[0].trim();
  // 0–100 acceleration → take the seconds value
  const accel = cleaned.match(/([\d.]+)\s*s/i);
  if (/0[\s–-]*100/i.test(cleaned) && accel) return `${accel[1]}s`;
  // "517 hp (388 kW)" already stripped to "517 hp" → keep first two tokens
  const parts = cleaned.split(/\s+/);
  if (parts.length >= 2 && /^\d/.test(parts[0])) return `${parts[0]} ${parts[1]}`;
  return cleaned;
}

/** Decide which 3 distinct specs to show, avoiding any duplication. */
function buildSpecs(vehicle: PublicVehicle): {
  icon: React.ReactNode;
  label: string;
  value: string;
}[] {
  const isEV = vehicle.energyType === "EV";
  const isHybrid = vehicle.energyType === "HYBRID";
  const electrified = isEV || isHybrid;

  const range = {
    icon: <BatteryCharging className="size-3.5" />,
    label: "vehicles.range",
    value: specToken(vehicle.specs.range),
  };
  const power = {
    icon: <Fuel className="size-3.5" />,
    label: "vehicles.power",
    value: specToken(vehicle.specs.horsepower),
  };
  const accel = {
    icon: <Gauge className="size-3.5" />,
    label: "vehicles.acceleration",
    value: specToken(vehicle.specs.acceleration),
  };
  const topSpeed = {
    icon: <Wind className="size-3.5" />,
    label: "vehicles.topSpeed",
    value: specToken(vehicle.specs.topSpeed),
  };

  // Electrified → Range | Power | 0-100   (no duplication)
  // Petrol     → Power | 0-100 | Top speed (no duplication)
  if (electrified) return [range, power, accel];
  return [power, accel, topSpeed];
}

export function VehicleCard({
  vehicle,
  onOpenDetails,
  className,
}: {
  vehicle: PublicVehicle;
  onOpenDetails?: (v: PublicVehicle) => void;
  className?: string;
}) {
  const { t } = useI18n();
  const requestQuote = useQuoteStore((s) => s.requestQuote);
  const compare = useVehicleStore((s) => s.compare);
  const addToCompare = useVehicleStore((s) => s.addToCompare);
  const removeFromCompare = useVehicleStore((s) => s.removeFromCompare);
  const pushRecent = useVehicleStore((s) => s.pushRecent);

  // Avoid hydration mismatch — read selected state after mount
  const mounted = useMounted();

  const isSelected = mounted && compare.includes(vehicle.slug);
  const specs = buildSpecs(vehicle);

  const handleOpen = () => {
    pushRecent(vehicle.slug);
    onOpenDetails?.(vehicle);
  };

  const handleCompare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSelected) removeFromCompare(vehicle.slug);
    else addToCompare(vehicle.slug);
  };

  const waLink = buildWhatsAppLink(
    vehicleWhatsAppMessage({
      brandName: vehicle.brandName,
      vehicleName: vehicle.name,
    })
  );

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition-shadow hover:shadow-xl",
        isSelected ? "border-primary ring-2 ring-primary/20" : "border-border",
        className
      )}
    >
      {/* Compare checkbox overlay */}
      <button
        type="button"
        onClick={handleCompare}
        aria-pressed={isSelected}
        aria-label={`${isSelected ? t("explorer.compare.remove") : t("vehicle.compare")} — ${vehicle.name}`}
        className={cn(
          "absolute end-3 top-3 z-20 inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold shadow-sm backdrop-blur-sm transition-all",
          isSelected
            ? "border-primary bg-primary text-primary-foreground"
            : "border-white/40 bg-black/30 text-white opacity-0 group-hover:opacity-100 hover:bg-black/50",
          "ltr:right-3 rtl:left-3"
        )}
      >
        {isSelected ? (
          <>
            <Check className="size-3" /> {t("vehicle.added")}
          </>
        ) : (
          <>
            <GitCompare className="size-3" /> {t("vehicle.compare")}
          </>
        )}
      </button>

      {/* Image */}
      <button
        type="button"
        onClick={handleOpen}
        className="relative block aspect-[16/10] w-full overflow-hidden rounded-t-2xl bg-muted"
        aria-label={`${t("vehicles.specs")} — ${vehicle.name}`}
      >
        {vehicle.image ? (
          <Image
            src={vehicle.image}
            alt={`${vehicle.brandName} ${vehicle.name}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
            loading="lazy"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : null}
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3">
          <EnergyBadge energy={vehicle.energyType} />
          <span className="flex items-center gap-1 rounded-full bg-emerald-500/90 px-2 py-0.5 text-[0.65rem] font-semibold text-white shadow-sm backdrop-blur-sm">
            <span className="size-1.5 rounded-full bg-white" />
            {t("vehicle.available")}
          </span>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        {/* HAKO AUTOMOBILE watermark */}
        <span className="absolute bottom-2 end-2 select-none text-[0.6rem] font-bold uppercase tracking-[0.15em] text-white/40 ltr:right-2 rtl:left-2">
          HAKO
        </span>
      </button>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            {vehicle.brandName}
          </span>
          {vehicle.bodyType ? (
            <span className="text-xs font-medium text-muted-foreground">
              {vehicle.bodyType}
            </span>
          ) : null}
        </div>

        <h3 className="font-display text-xl font-semibold leading-tight text-foreground">
          {vehicle.name}
        </h3>

        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {vehicle.excerpt}
        </p>

        {/* Quick specs — 3 distinct values, no duplication */}
        <div className="mt-1 grid grid-cols-3 gap-2 border-y border-border py-3 text-center">
          {specs.map((s, i) => (
            <SpecPill
              key={i}
              icon={s.icon}
              label={t(s.label)}
              value={s.value}
            />
          ))}
        </div>

        <div className="mt-auto flex items-end justify-between gap-3 pt-1">
          <div className="flex flex-col">
            <span className="text-[0.7rem] uppercase tracking-wider text-muted-foreground">
              {t("vehicles.from")}
            </span>
            <span className="font-display text-lg font-bold text-foreground">
              {formatPrice(vehicle.priceUsd)}
            </span>
          </div>
        </div>

        {/* Action row */}
        <div className="flex items-center gap-2 pt-1">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={handleOpen}
          >
            {t("vehicles.specs")}
          </Button>
          <Button
            size="sm"
            className="flex-1 gap-1.5"
            onClick={() =>
              requestQuote({ vehicleSlug: vehicle.slug, brand: vehicle.brandName })
            }
          >
            {t("vehicles.inquire")}
            <ArrowRight className="size-3.5 rtl:rotate-180" />
          </Button>
        </div>
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 rounded-full bg-[#25D366]/10 py-2 text-xs font-semibold text-[#1ebe5d] transition-colors hover:bg-[#25D366]/20"
          aria-label={`${t("vehicle.whatsapp")} — ${vehicle.name}`}
        >
          <MessageCircle className="size-3.5" />
          {t("vehicle.whatsapp")}
        </a>
      </div>
    </motion.article>
  );
}

function SpecPill({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-muted-foreground" aria-hidden>
        {icon}
      </span>
      <span className="text-xs font-semibold text-foreground">{value || "—"}</span>
      <span className="text-[0.62rem] uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
    </div>
  );
}
