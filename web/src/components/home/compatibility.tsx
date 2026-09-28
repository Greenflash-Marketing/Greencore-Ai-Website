import Image from "next/image";
import type { Compatibility as CompatibilityData } from "@/lib/sanity/home";
import type { TaggedLogo } from "@/lib/sanity/logos";
import { Reveal } from "@/components/motion/reveal";
import { stagger } from "@/components/motion/stagger";
import { LogoWall, type LogoCategory } from "@/components/logo-wall";
import { BandHead } from "./band-head";

/**
 * 3b — Herstellerunabhängigkeit: Greencore AI als Softwareschicht über dem
 * Bestand. Unter dem Text steht genau ein Bild (z. B. die Wand kompatibler
 * Hersteller) – solange es fehlt, eine klar erkennbare Attrappe.
 * Die Logo-Zeile mit Tag-Zyklus erscheint auch ohne CMS-Headline.
 */
export function Compatibility({
  kicker,
  headline,
  lede,
  media,
  worksWith,
  categories = [],
  logos = [],
}: CompatibilityData & {
  worksWith: string;
  categories?: LogoCategory[];
  logos?: TaggedLogo[];
}) {
  return (
    <section className="band band--silver-card" id="kompatibilitaet" data-surface="silver">
      <div className="band__inner">
        <BandHead kicker={kicker} headline={headline} />
        {lede && (
          <Reveal as="p" className="band__lede" delay={stagger(1)}>
            {lede}
          </Reveal>
        )}
        <Reveal delay={stagger(lede ? 2 : 1)}>
          <p className="logowall__intro">{worksWith}</p>
          <LogoWall categories={categories} logos={logos} />
        </Reveal>
        {media ? (
          <Reveal delay={stagger(3)}>
            <Image src={media} alt="" width={1080} height={320} className="compat__media" />
          </Reveal>
        ) : (
          <Reveal
            className="compat__media compat__media--dummy"
            aria-hidden="true"
            delay={stagger(3)}
          >
            <span>Attrappe · Bild folgt</span>
          </Reveal>
        )}
      </div>
    </section>
  );
}
