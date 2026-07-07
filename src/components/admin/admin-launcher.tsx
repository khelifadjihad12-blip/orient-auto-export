"use client";

import { useState } from "react";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdminModal } from "@/components/admin/admin-modal";
import type { PublicBrand } from "@/lib/types";

/**
 * Floating admin button + modal launcher.
 * Appears in the navbar area. Opens a password-protected admin panel
 * for adding brands, vehicles, and managing the catalog.
 */
export function AdminLauncher({ brands }: { brands: PublicBrand[] }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="text-muted-foreground hover:text-foreground"
        onClick={() => setOpen(true)}
        aria-label="Admin — manage catalog"
        title="Admin Panel"
      >
        <Settings className="size-4" />
      </Button>
      <AdminModal open={open} onOpenChange={setOpen} brands={brands} />
    </>
  );
}
