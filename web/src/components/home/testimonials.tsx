import Image from "next/image";
import type { BandHead as BandHeadData, Testimonial } from "@/lib/sanity/home";
import { BandHead } from "./band-head";

/** Porträt-Platzhalter, solange kein Foto in Sanity liegt. */
function AvatarFallback() {
  return (
    <svg viewBox="0 0 96 96" aria-hidden="true">
      <rect width="96" height="96" fill="#dce6ed" />
      <circle cx="48" cy="36" r="16" fill="#bacad4" />
      <path d="M13 96c0-19 15-29 35-29s35 10 35 29z" fill="#bacad4" />
    </svg>
  );
}

/** 6 — Referenz-Testimonials: Kundenlogo über dem Zitat, Porträt darunter. */
export function Testimonials({ band, items }: { band?: BandHeadData; items: Testimonial[] }) {
  if (!items.length) return null;
  return (
    <section className="band band--silver" id="referenzen" data-surface="silver">
      <div className="band__inner">
        <BandHead {...band} />
        <div className="grid-2">
          {items.map((item, i) => (
            <figure key={i} className="card">
              {item.logo && (
                <div className="quote__logo">
                  <Image src={item.logo} alt={item.personRole ?? ""} width={120} height={26} unoptimized />
                </div>
              )}
              <blockquote className="quote">{item.quote}</blockquote>
              <figcaption className="quote__person">
                <div className="quote__photo">
                  {item.photo ? (
                    <Image src={item.photo} alt="" width={96} height={96} />
                  ) : (
                    <AvatarFallback />
                  )}
                </div>
                <div>
                  <div className="quote__name">{item.personName}</div>
                  {item.personRole && <div className="quote__role">{item.personRole}</div>}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
