import { PortableText } from "next-sanity";
import type { PortableTextBlock } from "next-sanity";
import type { WhySection as WhySectionData } from "@/lib/sanity/home";

/** 7 — Warum Greencore AI: Abgrenzung Energieplattform vs. Energiemanagement. */
export function WhySection({ headline, body }: WhySectionData) {
  if (!headline && !body) return null;
  return (
    <section className="band band--dark dark" id="ueber" data-surface="dark">
      <div className="band__inner">
        {headline && <h2 className="band__title">{headline}</h2>}
        {body ? (
          <div className="band__lede prose">
            <PortableText value={body as PortableTextBlock[]} />
          </div>
        ) : null}
      </div>
    </section>
  );
}
