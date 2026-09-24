import type { StatTile, StatsBand as StatsBandData } from "@/lib/sanity/home";
import { Reveal } from "@/components/motion/reveal";
import { stagger } from "@/components/motion/stagger";
import { CountUp } from "./count-up";
import { PointerGlow } from "./pointer-glow";

/** Dunkelgrünes Band direkt nach dem Header: die Kennzahlen in Glaskacheln. */
export function StatsBand({ band, tiles }: { band?: StatsBandData; tiles: StatTile[] }) {
  if (!tiles.length) return null;
  return (
    <section className="band band--dark dark" data-surface="dark">
      <div className="band__inner">
        {(band?.kicker || band?.headline) && (
          <Reveal className="band__head">
            {band?.kicker && <span className="kicker kicker--flash">{band.kicker}</span>}
            {band?.headline && <h2 className="band__title">{band.headline}</h2>}
          </Reveal>
        )}
        {band?.lede && (
          <Reveal as="p" className="band__lede" delay={stagger(1)}>
            {band.lede}
          </Reveal>
        )}
        <PointerGlow selector=".stat" />
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
