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

/** The Orient Auto Export wordmark — a navy disc with a gold compass mark. */
export function Wordmark({
  className,
  variant = "dark",
}: {
  className?: string;
  variant?: "dark" | "light";
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span className="relative inline-flex size-9 items-center justify-center rounded-lg bg-navy-gradient text-primary-foreground shadow-sm ring-1 ring-white/10">
        <svg
          viewBox="0 0 24 24"
          className="size-5"
          fill="none"
          aria-hidden
        >
          <path
            d="M12 2 4 6v6c0 4.4 3.4 8.5 8 10 4.6-1.5 8-5.6 8-10V6l-8-4Z"
            stroke="currentColor"
            strokeWidth="1.4"
            opacity="0.5"
          />
          <circle cx="12" cy="11" r="2.4" fill="var(--gold)" />
          <path
            d="M12 4v3.6M12 14.4V18M5.5 11h2.6M15.9 11h2.6"
            stroke="var(--gold)"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[1.05rem] font-bold tracking-tight",
            variant === "light" ? "text-white" : "text-foreground"
          )}
        >
          Orient Auto Export
        </span>
        <span
          className={cn(
            "text-[0.62rem] font-medium uppercase tracking-[0.22em]",
            variant === "light" ? "text-white/55" : "text-muted-foreground"
          )}
        >
          Hong Kong · Vehicle Export
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
