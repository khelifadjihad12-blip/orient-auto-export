"use client";

import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EnergyBadge } from "@/components/site/primitives";
import { useI18n } from "@/components/providers/i18n-provider";
import { useQuoteStore } from "@/lib/quote-store";
import type { PublicVehicle } from "@/lib/types";
import {
  Cog,
  Battery,
  Gauge,
  Ruler,
  Users,
  Zap,
  Wrench,
  Wind,
  Timer,
  MessageCircle,
} from "lucide-react";
import {
  buildWhatsAppLink,
  vehicleWhatsAppMessage,
} from "@/lib/whatsapp";

function formatPrice(usd: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(usd);
}

export function VehicleDetailDialog({
  vehicle,
  open,
  onOpenChange,
}: {
  vehicle: PublicVehicle | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { t } = useI18n();
  const requestQuote = useQuoteStore((s) => s.requestQuote);
  if (!vehicle) return null;

  const specs = vehicle.specs;
  const specRows: { icon: React.ReactNode; label: string; value?: string }[] = [
    { icon: <Wrench className="size-4" />, label: t("vehicles.engine"), value: specs.engine },
    { icon: <Cog className="size-4" />, label: t("vehicles.transmission"), value: specs.transmission },
    { icon: <Battery className="size-4" />, label: t("vehicles.battery"), value: specs.battery },
    { icon: <Zap className="size-4" />, label: t("vehicles.range"), value: specs.range },
    { icon: <Gauge className="size-4" />, label: t("vehicles.power"), value: specs.horsepower },
    { icon: <Timer className="size-4" />, label: t("vehicles.acceleration"), value: specs.acceleration },
    { icon: <Wind className="size-4" />, label: t("vehicles.topSpeed"), value: specs.topSpeed },
    { icon: <Ruler className="size-4" />, label: t("vehicles.dimensions"), value: specs.dimensions },
    { icon: <Users className="size-4" />, label: t("vehicles.seating"), value: specs.seating },
  ].filter((r) => r.value);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] overflow-hidden p-0 sm:max-w-3xl">
        <div className="flex max-h-[92vh] flex-col">
          {/* Hero image */}
          <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden bg-muted">
            {vehicle.image ? (
              <Image
                src={vehicle.image}
                alt={`${vehicle.brandName} ${vehicle.name}`}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
              />
            ) : null}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-3 p-5">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <EnergyBadge energy={vehicle.energyType} />
                  <span className="rounded-full bg-white/15 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm ring-1 ring-white/20">
                    {vehicle.brandName}
                  </span>
                </div>
                <DialogTitle className="font-display text-2xl font-bold text-white sm:text-3xl">
                  {vehicle.name}
                </DialogTitle>
              </div>
              <div className="rounded-xl bg-white/95 px-4 py-2 text-right backdrop-blur-sm">
                <div className="text-[0.65rem] uppercase tracking-wider text-muted-foreground">
                  {t("vehicles.from")}
                </div>
                <div className="font-display text-xl font-bold text-foreground">
                  {formatPrice(vehicle.priceUsd)}
                </div>
              </div>
            </div>
          </div>

          {/* Scrollable body */}
          <div className="scrollbar-premium flex-1 overflow-y-auto p-5 sm:p-6">
            <DialogHeader className="sr-only">
              <DialogTitle>{vehicle.name}</DialogTitle>
              <DialogDescription>{vehicle.excerpt}</DialogDescription>
            </DialogHeader>

            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              {vehicle.description}
            </p>

            {/* Specs grid */}
            <h3 className="mt-6 font-display text-lg font-semibold text-foreground">
              {t("vehicles.specs")}
            </h3>
            <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {specRows.map((row) => (
                <div
                  key={row.label}
                  className="flex items-center gap-3 rounded-lg border border-border bg-muted/40 px-3 py-2.5"
                >
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                    {row.icon}
                  </span>
                  <div className="min-w-0">
                    <div className="text-[0.7rem] uppercase tracking-wide text-muted-foreground">
                      {row.label}
                    </div>
                    <div className="truncate text-sm font-medium text-foreground">
                      {row.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Features */}
            {specs.features && specs.features.length > 0 ? (
              <>
                <h3 className="mt-6 font-display text-lg font-semibold text-foreground">
                  {t("vehicles.features")}
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {specs.features.map((f) => (
                    <Badge key={f} variant="secondary" className="font-normal">
                      {f}
                    </Badge>
                  ))}
                </div>
              </>
            ) : null}
          </div>

          {/* Sticky footer */}
          <div className="flex shrink-0 items-center justify-between gap-3 border-t border-border bg-card px-5 py-4 sm:px-6">
            <span className="text-xs text-muted-foreground">
              {vehicle.brandName} · {vehicle.energyType}
            </span>
            <div className="flex items-center gap-2">
              <a
                href={buildWhatsAppLink(
                  vehicleWhatsAppMessage({
                    brandName: vehicle.brandName,
                    vehicleName: vehicle.name,
                  })
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 items-center gap-1.5 rounded-full bg-[#25D366] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#1ebe5d]"
                aria-label={`${t("vehicle.whatsapp")} — ${vehicle.name}`}
              >
                <MessageCircle className="size-4" />
                <span className="hidden sm:inline">{t("vehicle.whatsapp")}</span>
              </a>
              <Button
                onClick={() => {
                  onOpenChange(false);
                  requestQuote({ vehicleSlug: vehicle.slug, brand: vehicle.brandName });
                }}
                className="gap-1.5"
              >
                {t("vehicles.inquire")}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
