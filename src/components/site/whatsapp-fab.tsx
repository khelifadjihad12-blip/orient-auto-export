"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, FileText, Phone } from "lucide-react";
import { useI18n } from "@/components/providers/i18n-provider";
import { useQuoteStore } from "@/lib/quote-store";
import {
  buildWhatsAppLink,
  quoteWhatsAppMessage,
  WHATSAPP_DISPLAY,
} from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/site/whatsapp-icon";
import { cn } from "@/lib/utils";

/**
 * Floating WhatsApp button (desktop + mobile) + a contextual expanded card.
 * Also renders a sticky bottom action bar on mobile with WhatsApp + Quote CTAs.
 */
export function WhatsAppFab() {
  const { t } = useI18n();
  const [expanded, setExpanded] = useState(false);
  const [visible, setVisible] = useState(false);
  const requestQuote = useQuoteStore((s) => s.requestQuote);

  // Reveal after a short scroll so it doesn't compete with the hero
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const waLink = buildWhatsAppLink(quoteWhatsAppMessage());

  return (
    <>
      {/* Desktop / tablet floating button */}
      <AnimatePresence>
        {visible ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 20 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="fixed bottom-6 end-6 z-50 hidden sm:block ltr:right-6 rtl:left-6"
          >
            <div className="relative flex flex-col items-end gap-3">
              <AnimatePresence>
                {expanded ? (
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 12, scale: 0.96 }}
                    transition={{ duration: 0.2 }}
                    className="w-72 overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
                  >
                    <div className="flex items-start justify-between gap-2 bg-gradient-to-r from-[#075E54] to-[#128C7E] p-4 text-white">
                      <div className="flex items-center gap-2.5">
                        <span className="relative flex size-9 items-center justify-center rounded-full bg-white/20">
                          <WhatsAppIcon className="size-5" />
                          <span className="absolute -end-0.5 -top-0.5 flex size-3">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-60" />
                            <span className="relative inline-flex size-3 rounded-full bg-white" />
                          </span>
                        </span>
                        <div className="flex flex-col leading-tight">
                          <span className="text-sm font-bold">HAKO AUTOMOBILE</span>
                          <span className="text-[0.7rem] text-white/85">
                            Typically replies in ~1 hour
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => setExpanded(false)}
                        aria-label="Close WhatsApp panel"
                        className="rounded-md p-1 text-white/80 hover:bg-white/15 hover:text-white"
                      >
                        <X className="size-4" />
                      </button>
                    </div>
                    <div className="flex flex-col gap-3 p-4">
                      <p className="text-sm text-muted-foreground">
                        {t("whatsapp.greeting")}
                      </p>
                      <a
                        href={waLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:shadow-md"
                      >
                        <WhatsAppIcon className="size-4" />
                        {t("whatsapp.start")}
                      </a>
                      <div className="flex items-center justify-between rounded-lg bg-muted/60 px-3 py-2 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1.5">
                          <Phone className="size-3.5" />
                          {WHATSAPP_DISPLAY}
                        </span>
                        <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                          <span className="size-1.5 rounded-full bg-emerald-500" />
                          Online
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>

              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                onClick={() => setExpanded((v) => !v)}
                aria-label={t("whatsapp.label")}
                aria-expanded={expanded}
                className="relative flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white shadow-xl shadow-[#128C7E]/40 ring-4 ring-white/50 transition-shadow dark:ring-black/30"
              >
                <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-25" />
                <WhatsAppIcon className="relative size-7" />
              </motion.button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Mobile sticky bottom action bar */}
      <AnimatePresence>
        {visible ? (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className="fixed inset-x-0 bottom-0 z-50 sm:hidden"
          >
            <div className="border-t border-border bg-background/95 px-4 py-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] shadow-[0_-8px_24px_rgba(0,0,0,0.08)] backdrop-blur-md">
              <div className="flex items-center gap-2">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] px-4 py-2.5 text-sm font-semibold text-white shadow-sm"
                  )}
                  aria-label={t("whatsapp.label")}
                >
                  <WhatsAppIcon className="size-4" />
                  WhatsApp
                </a>
                <button
                  onClick={() => requestQuote({})}
                  className="flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm"
                >
                  <FileText className="size-4" />
                  {t("nav.quote")}
                </button>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
