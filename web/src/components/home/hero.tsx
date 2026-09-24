import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { CmsLink } from "@/components/cms-link";
import type { CustomerLogo, HomeHero } from "@/lib/sanity/home";
import { HeroHeadline } from "./hero-headline";
import { AutoplayWindow } from "./autoplay-window";

/** 1 — Header: Silberfläche, Verlaufs-Headline, laufendes Software-Fenster, Kundenlogos. */
export function Hero({ hero, logos = [] }: { hero: HomeHero; logos?: CustomerLogo[] }) {
  return (
    <section className="hero band--silver" data-surface="silver">
      <div className="hero__stage">
        <div className="hero__inner">
          <div className="hero__grid">
            <div className="hero__text">
              {hero.headline && <HeroHeadline>{hero.headline}</HeroHeadline>}
              {hero.subline && <p className="hero__sub">{hero.subline}</p>}
              <div className="hero__ctas">
                {hero.ctaPrimaryLabel && hero.ctaPrimaryHref && (
                  <CmsLink href={hero.ctaPrimaryHref} className={buttonVariants()}>
                    {hero.ctaPrimaryLabel}
                  </CmsLink>
                )}
                {hero.ctaSecondaryLabel && hero.ctaSecondaryHref && (
                  <CmsLink href={hero.ctaSecondaryHref} className={buttonVariants({ variant: "outline" })}>
                    {hero.ctaSecondaryLabel}
                  </CmsLink>
                )}
              </div>
            </div>
            <AutoplayWindow />
          </div>
        </div>
      </div>

      {logos.length > 0 && (
        <div className="logos">
          <div className="hero__inner">
            {hero.logosLabel && <span className="logos__label">{hero.logosLabel}</span>}
            <div className="logos__track-wrap">
              <div className="logos__track">
                {/* zweimal hintereinander für die Endlosschleife; die Kopie ist stumm */}
                {[...logos, ...logos].map((logo, i) => (
                  <Image
                    key={i}
                    src={logo.url}
                    alt={i < logos.length ? logo.name : ""}
                    aria-hidden={i >= logos.length || undefined}
                    width={Math.round((26 * logo.width) / logo.height)}
                    height={26}
                    unoptimized
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
