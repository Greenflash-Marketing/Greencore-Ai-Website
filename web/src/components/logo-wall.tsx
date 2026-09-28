import Image from "next/image";
import type { TaggedLogo } from "@/lib/sanity/logos";

const MARK_H = 26;

export type LogoCategory = { tag: string; label: string };

/**
 * Herstellerlogos je Komponententyp: eine Zeile pro Kategorie, jede als
 * endlos laufendes Band. Benachbarte Zeilen laufen gegeneinander und langsam
 * (46 s pro Durchlauf), damit vier Baender zusammen nicht unruhig wirken.
 *
 * Bewusst ohne JavaScript: Die Bewegung ist eine CSS-Animation, die bei
 * "Bewegung reduzieren" entfaellt und beim Ueberfahren anhaelt. Das Band ist
 * doppelt im Markup – die zweite Haelfte ist die nahtlose Fortsetzung und
 * damit fuer Screenreader ausgeblendet.
 */
export function LogoWall({
  categories,
  logos,
}: {
  categories: LogoCategory[];
  logos: TaggedLogo[];
}) {
  const rows = categories
    .map((category) => ({
      ...category,
      items: logos.filter((logo) => logo.tags.includes(category.tag)),
    }))
    .filter((row) => row.items.length > 0);

  if (!rows.length) return null;

  return (
    <div className="logowall">
      {rows.map((row, index) => (
        <div className="logowall__row" key={row.tag}>
          <span className="logowall__label">{row.label}</span>
          <div className="logowall__rail">
            <div className="logowall__track" data-reverse={index % 2 === 1 || undefined}>
              <Run items={row.items} />
              <Run items={row.items} duplicate />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function Run({ items, duplicate }: { items: TaggedLogo[]; duplicate?: boolean }) {
  return (
    <div className="logowall__run" aria-hidden={duplicate || undefined}>
      {items.map((logo) => (
        <Image
          key={logo.url}
          src={logo.url}
          alt={duplicate ? "" : logo.name}
          width={Math.round((MARK_H * logo.width) / logo.height)}
          height={MARK_H}
          unoptimized
        />
      ))}
    </div>
  );
}
