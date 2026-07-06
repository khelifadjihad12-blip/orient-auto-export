"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import {
  MapPin,
  Mail,
  MessageCircle,
  Clock,
  Send,
  Check,
  Loader2,
  Building2,
  ShieldCheck,
  Timer,
} from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { WhatsAppButton } from "@/components/site/whatsapp-button";
import { quoteWhatsAppMessage } from "@/lib/whatsapp";
import { useI18n } from "@/components/providers/i18n-provider";

const contactSchema = z.object({
  name: z.string().min(2, "Required"),
  email: z.string().email("Invalid email"),
  subject: z.string().min(2, "Required"),
  message: z.string().min(5, "Too short"),
});

type ContactForm = z.infer<typeof contactSchema>;

export function Contact() {
  const { t } = useI18n();
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  async function onSubmit(values: ContactForm) {
    setSubmitting(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      setSent(true);
      form.reset();
    } finally {
      setSubmitting(false);
    }
  }

  const info = [
    {
      icon: Building2,
      label: t("contact.info.address"),
      value: "Suite 1208, Tower One, Lippo Centre,\n89 Queensway, Admiralty, Hong Kong",
    },
    { icon: Mail, label: t("contact.info.email"), value: "trade@orientautoexport.com" },
    { icon: MessageCircle, label: t("contact.info.whatsapp"), value: "+852 5987 4400" },
    { icon: Clock, label: t("contact.info.hours"), value: t("contact.info.hoursValue") },
    { icon: ShieldCheck, label: t("contact.registration.title"), value: t("contact.registration.body") },
    { icon: Timer, label: t("contact.response.title"), value: t("contact.response.body") },
  ];

  return (
    <section id="contact" className="scroll-mt-24 bg-muted/30 py-20 sm:py-28">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeading
          eyebrow={t("contact.eyebrow")}
          title={t("contact.title")}
          subtitle={t("contact.subtitle")}
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          {/* Info + map */}
          <Reveal>
            <div className="flex h-full flex-col gap-4">
              <div className="grid gap-3 sm:grid-cols-2">
                {info.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.label}
                      className="flex flex-col gap-2 rounded-2xl border border-border bg-card p-5 shadow-sm"
                    >
                      <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="size-5" />
                      </div>
                      <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        {item.label}
                      </span>
                      <span className="whitespace-pre-line text-sm font-medium text-foreground">
                        {item.value}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Map placeholder */}
              <div className="relative flex flex-1 items-center justify-center overflow-hidden rounded-2xl border border-border bg-navy-gradient p-8 text-center text-white shadow-sm">
                <div className="absolute inset-0 bg-grid-light opacity-30" />
                <div className="relative flex flex-col items-center gap-3">
                  <MapPin className="size-10 text-[var(--gold)]" />
                  <p className="font-display text-lg font-semibold">Hong Kong · Central</p>
                  <p className="max-w-xs text-sm text-white/70">
                    Registered office in the Lippo Centre, Admiralty — the heart of Hong Kong&apos;s
                    international business district.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.08}>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex h-full min-h-[20rem] flex-col items-center justify-center gap-4 text-center"
                >
                  <div className="flex size-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                    <Check className="size-7" />
                  </div>
                  <p className="font-display text-lg font-semibold text-foreground">
                    {t("contact.form.success")}
                  </p>
                  <Button variant="outline" onClick={() => setSent(false)}>
                    {t("quote.success.another")}
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="c-name">
                        {t("contact.form.name")} <span className="text-destructive">*</span>
                      </Label>
                      <Input id="c-name" {...form.register("name")} />
                      {form.formState.errors.name ? (
                        <p className="text-xs text-destructive">
                          {form.formState.errors.name.message}
                        </p>
                      ) : null}
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="c-email">
                        {t("contact.form.email")} <span className="text-destructive">*</span>
                      </Label>
                      <Input id="c-email" type="email" {...form.register("email")} />
                      {form.formState.errors.email ? (
                        <p className="text-xs text-destructive">
                          {form.formState.errors.email.message}
                        </p>
                      ) : null}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="c-subject">
                      {t("contact.form.subject")} <span className="text-destructive">*</span>
                    </Label>
                    <Input id="c-subject" {...form.register("subject")} />
                    {form.formState.errors.subject ? (
                      <p className="text-xs text-destructive">
                        {form.formState.errors.subject.message}
                      </p>
                    ) : null}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="c-message">
                      {t("contact.form.message")} <span className="text-destructive">*</span>
                    </Label>
                    <Textarea id="c-message" rows={5} {...form.register("message")} />
                    {form.formState.errors.message ? (
                      <p className="text-xs text-destructive">
                        {form.formState.errors.message.message}
                      </p>
                    ) : null}
                  </div>
                  <Button type="submit" disabled={submitting} className="mt-2 gap-1.5">
                    {submitting ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <Send className="size-4 rtl:rotate-180" />
                    )}
                    {t("contact.form.submit")}
                  </Button>
                  <div className="mt-3 flex items-center gap-3">
                    <span className="text-xs text-muted-foreground">— or —</span>
                    <WhatsAppButton
                      message={quoteWhatsAppMessage()}
                      label={t("contact.whatsapp.title")}
                      size="sm"
                      variant="outline"
                    />
                  </div>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
