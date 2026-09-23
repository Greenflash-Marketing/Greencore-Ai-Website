import { sanityClient } from "./client";

const t = (field: string) => `"${field}": coalesce(${field}[$locale], ${field}.de)`;

export type AboutPage = {
  kicker?: string;
  headline?: string;
  lede?: string;
  visionMissionValueProp?: unknown;
  positioning?: { from?: string; to?: string }[];
  principles?: { title?: string; text?: string }[];
  greenflash?: unknown;
};

export type DemoPage = {
  headline?: string;
  intro?: string;
  steps?: { title?: string; description?: string }[];
  ctaLabel?: string;
};

export function getAboutPage(locale: string) {
  return sanityClient.fetch<AboutPage | null>(
    `*[_id == "aboutPage"][0]{
      ${t("kicker")}, ${t("headline")}, ${t("lede")},
      "visionMissionValueProp": coalesce(visionMissionValueProp[$locale], visionMissionValueProp.de),
      "positioning": positioning[]{ ${t("from")}, ${t("to")} },
      "principles": principles[]{ ${t("title")}, ${t("text")} },
      "greenflash": coalesce(greenflash[$locale], greenflash.de)
    }`,
    { locale },
  );
}

export function getDemoPage(locale: string) {
  return sanityClient.fetch<DemoPage | null>(
    `*[_id == "demoPage"][0]{
      ${t("headline")}, ${t("intro")}, ${t("ctaLabel")},
      "steps": steps[]{ ${t("title")}, ${t("description")} }
    }`,
    { locale },
  );
}
