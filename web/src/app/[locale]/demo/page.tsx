import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getDemoPage, type Section } from "@/lib/sanity/pages";
import { Reveal } from "@/components/motion/reveal";
import { stagger } from "@/components/motion/stagger";
import { PageHeader } from "@/components/page/page-header";
import { MediaDummy } from "@/components/page/media-dummy";

export const revalidate = 60;

export async function generateMetadata(props: PageProps<"/[locale]/demo">): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "Pages" });
  return { title: `${t("demo")} · Greencore AI` };
}

/**
 * Demo anfragen: conversionoptimiert. Das Formular steht laut Sitemap im Kopf
 * der Seite, damit niemand erst scrollen muss; darunter erklaeren drei
 * Abschnitte, was die Demo leistet, was die Plattform tut und warum jetzt.
 */
export default async function Page(props: PageProps<"/[locale]/demo">) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const [demo, t] = await Promise.all([getDemoPage(locale), getTranslations("Demo")]);
  if (!demo) return null;

  return (
    <>
      <PageHeader kicker={demo.kicker} headline={demo.headline} lede={demo.intro}>
        {/* Attrappe: Das Formular folgt mit der Anbindung an das CRM. */}
        <Reveal className="demo-form" delay={stagger(1)}>
          <MediaDummy label={t("formDummy")} ratio="16 / 9" />
          <p className="demo-form__note">{demo.formNote ?? t("formNoteFallback")}</p>
        </Reveal>
      </PageHeader>

      <TextSection section={demo.demoSection} surface="silver-card" media />

      {demo.steps && demo.steps.length > 0 && (
        <section className="band band--silver" data-surface="silver">
          <div className="band__inner band__inner--wide">
            <Reveal className="band__head">
              <span className="kicker">{t("stepsKicker")}</span>
              <h2 className="band__title">{t("stepsHeadline")}</h2>
            </Reveal>
            <ol className="steps">
              {demo.steps.map((step, i) => (
                <Reveal key={i} as="li" className="card" delay={stagger(i)}>
                  <span className="steps__idx">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>
      )}

      <TextSection section={demo.overview} surface="silver-card" />
      <TextSection section={demo.urgency} surface="dark" />
    </>
  );
}

/** Ein Textabschnitt aus Sanity; ohne Inhalt faellt er weg. */
function TextSection({
  section,
  surface,
  media,
}: {
  section?: Section;
  surface: "silver" | "silver-card" | "dark";
  media?: boolean;
}) {
  if (!section?.headline && !section?.body) return null;
  const dark = surface === "dark";
  return (
    <section className={`band band--${surface}${dark ? " dark" : ""}`} data-surface={dark ? "dark" : "silver"}>
      <div className="band__inner">
        <Reveal className="band__head">
          {section.kicker && (
            <span className={dark ? "kicker kicker--flash" : "kicker"}>{section.kicker}</span>
          )}
          {section.headline && <h2 className="band__title">{section.headline}</h2>}
        </Reveal>
        {section.body && (
          <Reveal as="p" className="band__lede" delay={stagger(1)}>
            {section.body}
          </Reveal>
        )}
        {media && (
          <Reveal delay={stagger(2)}>
            <MediaDummy label="Attrappe · Ansicht aus der Demo" ratio="16 / 9" />
          </Reveal>
        )}
      </div>
    </section>
  );
}
