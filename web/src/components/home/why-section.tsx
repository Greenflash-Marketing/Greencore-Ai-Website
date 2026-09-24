import { PortableText } from "next-sanity";
import type { PortableTextBlock } from "next-sanity";
import type { WhySection as WhySectionData } from "@/lib/sanity/home";
import { Reveal } from "@/components/motion/reveal";
import { stagger } from "@/components/motion/stagger";
import { BandHead } from "./band-head";
import { CardDiagram } from "./platform-diagram";

/**
 * 7 — Warum Greencore AI: Gegenüberstellung von klassischem Energiemanagement
 * und Plattform, mit Grafik und je vier Punkten samt Erklärung.
 */
export function WhySection({ kicker, headline, body, compare }: WhySectionData) {
  if (!headline && !compare) return null;
  const classic = compare?.classicItems ?? [];
  const ours = compare?.ourItems ?? [];

  return (
    <section className="band band--silver-card" id="ueber" data-surface="silver">
      <div className="band__inner">
        <BandHead kicker={kicker} headline={headline} />
        {body ? (
          <Reveal className="band__lede prose" delay={stagger(1)}>
            <PortableText value={body as PortableTextBlock[]} />
          </Reveal>
        ) : null}

        {compare && (
          <div className="grid-2">
            <Reveal className="card" delay={stagger(0)}>
              <CardDiagram />
              <span className="card__tag">{compare.classicTitle}</span>
              <dl className="compare">
                {classic.map((p, i) => (
                  <div key={i}>
                    <dt>{p.title}</dt>
                    <dd>{p.text}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
            <Reveal className="card card--dark" delay={stagger(1)}>
              <CardDiagram connected />
              <span className="card__tag">{compare.ourTitle}</span>
              <dl className="compare">
                {ours.map((p, i) => (
                  <div key={i}>
                    <dt>{p.title}</dt>
                    <dd>{p.text}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        )}
      </div>
    </section>
  );
}
