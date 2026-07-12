"use client";

import { cn } from "@/lib/utils";
import { Battery, Fuel, Zap, Gauge } from "lucide-react";
import type { ReactNode } from "react";

const energyConfig: Record<
  string,
  { label: string; className: string; icon: typeof Zap }
> = {
  EV: {
    label: "Electric",
    className: "bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:ring-emerald-800",
    icon: Zap,
  },
  HYBRID: {
    label: "Hybrid",
    className: "bg-sky-50 text-sky-700 ring-sky-200 dark:bg-sky-950/50 dark:text-sky-300 dark:ring-sky-800",
    icon: Battery,
  },
  PETROL: {
    label: "Petrol",
    className: "bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:ring-amber-800",
    icon: Fuel,
  },
  DIESEL: {
    label: "Diesel",
    className: "bg-stone-100 text-stone-700 ring-stone-300 dark:bg-stone-800/50 dark:text-stone-300 dark:ring-stone-700",
    icon: Fuel,
  },
};

export function EnergyBadge({
  energy,
  className,
}: {
  energy: string;
  className?: string;
}) {
  const config = energyConfig[energy?.toUpperCase()] ?? energyConfig.PETROL;
  const Icon = config.icon;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset",
        config.className,
        className
      )}
    >
      <Icon className="size-3.5" aria-hidden />
      {config.label}
    </span>
  );
}

/** The HAKO AUTOMOBILE wordmark — a geometric H icon + HAKO wordmark + AUTOMOBILE below. */
export function Wordmark({
  className,
  variant = "dark",
}: {
  className?: string;
  variant?: "dark" | "light";
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      {/* Geometric H icon — stylized hexagonal frame with H letterform */}
      <span className="relative inline-flex size-10 items-center justify-center rounded-lg bg-navy-gradient shadow-sm ring-1 ring-[var(--gold)]/30">
        <svg
          viewBox="0 0 32 32"
          className="size-6"
          fill="none"
          aria-hidden
        >
          {/* Hexagonal frame */}
          <path
            d="M16 2 28 9v14L16 30 4 23V9L16 2Z"
            stroke="var(--gold)"
            strokeWidth="1.2"
            opacity="0.4"
          />
          {/* Stylized H letterform */}
          <path
            d="M11 9v14M21 9v14M11 16h10"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Gold accent dot */}
          <circle cx="16" cy="16" r="1" fill="var(--gold)" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[1.1rem] font-bold tracking-[0.08em]",
            variant === "light" ? "text-white" : "text-foreground"
          )}
        >
          HAKO
        </span>
        <span
          className={cn(
            "text-[0.58rem] font-semibold uppercase tracking-[0.3em]",
            variant === "light" ? "text-[var(--gold)]" : "text-primary"
          )}
        >
          AUTOMOBILE
        </span>
      </span>
    </span>
  );
}

export function GoldDivider({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-block h-px w-12 bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent",
        className
      )}
      aria-hidden
    />
  );
}

export function Stat({
  value,
  label,
  light = false,
  icon,
}: {
  value: ReactNode;
  label: string;
  light?: boolean;
  icon?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        {icon ? (
          <span className={light ? "text-gold" : "text-primary"}>{icon}</span>
        ) : null}
        <span
          className={cn(
            "font-display text-3xl font-bold tracking-tight sm:text-4xl",
            light ? "text-white" : "text-foreground"
          )}
        >
          {value}
        </span>
      </div>
      <span
        className={cn(
          "text-xs font-medium uppercase tracking-wider sm:text-sm",
          light ? "text-white/60" : "text-muted-foreground"
        )}
      >
        {label}
      </span>
    </div>
  );
}

export function GaugeIcon({ className }: { className?: string }) {
  return <Gauge className={className} aria-hidden />;
}
