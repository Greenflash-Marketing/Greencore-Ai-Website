import { sanityClient } from "./client";

export type HomeHero = {
  kicker?: string;
  headline?: string;
  subline?: string;
  ctaPrimaryLabel?: string;
  ctaPrimaryHref?: string;
  ctaSecondaryLabel?: string;
  ctaSecondaryHref?: string;
  logosLabel?: string;
};

export type CustomerLogo = { name: string; url: string; width: number; height: number };

export type BandHead = { kicker?: string; headline?: string };
export type StatsBand = BandHead;

export type SolutionModule = {
  title?: string;
  kicker?: string;
  headline?: string;
  body?: unknown;
  features?: string[];
  image?: string;
};

export type UseCase = { title?: string; description?: string; image?: string };

export type Testimonial = {
  quote?: string;
  personName?: string;
  personRole?: string;
  photo?: string;
};

export type WhySection = { headline?: string; body?: unknown };

export type FaqItem = { question?: string; answer?: string };

export type FinalCta = {
  headline?: string;
  lede?: string;
  ctaLabel?: string;
  ctaHref?: string;
  ctaSecondaryLabel?: string;
  ctaSecondaryHref?: string;
};

export type StatTile = { value: string; unit?: string; label?: string };

export type SoftwareInsights = { kicker?: string; headline?: string; lede?: string };

export type HomePage = {
  hero?: HomeHero;
  logos?: CustomerLogo[];
  statsBand?: StatsBand;
  statTiles?: StatTile[];
  solutionsBand?: BandHead;
  solutions?: SolutionModule[];
  useCasesBand?: BandHead;
  useCases?: UseCase[];
  testimonialsBand?: BandHead;
  testimonials?: Testimonial[];
  whySection?: WhySection;
  faqBand?: BandHead;
  faq?: FaqItem[];
  finalCta?: FinalCta;
  softwareInsights?: SoftwareInsights;
  /** Vollflächiger Software-Screenshot als Zoom-Ziel (optional) */
  zoomScreenshot?: string;
};

// Übersetzte Felder: gewünschte Sprache, sonst Deutsch als Rückfall
const t = (field: string) => `"${field}": coalesce(${field}[$locale], ${field}.de)`;

const homeQuery = `*[_id == "homePage"][0]{
  "hero": hero{
    ${t("kicker")}, ${t("headline")}, ${t("subline")},
    ${t("ctaPrimaryLabel")}, ctaPrimaryHref,
    ${t("ctaSecondaryLabel")}, ctaSecondaryHref,
    ${t("logosLabel")}
  },
  "statsBand": statsBand{ ${t("kicker")}, ${t("headline")} },
  "statTiles": statTiles[defined(value)]{ value, unit, ${t("label")} },
  "softwareInsights": softwareInsights{ ${t("kicker")}, ${t("headline")}, ${t("lede")} },
  "zoomScreenshot": hero.softwareScreenshotEntry.asset->url,
  "solutionsBand": solutionsBand{ ${t("kicker")}, ${t("headline")} },
  "solutions": solutionTabs[]->{
    ${t("title")}, ${t("kicker")},
    "headline": coalesce(shortDescription[$locale], shortDescription.de),
    "body": coalesce(body[$locale], body.de),
    "features": subFeatures[]{"t": coalesce(title[$locale], title.de)}.t,
    "image": softwareShowcase[0].asset->url
  },
  "useCasesBand": useCasesBand{ ${t("kicker")}, ${t("headline")} },
  "useCases": useCases[]{ ${t("title")}, ${t("description")}, "image": media[0].asset->url },
  "testimonialsBand": testimonialsBand{ ${t("kicker")}, ${t("headline")} },
  "testimonials": testimonials[defined(quote)]{
    "quote": coalesce(quote[$locale], quote.de),
    personName, personRole, "photo": personPhoto.asset->url
  },
  "whySection": whySection{ ${t("headline")}, "body": coalesce(body[$locale], body.de) },
  "faqBand": faqBand{ ${t("kicker")}, ${t("headline")} },
  "faq": faq[]{ ${t("question")}, ${t("answer")} },
  "finalCta": finalCta{
    ${t("headline")}, ${t("lede")}, ${t("ctaLabel")}, ctaHref,
    ${t("ctaSecondaryLabel")}, ctaSecondaryHref
  },
  "logos": logoSlider[defined(logo.asset)]{
    name,
    "url": logo.asset->url,
    "width": logo.asset->metadata.dimensions.width,
    "height": logo.asset->metadata.dimensions.height
  }
}`;

export function getHomePage(locale: string) {
  return sanityClient.fetch<HomePage | null>(homeQuery, { locale });
}
