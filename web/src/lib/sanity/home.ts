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

export type StatsBand = { kicker?: string; headline?: string };

export type StatTile = { value: string; unit?: string; label?: string };

export type SoftwareInsights = { kicker?: string; headline?: string; lede?: string };

export type HomePage = {
  hero?: HomeHero;
  logos?: CustomerLogo[];
  statsBand?: StatsBand;
  statTiles?: StatTile[];
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
