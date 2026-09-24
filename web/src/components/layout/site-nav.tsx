"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { navItems, login } from "@/config/site";
import { LocaleSwitcher } from "./locale-switcher";
import { PointerGlow } from "@/components/home/pointer-glow";

/**
 * Schwebende, eingerückte Navigation (Brand-Bundle: ~20px Abstand, Radius 14).
 *
 * - Über dunklen Bändern (data-surface="dark") kippt sie mit, statt dauerhaft
 *   dunkel zu sein.
 * - Mit html[data-nav-hidden] tritt sie zurück – z. B. während der Hero in
 *   das Software-Bild hineinzoomt.
 */
export function SiteNav() {
  const t = useTranslations("Nav");
  const pathname = usePathname();
  // Merkt sich, für welche Seite der Wert gilt – so fällt er nach einem
  // Seitenwechsel automatisch zurück, ohne Zustand im Effekt zu setzen.
  const [surface, setSurface] = useState({ path: pathname, dark: false });
  const onDark = surface.path === pathname && surface.dark;
  const [menuOpen, setMenuOpen] = useState(false);


  // Welcher Untergrund liegt gerade unter der Navigation? Ein schmaler
  // Beobachtungsstreifen auf Höhe der Navigation statt Messung bei jedem Scroll.
  useEffect(() => {
    const dark = document.querySelectorAll('[data-surface="dark"]');
    if (!dark.length) return;
    const inStrip = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) inStrip.add(e.target);
          else inStrip.delete(e.target);
        }
        setSurface({ path: pathname, dark: inStrip.size > 0 });
      },
      { rootMargin: "-40px 0px -90% 0px" },
    );
    dark.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  // Offenes Aufklapp-Menü (nur eines gleichzeitig)
  const [openKey, setOpenKey] = useState<string | null>(null);
  const closeAll = () => {
    setMenuOpen(false);
    setOpenKey(null);
  };

  // Aufklapp-Menü schließt bei Klick daneben
  useEffect(() => {
    if (!openKey) return;
    const onDown = (e: PointerEvent) => {
      if (!(e.target as Element | null)?.closest?.(".nav__item")) setOpenKey(null);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [openKey]);

  // Menü schließt beim Klick auf einen Eintrag (siehe onClick) und mit Escape
  useEffect(() => {
    if (!menuOpen && !openKey) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeAll();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen, openKey]);

  return (
    <div className="nav-wrap">
      <nav className={cn("nav", onDark && "is-on-dark")} aria-label={t("label")}>
        <Link href="/" className="nav__brand">
          <Image
            className="nav__logo nav__logo--silver"
            src="/brand/lockup-logo-plus-type-on-silver-ultra.svg"
            alt="Greencore AI"
            width={175}
            height={24}
            priority
          />
          <Image
            className="nav__logo nav__logo--dark"
            src="/brand/lockup-logo-plus-type-on-dark-flash.svg"
            alt=""
            aria-hidden="true"
            width={175}
            height={24}
            priority
          />
        </Link>

        <ul id="nav-links" className={cn("nav__links", menuOpen && "is-open")}>
          {navItems.map((item) =>
            item.children ? (
              // Reiner Aufklapp-Punkt: keine eigene Seite, nur die Unterseiten
              <li key={item.key} className="nav__item">
                <button
                  type="button"
                  className="nav__toggle"
                  aria-expanded={openKey === item.key}
                  aria-controls={`submenu-${item.key}`}
                  onClick={() => setOpenKey((k) => (k === item.key ? null : item.key))}
                >
                  {t(item.key)}
                  <span aria-hidden="true" className="nav__chevron" />
                </button>
                <ul
                  id={`submenu-${item.key}`}
                  className="nav__submenu"
                  hidden={openKey !== item.key}
                >
                  {item.children.map((child) => (
                    <li key={child.key}>
                      <Link
                        href={child.href}
                        aria-current={pathname === child.href ? "page" : undefined}
                        onClick={closeAll}
                      >
                        {t(child.key)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ) : (
              <li key={item.key} className="nav__item">
                <Link
                  href={item.hash ? { pathname: item.href!, hash: item.hash } : item.href!}
                  aria-current={!item.hash && pathname === item.href ? "page" : undefined}
                  onClick={closeAll}
                >
                  {t(item.key)}
                </Link>
              </li>
            ),
          )}
          {/* Mobil: Sprache und CTA im aufgeklappten Menü */}
          <li className="nav__links-extra">
            <LocaleSwitcher />
            <Link href="/demo" className={buttonVariants()} onClick={closeAll}>
              {t("cta")}
            </Link>
          </li>
        </ul>

        <div className="nav__right">
          <LocaleSwitcher />
          {/* Platz für den späteren Login in die Software (nicht Go-Live) */}
          {login.enabled && (
            <a href={login.url} className={buttonVariants({ variant: "ghost" })}>
              {t("login")}
            </a>
          )}
          <Link href="/demo" className={buttonVariants()}>
            {t("cta")}
          </Link>
        </div>

        <button
          type="button"
          className="nav__burger"
          aria-expanded={menuOpen}
          aria-controls="nav-links"
          aria-label={menuOpen ? t("closeMenu") : t("openMenu")}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span aria-hidden="true">{menuOpen ? "×" : "≡"}</span>
        </button>
      </nav>
      <PointerGlow selector=".nav" />
    </div>
  );
}
