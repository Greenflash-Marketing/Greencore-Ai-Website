import { getTranslations, setRequestLocale } from "next-intl/server";
import { getHomePage } from "@/lib/sanity/home";
import { getTaggedLogos } from "@/lib/sanity/logos";
import { herstellerLogos } from "@/lib/hersteller-logos";
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

  const [home, taggedLogos, t] = await Promise.all([
    getHomePage(locale),
    getTaggedLogos(),
    getTranslations("Home"),
  ]);
  if (!home) return null;

  // Sanity-getaggte Logos haben Vorrang; sonst lokale Smart1-SVGs.
  const hasTagged = taggedLogos.some((logo) => logo.tags.includes("hersteller"));
  const cycleLogos = hasTagged ? taggedLogos : herstellerLogos;

  return (
    <>
      {home.hero && <Hero hero={home.hero} logos={home.logos ?? []} />}
      <StatsBand band={home.statsBand} tiles={home.statTiles ?? []} />
      <SoftwareZoom intro={home.softwareInsights} />
      <SolutionTabs band={home.solutionsBand} modules={home.solutions ?? []} />
      <Compatibility
        {...(home.compatibility ?? {})}
        worksWith={`${t("worksWith")} {hersteller}`}
        logos={cycleLogos}
      />
      {home.europeBand && <EuropeBand {...home.europeBand} />}
      <Testimonials band={home.testimonialsBand} items={home.testimonials ?? []} />
      {home.whySection && <WhySection {...home.whySection} />}
      {home.finalCta && <FinalCta {...home.finalCta} />}
      <Faq band={home.faqBand} items={home.faq ?? []} />
    </>
  );
}
