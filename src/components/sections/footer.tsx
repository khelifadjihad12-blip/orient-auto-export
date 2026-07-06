"use client";

import { toast } from "sonner";
import { Mail, MessageCircle, MapPin, ShieldCheck } from "lucide-react";
import { Wordmark } from "@/components/site/primitives";
import { useI18n } from "@/components/providers/i18n-provider";
import { useQuoteStore } from "@/lib/quote-store";
import { buildWhatsAppLink, quoteWhatsAppMessage } from "@/lib/whatsapp";

export function Footer() {
  const { t } = useI18n();
  const requestQuote = useQuoteStore((s) => s.requestQuote);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const companyLinks = [
    { label: t("nav.about"), id: "about" },
    { label: t("nav.brands"), id: "brands" },
    { label: t("nav.process"), id: "process" },
    { label: t("nav.shipping"), id: "shipping" },
  ];

  const resourceLinks = [
    { label: t("nav.vehicles"), id: "vehicles" },
    { label: t("nav.blog"), id: "insights" },
    { label: t("nav.contact"), id: "contact" },
  ];

  const legalLinks = [
    t("footer.privacy"),
    t("footer.terms"),
    t("footer.cookies"),
    t("footer.compliance"),
    t("footer.aml"),
    t("footer.kyc"),
    t("footer.disclaimerLink"),
  ];

  const onLegal = (label: string) =>
    toast.info(`${label}`, {
      description:
        "This document is available on request. Contact our trade desk at trade@orientautoexport.com to receive the full text.",
    });

  return (
    <footer className="mt-auto border-t border-border bg-navy-gradient text-white">
      <div className="container-px mx-auto max-w-7xl py-14">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Wordmark variant="light" />
            <p className="max-w-sm text-sm leading-relaxed text-white/65">
              {t("footer.tagline")}
            </p>
            <div className="flex flex-col gap-2 pt-2 text-sm text-white/70">
              <span className="inline-flex items-center gap-2">
                <MapPin className="size-4 text-[var(--gold)]" />
                Admiralty, Hong Kong
              </span>
              <a
                href="mailto:trade@orientautoexport.com"
                className="inline-flex items-center gap-2 transition-colors hover:text-white"
              >
                <Mail className="size-4 text-[var(--gold)]" />
                trade@orientautoexport.com
              </a>
              <a
                href={buildWhatsAppLink(quoteWhatsAppMessage())}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 transition-colors hover:text-white"
              >
                <MessageCircle className="size-4 text-[var(--gold)]" />
                +852 5987 4400 · WhatsApp
              </a>
            </div>
          </div>

          {/* Company */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
              {t("footer.company")}
            </h3>
            {companyLinks.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className="w-fit text-sm text-white/70 transition-colors hover:text-white"
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* Resources */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
              {t("footer.resources")}
            </h3>
            {resourceLinks.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className="w-fit text-sm text-white/70 transition-colors hover:text-white"
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={() => requestQuote({})}
              className="mt-1 w-fit rounded-full bg-[var(--gold)] px-4 py-1.5 text-xs font-semibold text-[oklch(0.2_0.02_80)] transition-opacity hover:opacity-90"
            >
              {t("nav.quote")}
            </button>
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
              {t("footer.legal")}
            </h3>
            {legalLinks.map((l) => (
              <button
                key={l}
                onClick={() => onLegal(l)}
                className="w-fit text-sm text-white/70 transition-colors hover:text-white"
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-10 flex items-start gap-2 rounded-xl border border-white/10 bg-white/5 p-4">
          <ShieldCheck className="mt-0.5 size-4 shrink-0 text-[var(--gold)]" />
          <p className="text-xs leading-relaxed text-white/55">{t("footer.disclaimer")}</p>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row">
          <p>
            © {new Date().getFullYear()} Orient Auto Export Limited. {t("footer.rights")}
          </p>
          <p className="flex items-center gap-1.5">
            <span className="inline-block size-1.5 rounded-full bg-emerald-400" />
            Hong Kong Registered · CR No. 28104472 (illustrative)
          </p>
        </div>
      </div>
    </footer>
  );
}
