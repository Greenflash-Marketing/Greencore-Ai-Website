import type { ClaimBand as ClaimBandData } from "@/lib/sanity/home";

/** Ultra-dunkles Band: eine Kernaussage (Brand-Bundle: seltene Akzentfläche). */
export function ClaimBand({ kicker, claim, lede }: ClaimBandData) {
  if (!claim) return null;
  return (
    <section className="band band--ultra dark" data-surface="dark">
      <div className="band__inner">
        {kicker && <span className="kicker kicker--flash">{kicker}</span>}
        <p className="slab__claim">{claim}</p>
        {lede && <p className="slab__lede">{lede}</p>}
      </div>
    </section>
  );
}
