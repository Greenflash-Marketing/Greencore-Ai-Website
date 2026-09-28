import { sanityClient } from "./client";

const t = (field: string) => `"${field}": coalesce(${field}[$locale], ${field}.de)`;

export type Section = { kicker?: string; headline?: string; body?: string };

export type AboutPage = {
  kicker?: string;
  headline?: string;
  lede?: string;
  intro?: {
    kicker?: string;
    headline?: string;
    lead?: string;
    points?: { title?: string; text?: string }[];
    body?: unknown;
  };
  visionMissionValueProp?: unknown;
  positioning?: { from?: string; to?: string }[];
  principles?: { title?: string; text?: string }[];
  greenflash?: unknown;
};

export type DemoPage = {
  kicker?: string;
  headline?: string;
  intro?: string;
  formNote?: string;
  steps?: { title?: string; description?: string }[];
  demoSection?: Section;
  overview?: Section;
  urgency?: Section;
  ctaLabel?: string;
};

export function getAboutPage(locale: string) {
  return sanityClient.fetch<AboutPage | null>(
    `*[_id == "aboutPage"][0]{
      ${t("kicker")}, ${t("headline")}, ${t("lede")},
      "intro": intro{ ${t("kicker")}, ${t("headline")}, ${t("lead")},
        "points": points[]{ ${t("title")}, ${t("text")} },
        "body": coalesce(body[$locale], body.de) },
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
      ${t("kicker")}, ${t("headline")}, ${t("intro")}, ${t("formNote")}, ${t("ctaLabel")},
      "steps": steps[]{ ${t("title")}, ${t("description")} },
      "demoSection": demoSection{ ${t("kicker")}, ${t("headline")}, ${t("body")} },
      "overview": overview{ ${t("kicker")}, ${t("headline")}, ${t("body")} },
      "urgency": urgency{ ${t("kicker")}, ${t("headline")}, ${t("body")} }
    }`,
    { locale },
  );
}
