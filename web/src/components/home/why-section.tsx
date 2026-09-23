import { PortableText } from "next-sanity";
import type { PortableTextBlock } from "next-sanity";
import type { WhySection as WhySectionData } from "@/lib/sanity/home";
import { BandHead } from "./band-head";
import { PlatformDiagram } from "./platform-diagram";

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
          <div className="band__lede prose">
            <PortableText value={body as PortableTextBlock[]} />
          </div>
        ) : null}

        {compare && (
          <>
            <PlatformDiagram
              labels={{
                left: compare.classicTitle ?? "",
                right: compare.ourTitle ?? "",
              }}
            />
            <div className="grid-2">
              <div className="card">
                <span className="card__tag">{compare.classicTitle}</span>
                <dl className="compare">
                  {classic.map((p, i) => (
                    <div key={i}>
                      <dt>{p.title}</dt>
                      <dd>{p.text}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div className="card card--dark">
                <span className="card__tag">{compare.ourTitle}</span>
                <dl className="compare">
                  {ours.map((p, i) => (
                    <div key={i}>
                      <dt>{p.title}</dt>
                      <dd>{p.text}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
