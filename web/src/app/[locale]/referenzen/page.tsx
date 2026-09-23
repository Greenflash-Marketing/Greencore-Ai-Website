import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getCollection } from "@/lib/sanity/collections";
import { PageHeader } from "@/components/page/page-header";
import { FilterGrid } from "@/components/page/filter-grid";
import { PageCta } from "@/components/page/page-cta";

export const revalidate = 60;

export async function generateMetadata(props: PageProps<"/[locale]/referenzen">): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "Pages" });
  return { title: `${t("references")} · Greencore AI` };
}

export default async function Page(props: PageProps<"/[locale]/referenzen">) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const [items, t, ts] = await Promise.all([
    getCollection("caseStudy", locale),
    getTranslations("Collections"),
    getTranslations("Solution"),
  ]);

  return (
    <>
      <PageHeader kicker={t("refKicker")} headline={t("refHeadline")} lede={t("refLede")} />
      <section className="band band--silver-card" data-surface="silver">
        <div className="band__inner band__inner--wide">
          <FilterGrid items={items} ctaLabel={t("refCta")} />
        </div>
      </section>
      <PageCta headline={ts("ctaHeadline")} lede={ts("ctaLede")} label={ts("ctaLabel")} />
    </>
  );
}
