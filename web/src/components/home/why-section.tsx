import { PortableText } from "next-sanity";
import type { PortableTextBlock } from "next-sanity";
import type { WhySection as WhySectionData } from "@/lib/sanity/home";
import { BandHead } from "./band-head";

/**
 * 7 — Warum Greencore AI: Gegenüberstellung von klassischem Energiemanagement
 * und Plattform. Heller Kartenton nach der Hell/Dunkel-Logik der Seite.
 */
export function WhySection({ kicker, headline, body, compare }: WhySectionData) {
  if (!headline && !compare) return null;
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
          <div className="grid-2">
            <div className="card">
              <span className="card__tag">{compare.classicTitle}</span>
              <ul className="feature-list feature-list--tight">
                {compare.classicPoints?.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
            <div className="card card--dark">
              <span className="card__tag">{compare.ourTitle}</span>
              <ul className="feature-list feature-list--tight">
                {compare.ourPoints?.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
