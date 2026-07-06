"use client";

import { useI18n } from "@/components/providers/i18n-provider";
import { locales, localeMeta, type Locale } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Check, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale } = useI18n();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn("gap-1.5 px-2.5 font-medium", className)}
          aria-label="Select language"
        >
          <Globe className="size-4" aria-hidden />
          <span className="text-xs font-semibold uppercase tracking-wide">
            {localeMeta[locale].flag}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[10rem]">
        {locales.map((l: Locale) => (
          <DropdownMenuItem
            key={l}
            onClick={() => setLocale(l)}
            className="flex items-center justify-between gap-3"
          >
            <span className="flex items-center gap-2.5">
              <span className="w-7 text-center text-xs font-bold uppercase">
                {localeMeta[l].flag}
              </span>
              <span>{localeMeta[l].label}</span>
            </span>
            {l === locale ? <Check className="size-4 text-primary" /> : null}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
