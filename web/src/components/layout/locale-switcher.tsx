"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

/** DE/EN-Umschalter – führt auf dieselbe Seite in der anderen Sprache. */
export function LocaleSwitcher() {
  const t = useTranslations("Nav");
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div className="locale-switch" role="group" aria-label={t("language")}>
      {routing.locales.map((l) => (
        <Link
          key={l}
          href={pathname}
          locale={l}
          aria-current={l === locale ? "true" : undefined}
          hrefLang={l}
        >
          {l.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
