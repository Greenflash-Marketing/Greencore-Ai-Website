import { getTranslations, setRequestLocale } from "next-intl/server";
import { dataset, projectId } from "@/lib/sanity/client";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

// Übergangsstand: technische Startseite, bis die echten Abschnitte folgen.
export default async function HomePage(props: PageProps<"/[locale]">) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const t = await getTranslations("Home");

  return (
    <>
      <section className="band band--silver" data-surface="silver">
        <div className="band__inner">
          <span className="kicker">{t("kicker")}</span>
          <h1 className="max-w-[16ch] text-5xl font-semibold leading-[1.05] tracking-[-0.03em] text-balance sm:text-6xl">
            {t("headline")}
          </h1>
          <p className="mt-6 max-w-[60ch] text-lg text-silver-dark">{t("subline")}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button>{t("ctaPrimary")}</Button>
            <Button variant="secondary">{t("ctaSecondary")}</Button>
          </div>
        </div>
      </section>

      <section
        id="anwendungsfaelle"
        className="band band--ultra dark"
        data-surface="dark"
      >
        <div className="band__inner">
          <span className="kicker">{t("bandKicker")}</span>
          <p className="max-w-[18ch] text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-balance sm:text-5xl">
            {t("bandText")}
          </p>
        </div>
      </section>

      <section className="band band--silver-card" data-surface="silver">
        <div className="band__inner">
          <Reveal>
            <div className="rounded-[12px] border border-silver-base bg-silver p-6">
              <h2 className="kicker">{t("statusTitle")}</h2>
              <dl className="grid gap-3 sm:grid-cols-2">
                <div>
                  <dt className="text-sm text-silver-dark">{t("localeLabel")}</dt>
                  <dd className="font-mono tabular-nums">{locale}</dd>
                </div>
                <div>
                  <dt className="text-sm text-silver-dark">{t("sanityLabel")}</dt>
                  <dd className="font-mono tabular-nums">
                    {projectId} · {dataset}
                  </dd>
                </div>
              </dl>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
