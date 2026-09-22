import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PagePlaceholder } from "@/components/layout/page-placeholder";

export async function generateMetadata(props: PageProps<"/[locale]/plattform/optimierung">): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "Pages" });
  return { title: `${t("optimization")} · Greencore AI` };
}

export default async function Page(props: PageProps<"/[locale]/plattform/optimierung">) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  return <PagePlaceholder page="optimization" />;
}
