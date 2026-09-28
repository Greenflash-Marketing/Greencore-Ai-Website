import Image from "next/image";
import type { CustomerLogo } from "@/lib/sanity/home";

/**
 * Referenzlogos unter den Kennzahlen: Beschriftung zweizeilig links, Logos
 * laufen rechts daneben durch. Spart Hoehe gegenueber der frueheren Loesung
 * mit Beschriftung ueber den Logos.
 */
export function LogoSlider({ label, logos }: { label?: string; logos: CustomerLogo[] }) {
  if (!logos.length) return null;
  return (
    <div className="logoslider">
      {label && <span className="logoslider__label">{label}</span>}
      <div className="logoslider__rail">
        <div className="logoslider__track">
          {[0, 1].map((run) => (
            <div className="logoslider__run" key={run} aria-hidden={run === 1 || undefined}>
              {logos.map((logo, i) => (
                <Image
                  key={`${run}-${i}`}
                  src={logo.url}
                  alt={run === 0 ? logo.name : ""}
                  width={Math.round((26 * logo.width) / logo.height)}
                  height={26}
                  unoptimized
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
