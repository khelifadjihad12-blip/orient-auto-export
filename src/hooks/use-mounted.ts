import { useSyncExternalStore } from "react";

/**
 * Hydration-safe "has mounted" flag.
 *
 * Returns `false` during SSR and the first client render, then `true` once
 * hydrated. Implemented with `useSyncExternalStore` so it does not trigger
 * the `react-hooks/set-state-in-effect` lint rule and avoids cascading renders.
 *
 * Use this to gate reading browser-only state (localStorage, zustand-persist
 * stores) so the server-rendered HTML matches the first client render.
 */
const emptySubscribe = () => () => {};
export function useMounted(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true, // client snapshot
    () => false // server snapshot
  );
}
