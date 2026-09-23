import Image from "next/image";
import type { Compatibility as CompatibilityData } from "@/lib/sanity/home";
import { BandHead } from "./band-head";

/**
 * 3b — Herstellerunabhängigkeit: Greencore AI als Softwareschicht über dem
 * Bestand. Unter dem Text steht genau ein Bild (z. B. die Wand kompatibler
 * Hersteller) – solange es fehlt, eine klar erkennbare Attrappe.
 */
export function Compatibility({ kicker, headline, lede, media }: CompatibilityData) {
  if (!headline) return null;
  return (
    <section className="band band--silver-card" id="kompatibilitaet" data-surface="silver">
      <div className="band__inner">
        <BandHead kicker={kicker} headline={headline} />
        {lede && <p className="band__lede">{lede}</p>}
        {media ? (
          <Image src={media} alt="" width={1080} height={320} className="compat__media" />
        ) : (
          <div className="compat__media compat__media--dummy" aria-hidden="true">
            <span>Attrappe · Bild folgt</span>
          </div>
        )}
      </div>
    </section>
  );
}
