import { PortableText } from "next-sanity";
import type { PortableTextBlock } from "next-sanity";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { getSolution } from "@/lib/sanity/solution";
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

  return (
    <>
      <PageHeader kicker={data.kicker} headline={data.title} lede={data.lede} />

      <StatRow tiles={data.stats ?? []} />

      <section className="band band--silver" data-surface="silver">
        <div className="band__inner band__inner--wide">
          <div className="split">
            <div className="split__pane" data-tone="ultra">
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
                <Image
                  src={data.image}
                  alt=""
                  width={960}
                  height={720}
                  className="split__img"
                />
              ) : (
                <MediaDummy label={t("screenshotDummy")} ratio="4 / 3" />
              )}
            </div>
          </div>
        </div>
      </section>

      <UseCaseList kicker={t("useCasesKicker")} headline={t("useCasesHeadline")} items={data.useCases ?? []} />

      <PageCta headline={t("ctaHeadline")} lede={t("ctaLede")} label={t("ctaLabel")} />
    </>
  );
}
