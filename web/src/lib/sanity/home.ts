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

export type HomePage = { hero?: HomeHero; logos?: CustomerLogo[] };

// Übersetzte Felder: gewünschte Sprache, sonst Deutsch als Rückfall
const t = (field: string) => `"${field}": coalesce(${field}[$locale], ${field}.de)`;

const homeQuery = `*[_id == "homePage"][0]{
  "hero": hero{
    ${t("kicker")}, ${t("headline")}, ${t("subline")},
    ${t("ctaPrimaryLabel")}, ctaPrimaryHref,
    ${t("ctaSecondaryLabel")}, ctaSecondaryHref,
    ${t("logosLabel")}
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
