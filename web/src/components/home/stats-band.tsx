import type { StatTile, StatsBand as StatsBandData } from "@/lib/sanity/home";
import { CountUp } from "./count-up";
import { PointerGlow } from "./pointer-glow";

/** Dunkelgrünes Band direkt nach dem Header: die Kennzahlen in Glaskacheln. */
export function StatsBand({ band, tiles }: { band?: StatsBandData; tiles: StatTile[] }) {
  if (!tiles.length) return null;
  return (
    <section className="band band--dark dark" data-surface="dark">
      <div className="band__inner">
        {band?.kicker && <span className="kicker kicker--flash">{band.kicker}</span>}
        {band?.headline && <h2 className="band__title">{band.headline}</h2>}
        <PointerGlow selector=".stat" />
        <div className="stats">
          {tiles.map((tile, i) => (
            <div key={i} className="stat">
              <div className="stat__value">
                <CountUp value={tile.value} />
                {tile.unit && <span className="stat__unit"> {tile.unit}</span>}
              </div>
              {tile.label && <p className="stat__label">{tile.label}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
