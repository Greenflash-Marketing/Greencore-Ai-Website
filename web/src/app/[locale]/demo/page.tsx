import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getDemoPage } from "@/lib/sanity/pages";
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

/** Demo buchen: Ablauf in drei Schritten, Formular folgt mit der CRM-Anbindung. */
export default async function Page(props: PageProps<"/[locale]/demo">) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const [demo, t] = await Promise.all([getDemoPage(locale), getTranslations("Demo")]);
  if (!demo) return null;

  return (
    <>
      <PageHeader headline={demo.headline} lede={demo.intro} />

      {demo.steps && demo.steps.length > 0 && (
        <section className="band band--silver-card" data-surface="silver">
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

      <section className="band band--silver" id="anfrage" data-surface="silver">
        <div className="band__inner">
          <Reveal className="band__head">
            <span className="kicker">{t("formKicker")}</span>
            <h2 className="band__title">{demo.ctaLabel ?? t("formHeadline")}</h2>
            <p className="band__lede">{t("formLede")}</p>
          </Reveal>
          {/* Attrappe: Das Formular folgt mit der Anbindung an das CRM. */}
          <Reveal delay={stagger(1)}>
            <MediaDummy label={t("formDummy")} ratio="16 / 7" />
          </Reveal>
        </div>
      </section>
    </>
  );
}
