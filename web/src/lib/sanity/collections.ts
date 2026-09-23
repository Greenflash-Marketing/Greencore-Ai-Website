import { sanityClient } from "./client";

/** Ein Eintrag im Kachel-Raster – gleich für Referenzen, Blog und Presse. */
export type GridItem = {
  id: string;
  title?: string;
  excerpt?: string;
  category?: string;
  image?: string;
  href?: string;
  external?: boolean;
  meta?: string;
};

const t = (field: string) => `"${field}": coalesce(${field}[$locale], ${field}.de)`;

const queries = {
  caseStudy: `*[_type == "caseStudy" && customerApprovalConfirmed == true]|order(customerName asc){
    "id": _id, ${t("title")}, "category": industry,
    "excerpt": resultHighlight, "meta": consumption,
    "image": coverImage.asset->url,
    "href": "/referenzen/" + slug.current
  }`,
  post: `*[_type == "post"]|order(publishedAt desc){
    "id": _id, ${t("title")}, ${t("excerpt")}, category,
    "meta": publishedAt, "image": coverImage.asset->url,
    "href": "/ressourcen/blog/" + slug.current
  }`,
  pressMention: `*[_type == "pressMention"]|order(publishedAt desc){
    "id": _id, title, ${t("excerpt")}, category,
    "meta": publication, "image": thumbnail.asset->url,
    "href": externalUrl, "external": true
  }`,
} as const;

export function getCollection(type: keyof typeof queries, locale: string) {
  return sanityClient.fetch<GridItem[]>(queries[type], { locale });
}
