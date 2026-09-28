"use client";

import { useState } from "react";
import { Reveal } from "@/components/motion/reveal";
import { stagger } from "@/components/motion/stagger";
import { MediaDummy } from "./media-dummy";
import { Figure } from "@/components/figures/figure";
import { FIGURES, type FigureKey } from "@/components/figures/specs";

type Item = { title?: string; description?: string; image?: string; figure?: string };

/**
 * Anwendungsfaelle als Registerliste mit fester Buehne.
 *
 * Bei acht Faellen ergaeben abwechselnde Halbseiten rund acht Bildschirm-
 * hoehen. Hier stehen alle Titel sofort untereinander, rechts steht der
 * gewaehlte Fall. Die Texte der nicht gewaehlten Faelle bleiben im Markup
 * (nur `hidden`), damit Suchmaschinen und Sprachmodelle sie weiterhin lesen.
 *
 * Bewusst ohne Tab-Rollen: Dafuer erwarten Screenreader Pfeiltasten-
 * Navigation. Als Liste aus Schaltflaechen mit `aria-current` funktioniert
 * die Komponente mit Tabulator und Eingabetaste wie erwartet.
 */
export function UseCaseList({
  kicker,
  headline,
  items,
}: {
  kicker?: string;
  headline?: string;
  items: Item[];
}) {
  const [active, setActive] = useState(0);
  if (!items.length) return null;

  return (
    <section className="band band--silver-card" id="anwendungsfaelle" data-surface="silver">
      <div className="band__inner band__inner--wide">
        <Reveal className="band__head">
          {kicker && <span className="kicker">{kicker}</span>}
          {headline && <h2 className="band__title">{headline}</h2>}
        </Reveal>

        <Reveal className="usecases" delay={stagger(1)}>
          <div className="usecases__nav">
            {items.map((item, i) => (
              <button
                key={i}
                type="button"
                className="usecases__tab"
                aria-current={i === active || undefined}
                onClick={() => setActive(i)}
              >
                <span className="usecases__idx">{String(i + 1).padStart(2, "0")}</span>
                {item.title}
              </button>
            ))}
          </div>

          <div className="usecases__stage">
            {items.map((item, i) => (
              <article key={i} className="usecases__panel" hidden={i !== active}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <div className="usecases__visual">
                  {item.figure && item.figure in FIGURES ? (
                    <Figure name={item.figure as FigureKey} label={item.title} />
                  ) : (
                    <MediaDummy label={`Attrappe · ${item.title ?? "Ansicht"}`} ratio="4 / 3" />
                  )}
                </div>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
