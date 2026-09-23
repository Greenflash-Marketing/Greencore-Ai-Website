import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { CmsLink } from "@/components/cms-link";
import type { FinalCta as FinalCtaData } from "@/lib/sanity/home";

/** 8 — Abschluss-CTA: gläserner Banner vor Keyvisual mit zentrierter Bildmarke. */
export function FinalCta({
  headline,
  lede,
  ctaLabel,
  ctaHref,
  ctaSecondaryLabel,
  ctaSecondaryHref,
}: FinalCtaData) {
  if (!headline) return null;
  return (
    <section className="band cta-band dark" id="demo" data-surface="dark">
      {/* Keyvisual: Europakarte mit vernetzter Bildmarke in der Mitte */}
      <Image
        src="/keyvisual-europa.webp"
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        className="cta-band__visual"
        priority={false}
      />
      <div className="band__inner cta-band__inner">
        {headline && <h2 className="band__title">{headline}</h2>}
        {lede && <p className="band__lede">{lede}</p>}
        <div className="cta-band__actions">
          {ctaLabel && ctaHref && (
            <CmsLink href={ctaHref} className={buttonVariants({ size: "lg" })}>
              {ctaLabel}
            </CmsLink>
          )}
          {ctaSecondaryLabel && ctaSecondaryHref && (
            <CmsLink href={ctaSecondaryHref} className={buttonVariants({ variant: "outline", size: "lg" })}>
              {ctaSecondaryLabel}
            </CmsLink>
          )}
        </div>
      </div>
    </section>
  );
}
