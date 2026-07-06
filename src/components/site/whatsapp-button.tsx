"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  buildWhatsAppLink,
  DEFAULT_WHATSAPP_MESSAGE,
} from "@/lib/whatsapp";
import type { ReactNode } from "react";

interface WhatsAppButtonProps {
  message?: string;
  label?: string;
  className?: string;
  variant?: "solid" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
}

const VARIANTS: Record<NonNullable<WhatsAppButtonProps["variant"]>, string> = {
  solid:
    "bg-[#25D366] text-white shadow-sm hover:bg-[#1ebe5d] focus-visible:ring-[#25D366]/40",
  outline:
    "border-[#25D366]/40 bg-[#25D366]/5 text-[#1ebe5d] hover:bg-[#25D366]/10 border",
  ghost: "text-[#1ebe5d] hover:bg-[#25D366]/10",
};

const SIZES: Record<NonNullable<WhatsAppButtonProps["size"]>, string> = {
  sm: "h-8 gap-1.5 px-3 text-xs",
  md: "h-9 gap-2 px-4 text-sm",
  lg: "h-11 gap-2 px-6 text-base",
};

/**
 * Reusable WhatsApp Business CTA. Opens wa.me with a pre-filled message in a
 * new tab. Works on desktop (web.whatsapp.com) and mobile (native app).
 */
export function WhatsAppButton({
  message = DEFAULT_WHATSAPP_MESSAGE,
  label = "WhatsApp",
  className,
  variant = "solid",
  size = "md",
  icon,
}: WhatsAppButtonProps) {
  return (
    <motion.a
      href={buildWhatsAppLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        "inline-flex items-center justify-center rounded-full font-semibold transition-colors focus-visible:outline-none focus-visible:ring-[3px]",
        VARIANTS[variant],
        SIZES[size],
        className
      )}
      aria-label={`Contact us on WhatsApp — ${label}`}
    >
      {icon ?? <MessageCircle className="size-4" aria-hidden />}
      <span>{label}</span>
    </motion.a>
  );
}
