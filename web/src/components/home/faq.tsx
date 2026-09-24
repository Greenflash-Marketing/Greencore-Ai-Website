import type { BandHead as BandHeadData, FaqItem } from "@/lib/sanity/home";
import { Reveal } from "@/components/motion/reveal";
import { BandHead } from "./band-head";

/** 9 — FAQ. Native <details>: auf- und zuklappen ohne eigenes JavaScript. */
export function Faq({ band, items }: { band?: BandHeadData; items: FaqItem[] }) {
  if (!items.length) return null;
  return (
    <section className="band band--silver" id="faq" data-surface="silver">
      <div className="band__inner">
        <BandHead {...band} />
        <Reveal className="faq" delay={0.07}>
          {items.map((item, i) => (
            <details key={i} name="faq" open={i === 0}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
