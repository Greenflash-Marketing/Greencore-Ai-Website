"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import type { BandHead as BandHeadData, UseCase } from "@/lib/sanity/home";
import { BandHead } from "./band-head";
import { SplitPane } from "./split-pane";

const TONES = ["ultra", "flash", "lilac"] as const;

/** 5 — Anwendungsfälle: nummeriertes Tab-Menü mit Schrittsteuerung. */
export function UseCases({ band, cases }: { band?: BandHeadData; cases: UseCase[] }) {
  const t = useTranslations("Cases");
  const [active, setActive] = useState(0);
  if (!cases.length) return null;
  const step = (d: number) => setActive((i) => (i + d + cases.length) % cases.length);
  const current = cases[active];
  const nr = String(active + 1).padStart(2, "0");

  return (
    <section className="band band--silver-card" id="anwendungsfaelle" data-surface="silver">
      <div className="band__inner band__inner--wide">
        <BandHead {...band} />

        <div className="cases__tabs" role="tablist" aria-label={band?.headline}>
          {cases.map((c, i) => (
            <button
              key={i}
              className="cases__tab"
              role="tab"
              aria-selected={i === active}
              tabIndex={i === active ? 0 : -1}
              onClick={() => setActive(i)}
            >
              <span className="cases__idx">{String(i + 1).padStart(2, "0")}</span> {c.title}
            </button>
          ))}
        </div>

        <SplitPane tone={TONES[active % TONES.length]} image={current.image}>
          <span className="kicker kicker--flash">{t("case", { nr })}</span>
          {current.title && <h3>{current.title}</h3>}
          {current.description && <p>{current.description}</p>}
          <div className="cases__controls">
            <button type="button" className="cases__step" onClick={() => step(-1)} aria-label={t("prev")}>
              ‹
            </button>
            <button type="button" className="cases__step" onClick={() => step(1)} aria-label={t("next")}>
              ›
            </button>
            <div className="cases__dots">
              {cases.map((c, i) => (
                <button
                  key={i}
                  type="button"
                  className="cases__dot"
                  aria-current={i === active || undefined}
                  aria-label={c.title}
                  onClick={() => setActive(i)}
                />
              ))}
            </div>
          </div>
        </SplitPane>
      </div>
    </section>
  );
}
