import { setRequestLocale } from "next-intl/server";
import { getHomePage } from "@/lib/sanity/home";
import { Hero } from "@/components/home/hero";
import { ClaimBand } from "@/components/home/claim-band";
import { SoftwareZoom } from "@/components/home/software-zoom";

// Inhalte kommen aus Sanity; Änderungen im Studio sind nach spätestens 60 s live.
export const revalidate = 60;

export default async function HomePage(props: PageProps<"/[locale]">) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const home = await getHomePage(locale);
  if (!home) return null;

  return (
    <>
      {home.hero && <Hero hero={home.hero} logos={home.logos ?? []} />}
      {home.claimBand && <ClaimBand {...home.claimBand} />}
      <SoftwareZoom intro={home.softwareInsights} screenshot={home.zoomScreenshot} />
    </>
  );
}
