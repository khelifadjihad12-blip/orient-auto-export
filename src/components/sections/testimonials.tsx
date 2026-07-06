"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/components/providers/i18n-provider";
import type { PublicTestimonial } from "@/lib/types";
import { cn } from "@/lib/utils";

export function Testimonials({ testimonials }: { testimonials: PublicTestimonial[] }) {
  const { t } = useI18n();
  const [index, setIndex] = useState(0);
  if (testimonials.length === 0) return null;

  const current = testimonials[index];
  const go = (dir: number) =>
    setIndex((i) => (i + dir + testimonials.length) % testimonials.length);

  return (
    <section className="py-20 sm:py-28">
      <div className="container-px mx-auto max-w-5xl">
        <SectionHeading
          eyebrow={t("testimonials.eyebrow")}
          title={t("testimonials.title")}
          subtitle={t("testimonials.subtitle")}
        />

        <Reveal className="mt-12">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-navy-gradient p-8 text-white shadow-xl sm:p-12">
            <Quote
              className="absolute end-8 top-8 size-16 text-white/10 ltr:right-8 rtl:left-8"
              aria-hidden
            />
            <AnimatePresence mode="wait">
              <motion.figure
                key={current.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35 }}
                className="relative flex flex-col gap-6"
              >
                <div className="flex gap-1" aria-label={`${current.rating} out of 5 stars`}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "size-5",
                        i < current.rating
                          ? "fill-[var(--gold)] text-[var(--gold)]"
                          : "text-white/20"
                      )}
                    />
                  ))}
                </div>

                <blockquote className="text-balance font-display text-xl font-medium leading-relaxed text-white/95 sm:text-2xl lg:text-[1.6rem]">
                  “{current.quote}”
                </blockquote>

                <figcaption className="flex items-center gap-3">
                  <div className="flex size-11 items-center justify-center rounded-full bg-white/15 font-display text-base font-bold ring-1 ring-white/20">
                    {current.name.charAt(0)}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-white">{current.name}</span>
                    <span className="text-sm text-white/60">
                      {current.company ? `${current.company} · ` : ""}
                      {current.country}
                    </span>
                  </div>
                </figcaption>
              </motion.figure>
            </AnimatePresence>

            {/* Controls */}
            <div className="mt-8 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    aria-label={`Testimonial ${i + 1}`}
                    className={cn(
                      "h-1.5 rounded-full transition-all",
                      i === index ? "w-8 bg-[var(--gold)]" : "w-3 bg-white/25 hover:bg-white/50"
                    )}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => go(-1)}
                  className="border border-white/20 text-white hover:bg-white/10 hover:text-white"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="size-4 rtl:rotate-180" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => go(1)}
                  className="border border-white/20 text-white hover:bg-white/10 hover:text-white"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="size-4 rtl:rotate-180" />
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
