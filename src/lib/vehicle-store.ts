import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { PublicVehicle } from "@/lib/types";

const MAX_COMPARE = 3;
const MAX_RECENT = 6;

interface VehicleStoreState {
  /** Slugs selected for side-by-side comparison. */
  compare: string[];
  /** Recently viewed vehicle slugs (most recent first). */
  recent: string[];

  addToCompare: (slug: string) => void;
  removeFromCompare: (slug: string) => void;
  clearCompare: () => void;
  isInCompare: (slug: string) => boolean;

  pushRecent: (slug: string) => void;
  clearRecent: () => void;
}

export const useVehicleStore = create<VehicleStoreState>()(
  persist(
    (set, get) => ({
      compare: [],
      recent: [],

      addToCompare: (slug) =>
        set((state) => {
          if (state.compare.includes(slug)) return state;
          if (state.compare.length >= MAX_COMPARE) {
            // drop the oldest, append the newest
            return { compare: [...state.compare.slice(1), slug] };
          }
          return { compare: [...state.compare, slug] };
        }),
      removeFromCompare: (slug) =>
        set((state) => ({ compare: state.compare.filter((s) => s !== slug) })),
      clearCompare: () => set({ compare: [] }),
      isInCompare: (slug) => get().compare.includes(slug),

      pushRecent: (slug) =>
        set((state) => {
          const next = [slug, ...state.recent.filter((s) => s !== slug)];
          return { recent: next.slice(0, MAX_RECENT) };
        }),
      clearRecent: () => set({ recent: [] }),
    }),
    {
      name: "oae-vehicle-store",
      storage: createJSONStorage(() => localStorage),
      // Only persist the data, not the actions
      partialize: (state) => ({ compare: state.compare, recent: state.recent }),
    }
  )
);

export { MAX_COMPARE, MAX_RECENT };

/** Resolve a list of slugs against the full vehicle catalog (order preserved). */
export function resolveVehicles(
  slugs: string[],
  catalog: PublicVehicle[]
): PublicVehicle[] {
  return slugs
    .map((slug) => catalog.find((v) => v.slug === slug))
    .filter((v): v is PublicVehicle => Boolean(v));
}
