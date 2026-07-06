"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  ChevronRight,
  ChevronLeft,
  Car,
  Ship,
  Building2,
  ClipboardCheck,
  Loader2,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useI18n } from "@/components/providers/i18n-provider";
import { useQuoteStore } from "@/lib/quote-store";
import type { PublicVehicle, PublicBrand } from "@/lib/types";
import { cn } from "@/lib/utils";

const quoteSchema = z.object({
  vehicleSlug: z.string().optional().default(""),
  brand: z.string().optional().default(""),
  quantity: z.coerce.number().int().min(1, "Min 1").max(1000, "Max 1000"),
  destinationPort: z.string().min(1, "Required"),
  paymentPreference: z.string().min(1, "Required"),
  businessName: z.string().max(200).optional().default(""),
  contactPerson: z.string().min(2, "Required"),
  email: z.string().email("Invalid email"),
  phone: z.string().optional().default(""),
  country: z.string().min(1, "Required"),
  notes: z.string().max(4000).optional().default(""),
});

type QuoteForm = z.input<typeof quoteSchema>;

const STEP_FIELDS: (keyof QuoteForm)[][] = [
  ["vehicleSlug", "brand", "quantity"],
  ["destinationPort", "paymentPreference"],
  ["businessName", "contactPerson", "email", "phone", "country"],
  ["notes"],
];

export function QuotationWizard({
  vehicles,
  brands,
  destinationPorts,
}: {
  vehicles: PublicVehicle[];
  brands: PublicBrand[];
  destinationPorts: string[];
}) {
  const { t, dir } = useI18n();
  const prefillVehicle = useQuoteStore((s) => s.vehicleSlug);
  const prefillBrand = useQuoteStore((s) => s.brand);
  const consume = useQuoteStore((s) => s.consume);
  const requestQuote = useQuoteStore((s) => s.requestQuote);
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ leadId: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<QuoteForm>({
    resolver: zodResolver(quoteSchema),
    mode: "onTouched",
    defaultValues: {
      vehicleSlug: "",
      brand: "",
      quantity: 1,
      destinationPort: "",
      paymentPreference: "",
      businessName: "",
      contactPerson: "",
      email: "",
      phone: "",
      country: "",
      notes: "",
    },
  });

  // ── Auto-save draft to localStorage ─────────────────────────
  const DRAFT_KEY = "oae-quote-draft";
  const [autosaved, setAutosaved] = useState(false);

  // Restore draft on mount
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(DRAFT_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as Partial<QuoteForm>;
        // Only restore contact/logistics fields, never a stale prefill
        const restore: Partial<QuoteForm> = {};
        for (const k of ["quantity", "destinationPort", "paymentPreference", "businessName", "contactPerson", "email", "phone", "country", "notes"] as (keyof QuoteForm)[]) {
          if (saved[k] !== undefined && saved[k] !== "") (restore as Record<string, unknown>)[k as string] = saved[k];
        }
        if (Object.keys(restore).length > 0) {
          form.reset({ ...form.getValues(), ...restore });
        }
      }
    } catch {
      /* ignore */
    }
  }, []);

  // Persist on change (debounced via subscription)
  useEffect(() => {
    const sub = form.subscribe({
      formState: { values: true },
      callback: ({ values }) => {
        if (!values) return;
        try {
          // Don't persist empty drafts
          const hasData = (Object.values(values).filter((v) => typeof v === "string" && v.trim()).length > 0) || (values.quantity && values.quantity > 1);
          if (hasData) {
            window.localStorage.setItem(DRAFT_KEY, JSON.stringify(values));
            setAutosaved(true);
          }
        } catch {
          /* ignore */
        }
      },
    });
    return () => sub();
  }, [form]);

  // Consume prefill from the global store (set by "Inquire" buttons).
  // Subscribes to the store so clicks after mount still apply.
  useEffect(() => {
    if (!prefillVehicle && !prefillBrand) return;
    if (prefillVehicle) {
      const v = vehicles.find((x) => x.slug === prefillVehicle);
      if (v) {
        form.setValue("vehicleSlug", v.slug, { shouldValidate: false });
        form.setValue("brand", v.brandName, { shouldValidate: false });
      }
    } else if (prefillBrand) {
      form.setValue("brand", prefillBrand, { shouldValidate: false });
    }
    consume();
  }, [prefillVehicle, prefillBrand, vehicles, form, consume]);

  const steps = useMemo(
    () => [
      { title: t("quote.step1.title"), icon: Car },
      { title: t("quote.step2.title"), icon: Ship },
      { title: t("quote.step3.title"), icon: Building2 },
      { title: t("quote.step4.title"), icon: ClipboardCheck },
    ],
    [t]
  );

  const next = async () => {
    const valid = await form.trigger(STEP_FIELDS[step]);
    if (valid) setStep((s) => Math.min(steps.length - 1, s + 1));
  };
  const back = () => setStep((s) => Math.max(0, s - 1));

  async function onSubmit(values: QuoteForm) {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Submission failed");
      }
      setResult({ leadId: data.leadId });
      // Clear the auto-saved draft on success
      try {
        window.localStorage.removeItem(DRAFT_KEY);
      } catch {
        /* ignore */
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Submission failed");
    } finally {
      setSubmitting(false);
    }
  }

  const paymentOptions = [
    { value: "T/T", label: t("quote.payment.tt") },
    { value: "L/C", label: t("quote.payment.lc") },
    { value: "OPEN", label: t("quote.payment.both") },
  ];

  return (
    <section id="quote" className="scroll-mt-24 bg-muted/30 py-20 sm:py-28">
      <div className="container-px mx-auto max-w-4xl">
        <SectionHeading
          eyebrow={t("quote.eyebrow")}
          title={t("quote.title")}
          subtitle={t("quote.subtitle")}
        />

        <Reveal className="mt-12">
          <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-xl">
            {result ? (
              <SuccessState
                leadId={result.leadId}
                onReset={() => {
                  setResult(null);
                  form.reset();
                  setStep(0);
                }}
              />
            ) : (
              <div>
                {/* Stepper */}
                <div className="border-b border-border bg-muted/40 px-6 py-5 sm:px-8">
                  <div className="flex items-center justify-between gap-2">
                    {steps.map((s, i) => {
                      const Icon = s.icon;
                      const done = i < step;
                      const current = i === step;
                      return (
                        <div key={i} className="flex flex-1 items-center gap-2">
                          <div className="flex flex-col items-center gap-1.5">
                            <div
                              className={cn(
                                "flex size-10 items-center justify-center rounded-full border-2 transition-all",
                                done
                                  ? "border-primary bg-primary text-primary-foreground"
                                  : current
                                  ? "border-primary bg-card text-primary"
                                  : "border-border bg-card text-muted-foreground"
                              )}
                            >
                              {done ? (
                                <Check className="size-5" />
                              ) : (
                                <Icon className="size-5" />
                              )}
                            </div>
                            <span
                              className={cn(
                                "hidden text-[0.7rem] font-medium sm:block",
                                current || done ? "text-foreground" : "text-muted-foreground"
                              )}
                            >
                              {t("quote.step")} {i + 1}
                            </span>
                          </div>
                          {i < steps.length - 1 ? (
                            <div
                              className={cn(
                                "h-0.5 flex-1 rounded-full transition-colors",
                                i < step ? "bg-primary" : "bg-border"
                              )}
                            />
                          ) : null}
                        </div>
                      );
                    })}
                  </div>
                  <p className="mt-3 text-sm font-medium text-foreground">
                    {t("quote.step")} {step + 1} {t("quote.of")} {steps.length} ·{" "}
                    <span className="text-muted-foreground">{steps[step].title}</span>
                  </p>
                  {autosaved && !result ? (
                    <span className="mt-1 inline-flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400">
                      <span className="size-1.5 rounded-full bg-emerald-500" />
                      {t("quote.autosaved")}
                    </span>
                  ) : null}
                </div>

                {/* Form body */}
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="p-6 sm:p-8"
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={step}
                        initial={{ opacity: 0, x: dir === "rtl" ? -16 : 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: dir === "rtl" ? 16 : -16 }}
                        transition={{ duration: 0.25 }}
                      >
                        {step === 0 ? (
                          <div className="grid gap-5 sm:grid-cols-2">
                            <FormField
                              control={form.control}
                              name="brand"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>{t("quote.field.brand")}</FormLabel>
                                  <Select
                                    value={field.value}
                                    onValueChange={field.onChange}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder={t("quote.field.brandPlaceholder")} />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {brands.map((b) => (
                                        <SelectItem key={b.id} value={b.name}>
                                          {b.name}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="vehicleSlug"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>{t("quote.field.vehicle")}</FormLabel>
                                  <Select
                                    value={field.value}
                                    onValueChange={field.onChange}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder={t("quote.field.vehiclePlaceholder")} />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {vehicles.map((v) => (
                                        <SelectItem key={v.id} value={v.slug}>
                                          {v.brandName} {v.name} · {v.energyType}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="quantity"
                              render={({ field }) => (
                                <FormItem className="sm:col-span-2">
                                  <FormLabel>{t("quote.field.quantity")}</FormLabel>
                                  <div className="flex items-center gap-3">
                                    <Button
                                      type="button"
                                      variant="outline"
                                      size="icon"
                                      onClick={() =>
                                        form.setValue(
                                          "quantity",
                                          Math.max(1, Number(field.value) - 1)
                                        )
                                      }
                                      aria-label="Decrease quantity"
                                    >
                                      <ChevronLeft className="size-4 rtl:rotate-180" />
                                    </Button>
                                    <FormControl>
                                      <Input
                                        type="number"
                                        min={1}
                                        className="w-28 text-center text-lg font-semibold"
                                        {...field}
                                      />
                                    </FormControl>
                                    <Button
                                      type="button"
                                      variant="outline"
                                      size="icon"
                                      onClick={() =>
                                        form.setValue(
                                          "quantity",
                                          Number(field.value) + 1
                                        )
                                      }
                                      aria-label="Increase quantity"
                                    >
                                      <ChevronRight className="size-4 rtl:rotate-180" />
                                    </Button>
                                    <span className="text-sm text-muted-foreground">
                                      {t("quote.field.quantityUnit")}
                                    </span>
                                  </div>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        ) : null}

                        {step === 1 ? (
                          <div className="grid gap-5">
                            <FormField
                              control={form.control}
                              name="destinationPort"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>{t("quote.field.destination")}</FormLabel>
                                  <Select
                                    value={field.value}
                                    onValueChange={field.onChange}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder={t("quote.field.destinationPlaceholder")} />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {destinationPorts.map((p) => (
                                        <SelectItem key={p} value={p}>
                                          {p}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="paymentPreference"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>{t("quote.field.payment")}</FormLabel>
                                  <div className="grid gap-2 sm:grid-cols-3">
                                    {paymentOptions.map((opt) => (
                                      <button
                                        type="button"
                                        key={opt.value}
                                        onClick={() => field.onChange(opt.value)}
                                        className={cn(
                                          "rounded-xl border-2 p-4 text-left transition-all",
                                          field.value === opt.value
                                            ? "border-primary bg-primary/5"
                                            : "border-border hover:border-primary/40"
                                        )}
                                      >
                                        <div className="flex items-center justify-between">
                                          <span className="text-sm font-semibold text-foreground">
                                            {opt.label}
                                          </span>
                                          {field.value === opt.value ? (
                                            <Check className="size-4 text-primary" />
                                          ) : null}
                                        </div>
                                      </button>
                                    ))}
                                  </div>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        ) : null}

                        {step === 2 ? (
                          <div className="grid gap-5 sm:grid-cols-2">
                            <FormField
                              control={form.control}
                              name="contactPerson"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>
                                    {t("quote.field.contactPerson")}{" "}
                                    <span className="text-destructive">*</span>
                                  </FormLabel>
                                  <FormControl>
                                    <Input placeholder="—" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="businessName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>{t("quote.field.businessName")}</FormLabel>
                                  <FormControl>
                                    <Input placeholder="—" {...field} />
                                  </FormControl>
                                  <FormDescription>
                                    {t("quote.field.businessNameHint")}
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>
                                    {t("quote.field.email")}{" "}
                                    <span className="text-destructive">*</span>
                                  </FormLabel>
                                  <FormControl>
                                    <Input type="email" placeholder="name@company.com" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="phone"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>{t("quote.field.phone")}</FormLabel>
                                  <FormControl>
                                    <Input placeholder="+213 ..." {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="country"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>
                                    {t("quote.field.country")}{" "}
                                    <span className="text-destructive">*</span>
                                  </FormLabel>
                                  <Select
                                    value={field.value}
                                    onValueChange={field.onChange}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="—" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {["Algeria", "Morocco", "Tunisia", "Libya", "Egypt", "Saudi Arabia", "UAE", "Other"].map((c) => (
                                        <SelectItem key={c} value={c}>
                                          {c}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        ) : null}

                        {step === 3 ? (
                          <div className="flex flex-col gap-5">
                            <div className="rounded-xl border border-border bg-muted/40 p-5">
                              <p className="mb-3 text-sm font-medium text-foreground">
                                {t("quote.summary")}
                              </p>
                              <SummaryRow label={t("quote.field.brand")} value={form.watch("brand")} />
                              <SummaryRow
                                label={t("quote.field.vehicle")}
                                value={
                                  vehicles.find((v) => v.slug === form.watch("vehicleSlug"))
                                    ?.name || "—"
                                }
                              />
                              <SummaryRow
                                label={t("quote.field.quantity")}
                                value={String(form.watch("quantity") || 1)}
                              />
                              <SummaryRow
                                label={t("quote.field.destination")}
                                value={form.watch("destinationPort")}
                              />
                              <SummaryRow
                                label={t("quote.field.payment")}
                                value={
                                  paymentOptions.find(
                                    (o) => o.value === form.watch("paymentPreference")
                                  )?.label
                                }
                              />
                              <SummaryRow
                                label={t("quote.field.contactPerson")}
                                value={form.watch("contactPerson")}
                              />
                              <SummaryRow label={t("quote.field.email")} value={form.watch("email")} />
                              <SummaryRow label={t("quote.field.country")} value={form.watch("country")} />
                            </div>
                            <FormField
                              control={form.control}
                              name="notes"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>{t("quote.field.notes")}</FormLabel>
                                  <FormControl>
                                    <Textarea
                                      rows={4}
                                      placeholder={t("quote.field.notesPlaceholder")}
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        ) : null}
                      </motion.div>
                    </AnimatePresence>

                    {error ? (
                      <p className="mt-4 rounded-lg bg-destructive/10 px-4 py-2.5 text-sm text-destructive">
                        {t("quote.error")}
                      </p>
                    ) : null}

                    {/* Nav buttons */}
                    <div className="mt-8 flex items-center justify-between gap-3 border-t border-border pt-6">
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={back}
                        disabled={step === 0}
                        className="gap-1"
                      >
                        <ChevronLeft className="size-4 rtl:rotate-180" />
                        {t("quote.back")}
                      </Button>
                      {step < steps.length - 1 ? (
                        <Button type="button" onClick={next} className="gap-1.5">
                          {t("quote.next")}
                          <ChevronRight className="size-4 rtl:rotate-180" />
                        </Button>
                      ) : (
                        <Button type="submit" disabled={submitting} className="gap-1.5">
                          {submitting ? (
                            <Loader2 className="size-4 animate-spin" />
                          ) : (
                            <Sparkles className="size-4" />
                          )}
                          {submitting ? t("quote.submitting") : t("quote.submit")}
                        </Button>
                      )}
                    </div>
                  </form>
                </Form>
              </div>
            )}
          </div>
        </Reveal>

        <Reveal className="mt-4">
          <p className="flex items-center justify-center gap-2 text-center text-xs text-muted-foreground">
            <ShieldCheck className="size-3.5 text-[var(--gold)]" />
            {t("footer.disclaimer")}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function SummaryRow({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-border/60 py-1.5 text-sm last:border-0">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-foreground">{value || "—"}</span>
    </div>
  );
}

function SuccessState({
  leadId,
  onReset,
}: {
  leadId: string;
  onReset: () => void;
}) {
  const { t } = useI18n();
  return (
    <div className="flex flex-col items-center gap-5 p-8 text-center sm:p-12">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="flex size-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400"
      >
        <Check className="size-8" />
      </motion.div>
      <h3 className="font-display text-2xl font-bold text-foreground">
        {t("quote.success.title")}
      </h3>
      <div className="rounded-xl border border-border bg-muted/50 px-6 py-4">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {t("quote.success.lead")}
        </p>
        <p className="mt-1 font-display text-2xl font-bold tracking-tight text-primary">
          {leadId}
        </p>
      </div>
      <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
        {t("quote.success.message")}
      </p>
      <Button variant="outline" onClick={onReset}>
        {t("quote.success.another")}
      </Button>
    </div>
  );
}
