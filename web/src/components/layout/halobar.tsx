"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { AppPathname } from "@/i18n/routing";

/**
 * Aufklappbare Neuigkeiten-Leiste über der Navigation. Wird nur gerendert,
 * wenn sie aktiviert ist (src/config/site.ts, später Sanity).
 */
export function Halobar({ href }: { href: AppPathname }) {
  const t = useTranslations("Halobar");
  const [open, setOpen] = useState(true);
  if (!open) return null;

  return (
    <div className="halobar">
      <span className="halobar__tag">{t("tag")}</span>
      <Link href={href} className="halobar__text">
        {t("text")}
      </Link>
      <button
        type="button"
        className="halobar__close"
        aria-label={t("close")}
        onClick={() => setOpen(false)}
      >
        ×
      </button>
    </div>
  );
}
