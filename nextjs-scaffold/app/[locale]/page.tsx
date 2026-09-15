import {sanityClient} from '@/lib/sanity/client'

async function getHomePageData() {
  return sanityClient.fetch(`*[_type == "homePage"][0]`)
}

export default async function HomePage({params: {locale}}: {params: {locale: 'de' | 'en'}}) {
  const data = await getHomePageData()

  // TODO: Hero-Sektion nach dem Bewegungs-/Glass-Konzept bauen
  // (siehe greencore-ai-hero-konzept.html als Diskussionsgrundlage)
  return (
    <main>
      <h1>{data?.headline?.[locale]}</h1>
      <p>{data?.subline?.[locale]}</p>
    </main>
  )
}
