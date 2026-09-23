import type { BandHead as BandHeadData } from "@/lib/sanity/home";

/** Kicker + Headline über einem Abschnitt – gleiche Anmutung in allen Bändern. */
export function BandHead({ kicker, headline, flash }: BandHeadData & { flash?: boolean }) {
  if (!kicker && !headline) return null;
  return (
    <div className="band__head">
      {kicker && <span className={flash ? "kicker kicker--flash" : "kicker"}>{kicker}</span>}
      {headline && <h2 className="band__title">{headline}</h2>}
    </div>
  );
}
