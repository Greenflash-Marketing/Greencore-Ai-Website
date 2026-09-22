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

export type ClaimBand = { kicker?: string; claim?: string; lede?: string };

export type SoftwareInsights = { kicker?: string; headline?: string; lede?: string };

export type HomePage = {
  hero?: HomeHero;
  logos?: CustomerLogo[];
  claimBand?: ClaimBand;
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
  "claimBand": claimBand{ ${t("kicker")}, ${t("claim")}, ${t("lede")} },
  "softwareInsights": softwareInsights{ ${t("kicker")}, ${t("headline")}, ${t("lede")} },
  "zoomScreenshot": hero.softwareScreenshotEntry.asset->url,
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
