import { CountUp } from "@/components/home/count-up";
import { PointerGlow } from "@/components/home/pointer-glow";
import { Reveal } from "@/components/motion/reveal";
import { stagger } from "@/components/motion/stagger";
import type { StatTile } from "@/lib/sanity/home";
import { BandHead } from "@/components/home/band-head";

type Band = { kicker?: string; headline?: string; lede?: string };

/** Kennzahlen-Band einer Unterseite – gleiche Kacheln wie auf der Startseite. */
export function StatRow({ tiles, band }: { tiles: StatTile[]; band?: Band }) {
  if (!tiles.length) return null;
  return (
    <section className="band band--dark dark" data-surface="dark">
      <div className="band__inner">
        <PointerGlow selector=".stat" />
        <BandHead kicker={band?.kicker} headline={band?.headline} flash />
        {band?.lede && (
          <Reveal as="p" className="band__lede">
            {band.lede}
          </Reveal>
        )}
        <div className="stats">
          {tiles.map((tile, i) => (
            <Reveal key={i} className="stat" delay={stagger(i)}>
              <div className="stat__value">
                <CountUp value={tile.value} />
                {tile.unit && <span className="stat__unit"> {tile.unit}</span>}
              </div>
              {tile.label && <p className="stat__label">{tile.label}</p>}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
