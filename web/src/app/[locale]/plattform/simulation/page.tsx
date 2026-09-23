import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { SolutionPage } from "@/components/page/solution-page";

export async function generateMetadata(props: PageProps<"/[locale]/plattform/simulation">): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "Pages" });
  return { title: `${t("simulation")} · Greencore AI` };
}

export default async function Page(props: PageProps<"/[locale]/plattform/simulation">) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  return <SolutionPage moduleKey="plan" locale={locale} />;
}
