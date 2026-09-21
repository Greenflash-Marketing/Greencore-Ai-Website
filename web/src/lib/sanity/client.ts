import { createClient } from "next-sanity";
import { createImageUrlBuilder } from "@sanity/image-url";

// Werte kommen aus Umgebungsvariablen (lokal .env.local, in Vercel als
// Environment Variables) – hier NICHT hart eintragen.
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const apiVersion = "2024-01-01";

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === "production",
});

const builder = createImageUrlBuilder(sanityClient);

export function urlForImage(source: unknown) {
  return builder.image(source as never);
}
