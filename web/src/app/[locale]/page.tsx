import { getTranslations, setRequestLocale } from "next-intl/server";
import { dataset, projectId } from "@/lib/sanity/client";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

export default async function HomePage(props: PageProps<"/[locale]">) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const t = await getTranslations("Home");

  return (
    <main className="mx-auto flex min-h-screen max-w-[1080px] flex-col justify-center px-6 py-24">
      <p className="mb-5 font-mono text-[13px] uppercase tracking-[0.1em] opacity-65">
        {t("kicker")}
      </p>

      <h1 className="max-w-[16ch] text-5xl font-semibold leading-[1.05] tracking-[-0.03em] text-balance sm:text-6xl">
        {t("headline")}
      </h1>

      <p className="mt-6 max-w-[60ch] text-lg text-silver-dark">
        {t("subline")}
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Button>{t("ctaPrimary")}</Button>
        <Button variant="secondary">{t("ctaSecondary")}</Button>
      </div>

      <Reveal className="mt-12">
      <section className="rounded-[12px] border border-silver-base bg-silver-card p-6">
        <h2 className="mb-4 font-mono text-[13px] uppercase tracking-[0.1em] opacity-65">
          {t("statusTitle")}
        </h2>
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
      </section>
      </Reveal>
    </main>
  );
}
