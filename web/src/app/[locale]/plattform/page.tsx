import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageHeader } from "@/components/page/page-header";
import { PageCta } from "@/components/page/page-cta";
import { getHomePage } from "@/lib/sanity/home";

export async function generateMetadata(props: PageProps<"/[locale]/plattform">): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "Pages" });
  return { title: `${t("platform")} · Greencore AI` };
}

const LINKS = [
  { href: "/plattform/simulation", key: "simulation" },
  { href: "/plattform/optimierung", key: "optimization" },
  { href: "/plattform/energiehandel", key: "trading" },
] as const;

/** Übersicht: dient als Einstieg in die drei Module. */
export default async function Page(props: PageProps<"/[locale]/plattform">) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const [home, t, tp] = await Promise.all([
    getHomePage(locale),
    getTranslations("Solution"),
    getTranslations("Pages"),
  ]);
  const modules = home?.solutions ?? [];

  return (
    <>
      <PageHeader kicker={home?.solutionsBand?.kicker} headline={tp("platform")} lede={t("overviewLede")} />

      <section className="band band--silver-card" data-surface="silver">
        <div className="band__inner">
          <div className="grid-3">
            {LINKS.map((link, i) => (
              <Link key={link.key} href={link.href} className="card card--link">
                <span className="card__tag">{modules[i]?.kicker ?? tp(link.key)}</span>
                <h2>{modules[i]?.title ?? tp(link.key)}</h2>
                <p>{modules[i]?.headline}</p>
                <span className="card__more">{t("more")} →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <PageCta headline={t("ctaHeadline")} lede={t("ctaLede")} label={t("ctaLabel")} />
    </>
  );
}
