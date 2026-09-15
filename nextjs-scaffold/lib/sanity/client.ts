import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Werte kommen aus Umgebungsvariablen (in Vercel als Environment Variables hinterlegt,
// lokal in .env.local) – NICHT hier hardcoden.
export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
})

const builder = imageUrlBuilder(sanityClient)

export function urlForImage(source: unknown) {
  return builder.image(source as never)
}
