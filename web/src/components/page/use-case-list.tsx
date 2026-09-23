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
        <div className="band__head">
          {kicker && <span className="kicker">{kicker}</span>}
          {headline && <h2 className="band__title">{headline}</h2>}
        </div>
        <div className="usecases">
          {items.map((item, i) => (
            <article key={i} className="usecase" data-flip={i % 2 === 1 || undefined}>
              <div className="usecase__text">
                <span className="usecase__idx">{String(i + 1).padStart(2, "0")}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
              <div className="usecase__visual">
                <MediaDummy label={`Attrappe · ${item.title ?? "Ansicht"}`} ratio="4 / 3" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
