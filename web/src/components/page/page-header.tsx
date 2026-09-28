import type { ReactNode } from "react";
import Image from "next/image";

/**
 * Kopf jeder Unterseite in drei Varianten:
 *
 * - schlicht: nur Text, fuer Seiten ohne passendes Motiv
 * - mit `media`: Text links, Bild oder Software-Ansicht rechts
 * - mit `background`: vollflaechiges Motiv, Text auf einer Glasflaeche
 *
 * Die Glasflaeche sitzt hier linksbuendig und deutlich flacher als im
 * Abschluss-Banner, damit ein Kopf nicht wie ein zweiter CTA wirkt.
 */
export function PageHeader({
  kicker,
  headline,
  lede,
  media,
  background,
  children,
}: {
  kicker?: string;
  headline?: string;
  lede?: string;
  media?: ReactNode;
  background?: string;
  children?: ReactNode;
}) {
  const text = (
    <>
      {kicker && <span className="kicker">{kicker}</span>}
      {headline && <h1 className="page-header__title">{headline}</h1>}
      {lede && <p className="page-header__lede">{lede}</p>}
      {children}
    </>
  );

  if (background) {
    return (
      <section className="band page-header page-header--cover dark" data-surface="dark">
        <Image
          src={background}
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          priority
          className="page-header__bg"
        />
        <div className="band__inner">
          <div className="page-header__glass">{text}</div>
        </div>
      </section>
    );
  }

  if (media) {
    return (
      <section className="band band--silver page-header" data-surface="silver">
        <div className="band__inner band__inner--wide">
          <div className="page-header__split">
            <div>{text}</div>
            <div className="page-header__media">{media}</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="band band--silver page-header" data-surface="silver">
      <div className="band__inner">{text}</div>
    </section>
  );
}
