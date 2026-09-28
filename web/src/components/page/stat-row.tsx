import { CountUp } from "@/components/home/count-up";
import { PointerGlow } from "@/components/home/pointer-glow";
import { Reveal } from "@/components/motion/reveal";
import { stagger } from "@/components/motion/stagger";
import type { CustomerLogo, StatTile } from "@/lib/sanity/home";
import { LogoSlider } from "@/components/logo-slider";
import { BandHead } from "@/components/home/band-head";

type Band = { kicker?: string; headline?: string; lede?: string };

/** Kennzahlen-Band einer Unterseite – gleiche Kacheln wie auf der Startseite. */
export function StatRow({
  tiles,
  band,
  logos = [],
  logosLabel,
}: {
  tiles: StatTile[];
  band?: Band;
  logos?: CustomerLogo[];
  logosLabel?: string;
}) {
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
        <Reveal delay={stagger(tiles.length)}>
          <LogoSlider label={logosLabel} logos={logos} />
        </Reveal>
      </div>
    </section>
  );
}
