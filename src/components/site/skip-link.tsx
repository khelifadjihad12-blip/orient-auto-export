import { cn } from "@/lib/utils";

/**
 * Accessibility skip-link — the first focusable element on the page.
 * Hidden visually until focused via keyboard.
 */
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className={cn(
        "sr-only z-[100] focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground focus:shadow-lg"
      )}
    >
      Skip to main content
    </a>
  );
}
