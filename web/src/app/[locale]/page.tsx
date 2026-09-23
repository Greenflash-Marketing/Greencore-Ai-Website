import { setRequestLocale } from "next-intl/server";
import { getHomePage } from "@/lib/sanity/home";
import { Hero } from "@/components/home/hero";
import { StatsBand } from "@/components/home/stats-band";
import { SoftwareZoom } from "@/components/home/software-zoom";
import { Compatibility } from "@/components/home/compatibility";
import { EuropeBand } from "@/components/home/europe-band";
import { SolutionTabs } from "@/components/home/solution-tabs";
import { Testimonials } from "@/components/home/testimonials";
import { WhySection } from "@/components/home/why-section";
import { FinalCta } from "@/components/home/final-cta";
import { Faq } from "@/components/home/faq";

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
      <StatsBand band={home.statsBand} tiles={home.statTiles ?? []} />
      <SoftwareZoom intro={home.softwareInsights} screenshot={home.zoomScreenshot} />
      <SolutionTabs band={home.solutionsBand} modules={home.solutions ?? []} />
      {home.compatibility && <Compatibility {...home.compatibility} />}
      {home.europeBand && <EuropeBand {...home.europeBand} />}
      <Testimonials band={home.testimonialsBand} items={home.testimonials ?? []} />
      {home.whySection && <WhySection {...home.whySection} />}
      {home.finalCta && <FinalCta {...home.finalCta} />}
      <Faq band={home.faqBand} items={home.faq ?? []} />
    </>
  );
}
