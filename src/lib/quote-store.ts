import { create } from "zustand";

interface QuotePrefill {
  vehicleSlug: string | null;
  brand: string | null;
}

interface QuoteStore extends QuotePrefill {
  /** Set a prefill and signal the wizard to open at the quote section. */
  requestQuote: (prefill: Partial<QuotePrefill>) => void;
  /** Clear the prefill after the wizard has consumed it. */
  consume: () => void;
}

export const useQuoteStore = create<QuoteStore>((set) => ({
  vehicleSlug: null,
  brand: null,
  requestQuote: (prefill) => {
    set({
      vehicleSlug: prefill.vehicleSlug ?? null,
      brand: prefill.brand ?? null,
    });
    // Smooth-scroll to the quotation section
    if (typeof document !== "undefined") {
      const el = document.getElementById("quote");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  },
  consume: () => set({ vehicleSlug: null, brand: null }),
}));
