"use client";

import { useState } from "react";
import { PortableText } from "next-sanity";
import type { PortableTextBlock } from "next-sanity";
import type { BandHead as BandHeadData, SolutionModule } from "@/lib/sanity/home";
import { Reveal } from "@/components/motion/reveal";
import { BandHead } from "./band-head";
import { SplitPane } from "./split-pane";

const TONES = ["ultra", "flash", "lilac"] as const;
const MOCKS = ["bars", "peak", "spot"] as const;

/** 4 — Lösungen im Tab-Menü: Simulation, Optimierung, Energiehandel. */
export function SolutionTabs({ band, modules }: { band?: BandHeadData; modules: SolutionModule[] }) {
  const [active, setActive] = useState(0);
  if (!modules.length) return null;
  const current = modules[active];

  return (
    <section className="band band--silver" data-surface="silver">
      <div className="band__inner band__inner--wide">
        <BandHead {...band} />

        <Reveal className="tabs" role="tablist" aria-label={band?.headline} delay={0.07}>
          {modules.map((mod, i) => (
            <button
              key={i}
              role="tab"
              id={`tab-${i}`}
              aria-controls={`panel-${i}`}
              aria-selected={i === active}
              tabIndex={i === active ? 0 : -1}
              onClick={() => setActive(i)}
            >
              {mod.title}
            </button>
          ))}
        </Reveal>

        <div role="tabpanel" id={`panel-${active}`} aria-labelledby={`tab-${active}`}>
          <SplitPane tone={TONES[active % TONES.length]} image={current.image} mock={MOCKS[active % MOCKS.length]}>
            {current.kicker && <span className="kicker kicker--flash">{current.kicker}</span>}
            {current.headline && <h3>{current.headline}</h3>}
            {current.body ? <PortableText value={current.body as PortableTextBlock[]} /> : null}
            {current.features && (
              <ul className="feature-list">
                {current.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            )}
          </SplitPane>
        </div>
      </div>
    </section>
  );
}
