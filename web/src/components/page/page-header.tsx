import type { ReactNode } from "react";

/** Kopf jeder Unterseite – gleiche Anmutung wie der Hero, nur ruhiger. */
export function PageHeader({
  kicker,
  headline,
  lede,
  children,
}: {
  kicker?: string;
  headline?: string;
  lede?: string;
  children?: ReactNode;
}) {
  return (
    <section className="band band--silver page-header" data-surface="silver">
      <div className="band__inner">
        {kicker && <span className="kicker">{kicker}</span>}
        {headline && <h1 className="page-header__title">{headline}</h1>}
        {lede && <p className="page-header__lede">{lede}</p>}
        {children}
      </div>
    </section>
  );
}
