"use client";

import Link from "next/link";
import { WHATSAPP_GROUP_URL } from "@/lib/constants";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

const TOOLTIP_TEXT = "Únete al grupo del HUB";

export function WhatsAppFloat() {
  return (
    <div
      className="group fixed bottom-6 right-6 z-50 flex flex-col items-end"
      style={{ marginBottom: "env(safe-area-inset-bottom, 0)" }}
    >
      {/* Tooltip (visible en hover, solo desktop) */}
      <span className="pointer-events-none absolute bottom-full right-0 mb-2 hidden whitespace-nowrap rounded bg-gray-900 px-3 py-2 text-sm font-medium text-white shadow-lg opacity-0 transition-opacity duration-200 group-hover:opacity-100 sm:block">
        {TOOLTIP_TEXT}
      </span>
      {/* FAB */}
      <Link
        href={WHATSAPP_GROUP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_4px_20px_rgba(37,211,102,0.45)] transition-transform duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 md:h-14 md:w-14 whatsapp-fab-pulse"
        aria-label={TOOLTIP_TEXT}
      >
        <WhatsAppIcon size={28} className="md:h-7 md:w-7" />
      </Link>
    </div>
  );
}
