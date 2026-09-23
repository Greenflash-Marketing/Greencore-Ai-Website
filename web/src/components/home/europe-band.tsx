import Image from "next/image";
import type { EuropeBand as EuropeBandData } from "@/lib/sanity/home";

/** 6b — Europa: die Vision über dem Tagesgeschäft. */
export function EuropeBand({ kicker, claim, lede, facts = [] }: EuropeBandData) {
  if (!claim) return null;
  return (
    <section className="band band--ultra euro dark" id="europa" data-surface="dark">
      <Image
        src="/keyvisual-europa.webp"
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        className="euro__visual"
      />
      <div className="band__inner euro__inner">
        {kicker && <span className="kicker kicker--flash">{kicker}</span>}
        <p className="slab__claim">{claim}</p>
        {lede && <p className="slab__lede">{lede}</p>}
        {facts.length > 0 && (
          <div className="euro__facts">
            {facts.map((f, i) => (
              <div key={i}>
                <strong>{f.title}</strong>
                <span>{f.text}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
