import { setRequestLocale } from "next-intl/server";
import { getHomePage } from "@/lib/sanity/home";
import { Hero } from "@/components/home/hero";

// Inhalte kommen aus Sanity; Änderungen im Studio sind nach spätestens 60 s live.
export const revalidate = 60;

export default async function HomePage(props: PageProps<"/[locale]">) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const home = await getHomePage(locale);

  return <>{home?.hero && <Hero hero={home.hero} logos={home.logos ?? []} />}</>;
}
