import Image from "next/image";
import type { EuropeBand as EuropeBandData } from "@/lib/sanity/home";
import { Reveal } from "@/components/motion/reveal";
import { stagger } from "@/components/motion/stagger";

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
        <Reveal>
          {kicker && <span className="kicker kicker--flash">{kicker}</span>}
          <p className="slab__claim">{claim}</p>
        </Reveal>
        {lede && (
          <Reveal as="p" className="slab__lede" delay={stagger(1)}>
            {lede}
          </Reveal>
        )}
        {facts.length > 0 && (
          <Reveal className="euro__facts" delay={stagger(2)}>
            {facts.map((f, i) => (
              <div key={i}>
                <strong>{f.title}</strong>
                <span>{f.text}</span>
              </div>
            ))}
          </Reveal>
        )}
      </div>
    </section>
  );
}
