import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PagePlaceholder } from "@/components/layout/page-placeholder";

export async function generateMetadata(props: PageProps<"/[locale]/ressourcen/presse">): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "Pages" });
  return { title: `${t("press")} · Greencore AI` };
}

export default async function Page(props: PageProps<"/[locale]/ressourcen/presse">) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  return <PagePlaceholder page="press" />;
}
