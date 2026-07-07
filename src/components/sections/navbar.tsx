"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Ship, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Wordmark } from "@/components/site/primitives";
import { LanguageSwitcher } from "@/components/site/language-switcher";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { AdminLauncher } from "@/components/admin/admin-launcher";
import { useI18n } from "@/components/providers/i18n-provider";
import { useQuoteStore } from "@/lib/quote-store";
import { cn } from "@/lib/utils";
import type { PublicBrand } from "@/lib/types";

const NAV_SECTIONS = [
  "brands",
  "vehicles",
  "process",
  "shipping",
  "about",
  "insights",
  "contact",
] as const;

export function Navbar({ brands = [] }: { brands?: PublicBrand[] }) {
  const { t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const requestQuote = useQuoteStore((s) => s.requestQuote);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-border bg-background/85 shadow-sm backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <nav className="container-px mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 lg:h-20">
        <a
          href="#top"
          onClick={(e) => handleNav(e, "top")}
          className="flex items-center"
          aria-label={t("brand.name")}
        >
          <Wordmark />
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 lg:flex">
          {NAV_SECTIONS.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => handleNav(e, id)}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              {t(`nav.${id === "insights" ? "blog" : id}`)}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-1">
          <div className="hidden items-center gap-1 sm:flex">
            <LanguageSwitcher />
            <ThemeToggle />
            <AdminLauncher brands={brands} />
          </div>
          <Button
            size="sm"
            className="hidden gap-1.5 md:inline-flex"
            onClick={() => requestQuote({})}
          >
            <FileText className="size-4" />
            {t("nav.quote")}
          </Button>

          {/* Mobile menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                aria-label={t("nav.menu")}
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="end" className="w-[88vw] max-w-sm p-0">
              <SheetTitle className="sr-only">{t("nav.menu")}</SheetTitle>
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between border-b border-border p-5">
                  <Wordmark />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setMobileOpen(false)}
                    aria-label="Close menu"
                  >
                    <X className="size-5" />
                  </Button>
                </div>
                <div className="flex flex-1 flex-col gap-1 overflow-y-auto p-4">
                  {NAV_SECTIONS.map((id) => (
                    <a
                      key={id}
                      href={`#${id}`}
                      onClick={(e) => handleNav(e, id)}
                      className="rounded-lg px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-accent"
                    >
                      {t(`nav.${id === "insights" ? "blog" : id}`)}
                    </a>
                  ))}
                </div>
                <div className="flex items-center justify-between gap-2 border-t border-border p-4">
                  <LanguageSwitcher />
                  <div className="flex items-center gap-1">
                    <ThemeToggle />
                    <AdminLauncher brands={brands} />
                  </div>
                </div>
                <div className="border-t border-border p-4">
                  <Button
                    className="w-full gap-1.5"
                    onClick={() => {
                      setMobileOpen(false);
                      requestQuote({});
                    }}
                  >
                    <Ship className="size-4" />
                    {t("nav.quote")}
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      {/* Scroll progress accent */}
      <AnimatePresence>
        {scrolled ? (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ scaleX: 0 }}
            className="h-0.5 origin-left bg-gradient-to-r from-primary via-[var(--gold)] to-primary"
          />
        ) : null}
      </AnimatePresence>
    </header>
  );
}
