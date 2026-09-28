import { PortableText } from "next-sanity";
import type { PortableTextBlock } from "next-sanity";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { getSolution } from "@/lib/sanity/solution";
import { Reveal } from "@/components/motion/reveal";
import { stagger } from "@/components/motion/stagger";
import { PageHeader } from "./page-header";
import { StatRow } from "./stat-row";
import { UseCaseList } from "./use-case-list";
import { MediaDummy } from "./media-dummy";
import { PageCta } from "./page-cta";

/**
 * Gemeinsamer Aufbau der drei Plattform-Seiten: Kopf, Kennzahlen,
 * Software-Einblick, Anwendungsfälle, Abschluss. Die Inhalte kommen je Modul
 * aus Sanity, die Struktur bleibt gleich – damit sind die Seiten konsistent.
 */
export async function SolutionPage({ moduleKey, locale }: { moduleKey: string; locale: string }) {
  const [data, t] = await Promise.all([
    getSolution(moduleKey, locale),
    getTranslations("Solution"),
  ]);
  if (!data) return null;

  const hasSteps = Boolean(data.explainerSteps && data.explainerSteps.length > 0);

  return (
    <>
      <PageHeader kicker={data.kicker} headline={data.headline ?? data.title} lede={data.lede} />

      <StatRow tiles={data.stats ?? []} band={data.statsBand} />

      {/*
        Erklaer-Abschnitt. Mit Schritten laeuft die Kette ueber die volle
        Breite – in einer halben Spalte waeren vier Schritte zu schmal.
        Ohne Schritte bleibt es beim 50/50-Layout mit Fliesstext.
      */}
      <section className="band band--silver" data-surface="silver">
        <div className="band__inner band__inner--wide">
          {hasSteps ? (
            <>
              <Reveal className="band__head">
                {data.explainerKicker && <span className="kicker">{data.explainerKicker}</span>}
                {data.shortDescription && <h2 className="band__title">{data.shortDescription}</h2>}
              </Reveal>
              <Reveal as="ol" className="steps steps--flow" delay={stagger(1)}>
                {data.explainerSteps?.map((step, i) => (
                  <li key={i} className="card">
                    <span className="steps__idx">{String(i + 1).padStart(2, "0")}</span>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </li>
                ))}
              </Reveal>
              {data.features && data.features.length > 0 && (
                <Reveal as="ul" className="feature-list" delay={stagger(2)}>
                  {data.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </Reveal>
              )}
            </>
          ) : (
            <Reveal className="split">
              <div className="split__pane" data-tone="ultra">
                {data.explainerKicker && <span className="kicker">{data.explainerKicker}</span>}
                {data.shortDescription && <h2>{data.shortDescription}</h2>}
                {data.body ? <PortableText value={data.body as PortableTextBlock[]} /> : null}
                {data.features && data.features.length > 0 && (
                  <ul className="feature-list">
                    {data.features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="split__visual">
                {data.image ? (
                  <Image src={data.image} alt="" width={960} height={720} className="split__img" />
                ) : (
                  <MediaDummy label={t("screenshotDummy")} ratio="4 / 3" />
                )}
              </div>
            </Reveal>
          )}
        </div>
      </section>

      <UseCaseList kicker={t("useCasesKicker")} headline={t("useCasesHeadline")} items={data.useCases ?? []} />

      <PageCta headline={t("ctaHeadline")} lede={t("ctaLede")} label={t("ctaLabel")} />
    </>
  );
}
