import { sanityClient } from "./client";

export type TaggedLogo = {
  name: string;
  url: string;
  tags: string[];
  width: number;
  height: number;
};

const taggedLogosQuery = `*[_id == "siteSettings"][0].taggedLogos[defined(logo.asset)]{
  name,
  "url": logo.asset->url,
  "tags": coalesce(tags, []),
  "width": logo.asset->metadata.dimensions.width,
  "height": logo.asset->metadata.dimensions.height
}`;

export function getTaggedLogos() {
  return sanityClient.fetch<TaggedLogo[] | null>(taggedLogosQuery).then((rows) => rows ?? []);
}
