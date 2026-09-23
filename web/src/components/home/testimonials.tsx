import Image from "next/image";
import type { BandHead as BandHeadData, Testimonial } from "@/lib/sanity/home";
import { BandHead } from "./band-head";

/** 6 — Referenz-Testimonials. Ohne freigegebene Zitate fällt der Abschnitt weg. */
export function Testimonials({ band, items }: { band?: BandHeadData; items: Testimonial[] }) {
  if (!items.length) return null;
  return (
    <section className="band band--silver" id="referenzen" data-surface="silver">
      <div className="band__inner">
        <BandHead {...band} />
        <div className="quotes">
          {items.map((item, i) => (
            <figure key={i} className="card quote-card">
              <blockquote className="quote">{item.quote}</blockquote>
              <figcaption className="quote__person">
                {item.photo && (
                  <Image
                    src={item.photo}
                    alt=""
                    width={64}
                    height={64}
                    className="quote__photo"
                  />
                )}
                <span>
                  <strong>{item.personName}</strong>
                  {item.personRole && <span className="quote__role">{item.personRole}</span>}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
