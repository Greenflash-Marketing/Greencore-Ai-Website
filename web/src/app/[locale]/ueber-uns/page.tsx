import type { Metadata } from "next";
import { PortableText } from "next-sanity";
import type { PortableTextBlock } from "next-sanity";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getAboutPage } from "@/lib/sanity/pages";
import { Reveal } from "@/components/motion/reveal";
import { stagger } from "@/components/motion/stagger";
import { PageHeader } from "@/components/page/page-header";
import { PageCta } from "@/components/page/page-cta";
import { MediaDummy } from "@/components/page/media-dummy";

export const revalidate = 60;

export async function generateMetadata(props: PageProps<"/[locale]/ueber-uns">): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "Pages" });
  return { title: `${t("about")} · Greencore AI` };
}

/** Über uns: Marke und Positionierung – der ausführlichste Bereich der Seite. */
export default async function Page(props: PageProps<"/[locale]/ueber-uns">) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const [about, t, ts] = await Promise.all([
    getAboutPage(locale),
    getTranslations("About"),
    getTranslations("Solution"),
  ]);
  if (!about) return null;

  return (
    <>
      <PageHeader kicker={about.kicker} headline={about.headline} lede={about.lede} />

      {about.visionMissionValueProp ? (
        <section className="band band--dark dark" data-surface="dark">
          <div className="band__inner">
            <Reveal className="band__head">
              <span className="kicker kicker--flash">{t("visionKicker")}</span>
            </Reveal>
            <Reveal className="vision prose" delay={stagger(1)}>
              <PortableText value={about.visionMissionValueProp as PortableTextBlock[]} />
            </Reveal>
          </div>
        </section>
      ) : null}

      {about.positioning && about.positioning.length > 0 && (
        <section className="band band--silver" data-surface="silver">
          <div className="band__inner">
            <Reveal className="band__head">
              <span className="kicker">{t("shiftKicker")}</span>
              <h2 className="band__title">{t("shiftHeadline")}</h2>
            </Reveal>
            <Reveal as="ol" className="shifts" delay={stagger(1)}>
              {about.positioning.map((s, i) => (
                <li key={i}>
                  <span className="shifts__from">{s.from}</span>
                  <span className="shifts__arrow" aria-hidden="true" />
                  <span className="shifts__to">{s.to}</span>
                </li>
              ))}
            </Reveal>
          </div>
        </section>
      )}

      {about.principles && about.principles.length > 0 && (
        <section className="band band--silver-card" data-surface="silver">
          <div className="band__inner band__inner--wide">
            <Reveal className="band__head">
              <span className="kicker">{t("principlesKicker")}</span>
              <h2 className="band__title">{t("principlesHeadline")}</h2>
            </Reveal>
            <div className="principles">
              {about.principles.map((p, i) => (
                <Reveal key={i} as="article" className="card" delay={stagger(i)}>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {about.greenflash ? (
        <section className="band band--silver" data-surface="silver">
          <div className="band__inner band__inner--wide">
            <Reveal className="split">
              <div className="split__pane" data-tone="ultra">
                <span className="kicker kicker--flash">{t("greenflashKicker")}</span>
                <h2>{t("greenflashHeadline")}</h2>
                <div className="prose">
                  <PortableText value={about.greenflash as PortableTextBlock[]} />
                </div>
              </div>
              <div className="split__visual">
                <MediaDummy label={t("teamDummy")} ratio="4 / 3" />
              </div>
            </Reveal>
          </div>
        </section>
      ) : null}

      <PageCta headline={ts("ctaHeadline")} lede={ts("ctaLede")} label={ts("ctaLabel")} />
    </>
  );
}
