import { CountUp } from "@/components/home/count-up";
import { PointerGlow } from "@/components/home/pointer-glow";
import type { StatTile } from "@/lib/sanity/home";

/** Kennzahlen-Band einer Unterseite – gleiche Kacheln wie auf der Startseite. */
export function StatRow({ tiles }: { tiles: StatTile[] }) {
  if (!tiles.length) return null;
  return (
    <section className="band band--dark dark" data-surface="dark">
      <div className="band__inner">
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
