import { sanityClient } from "./client";
import type { StatTile } from "./home";

export type ModuleUseCase = { title?: string; description?: string };

export type SolutionPage = {
  title?: string;
  kicker?: string;
  lede?: string;
  shortDescription?: string;
  body?: unknown;
  features?: string[];
  stats?: StatTile[];
  useCases?: ModuleUseCase[];
  image?: string;
};

const t = (field: string) => `"${field}": coalesce(${field}[$locale], ${field}.de)`;

const query = `*[_type == "solutionModule" && moduleKey == $key][0]{
  ${t("title")}, ${t("kicker")}, ${t("lede")}, ${t("shortDescription")},
  "body": coalesce(body[$locale], body.de),
  "features": subFeatures[]{"t": coalesce(title[$locale], title.de)}.t,
  "stats": stats[]{ value, unit, ${t("label")} },
  "useCases": useCases[]{ ${t("title")}, ${t("description")} },
  "image": softwareShowcase[0].asset->url
}`;

/** moduleKey: plan | operate | flex */
export function getSolution(key: string, locale: string) {
  return sanityClient.fetch<SolutionPage | null>(query, { key, locale });
}

export const MODULE_KEYS = { simulation: "plan", optimierung: "operate", energiehandel: "flex" } as const;
