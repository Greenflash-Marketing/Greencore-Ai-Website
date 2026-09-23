"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { routing, type AppPathname } from "@/i18n/routing";
import { buttonVariants } from "@/components/ui/button";
import type { GridItem } from "@/lib/sanity/collections";
import { MediaDummy } from "./media-dummy";

const isAppPath = (href: string): href is AppPathname => href in routing.pathnames;

/**
 * Kachel-Raster mit Filter – einmal gebaut für Referenzen, Blog und Presse.
 * Die Filter entstehen aus den vorhandenen Kategorien; gibt es nur eine,
 * werden sie gar nicht erst angezeigt.
 */
export function FilterGrid({ items, ctaLabel }: { items: GridItem[]; ctaLabel: string }) {
  const t = useTranslations("Collections");
  const [active, setActive] = useState<string | null>(null);

  const categories = useMemo(
    () => [...new Set(items.map((i) => i.category).filter(Boolean))] as string[],
    [items],
  );
  const shown = active ? items.filter((i) => i.category === active) : items;

  if (!items.length) return <p className="band__lede">{t("empty")}</p>;

  return (
    <>
      {categories.length > 1 && (
        <div className="filters" role="group" aria-label={t("filterLabel")}>
          <button type="button" aria-pressed={active === null} onClick={() => setActive(null)}>
            {t("all")}
          </button>
          {categories.map((c) => (
            <button key={c} type="button" aria-pressed={active === c} onClick={() => setActive(c)}>
              {c}
            </button>
          ))}
        </div>
      )}

      <div className="post-grid">
        {shown.map((item) => (
          <article key={item.id} className="post-card">
            <div className="post-card__media">
              {item.image ? (
                <Image src={item.image} alt="" width={640} height={360} />
              ) : (
                <MediaDummy label={t("imageDummy")} ratio="16 / 9" />
              )}
            </div>
            <div className="post-card__body">
              {item.category && <span className="post-card__tag">{item.category}</span>}
              <h3>{item.title}</h3>
              {item.excerpt && <p>{item.excerpt}</p>}
              {item.href &&
                (item.external ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className={buttonVariants({ variant: "outline", size: "sm" })}
                  >
                    {ctaLabel}
                  </a>
                ) : isAppPath(item.href) ? (
                  <Link href={item.href} className={buttonVariants({ variant: "outline", size: "sm" })}>
                    {ctaLabel}
                  </Link>
                ) : (
                  // Detailseiten folgen – bis dahin ohne Ziel, damit kein Link ins Leere führt
                  <span className="post-card__soon">{t("detailSoon")}</span>
                ))}
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
