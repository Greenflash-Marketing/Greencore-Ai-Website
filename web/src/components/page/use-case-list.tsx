import { Reveal } from "@/components/motion/reveal";
import { stagger } from "@/components/motion/stagger";
import { MediaDummy } from "./media-dummy";

type Item = { title?: string; description?: string; image?: string };

/**
 * Anwendungsfälle eines Moduls: abwechselnd Text links und rechts, damit die
 * Liste bei vier Fällen nicht monoton wird.
 */
export function UseCaseList({
  kicker,
  headline,
  items,
}: {
  kicker?: string;
  headline?: string;
  items: Item[];
}) {
  if (!items.length) return null;
  return (
    <section className="band band--silver-card" id="anwendungsfaelle" data-surface="silver">
      <div className="band__inner band__inner--wide">
        <Reveal className="band__head">
          {kicker && <span className="kicker">{kicker}</span>}
          {headline && <h2 className="band__title">{headline}</h2>}
        </Reveal>
        <div className="usecases">
          {items.map((item, i) => (
            <Reveal key={i} as="article" className="usecase" data-flip={i % 2 === 1 || undefined} delay={stagger(i)}>
              <div className="usecase__text">
                <span className="usecase__idx">{String(i + 1).padStart(2, "0")}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
              <div className="usecase__visual">
                <MediaDummy label={`Attrappe · ${item.title ?? "Ansicht"}`} ratio="4 / 3" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
