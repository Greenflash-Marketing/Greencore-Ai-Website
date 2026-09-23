import type { BandHead as BandHeadData, FaqItem } from "@/lib/sanity/home";
import { BandHead } from "./band-head";

/** 9 — FAQ. Native <details>: auf- und zuklappen ohne eigenes JavaScript. */
export function Faq({ band, items }: { band?: BandHeadData; items: FaqItem[] }) {
  if (!items.length) return null;
  return (
    <section className="band band--silver" id="faq" data-surface="silver">
      <div className="band__inner">
        <BandHead {...band} />
        <div className="faq">
          {items.map((item, i) => (
            <details key={i} name="faq" open={i === 0}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
