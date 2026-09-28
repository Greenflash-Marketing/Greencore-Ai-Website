import { PortableText } from "next-sanity";
import type { PortableTextBlock } from "next-sanity";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { getSolution } from "@/lib/sanity/solution";
import { getCustomerLogos } from "@/lib/sanity/home";
import { Reveal } from "@/components/motion/reveal";
import { stagger } from "@/components/motion/stagger";
import { PageHeader } from "./page-header";
import { StatRow } from "./stat-row";
import { UseCaseList } from "./use-case-list";
import { MediaDummy } from "./media-dummy";
import { PageCta } from "./page-cta";
import { MockVisual, type MockKind } from "@/components/home/mock-visual";

/**
 * Gemeinsamer Aufbau der drei Plattform-Seiten: Kopf, Kennzahlen,
 * Software-Einblick, Anwendungsfälle, Abschluss. Die Inhalte kommen je Modul
 * aus Sanity, die Struktur bleibt gleich – damit sind die Seiten konsistent.
 */
export async function SolutionPage({ moduleKey, locale }: { moduleKey: string; locale: string }) {
  const [data, t, customers] = await Promise.all([
    getSolution(moduleKey, locale),
    getTranslations("Solution"),
    getCustomerLogos(locale),
  ]);
  if (!data) return null;

  const hasSteps = Boolean(data.explainerSteps && data.explainerSteps.length > 0);
  // Jede Unterseite zeigt im Kopf die Ansicht, um die es auf ihr geht.
  const headerMock: Record<string, MockKind> = {
    plan: "bars",
    operate: "peak",
    flex: "spot",
  };

  return (
    <>
      <PageHeader
        kicker={data.kicker}
        headline={data.headline ?? data.title}
        lede={data.lede}
        media={<MockVisual kind={headerMock[moduleKey] ?? "peak"} />}
      />

      <StatRow
        tiles={data.stats ?? []}
        band={data.statsBand}
        logos={customers?.logos ?? []}
        logosLabel={customers?.label}
      />

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
