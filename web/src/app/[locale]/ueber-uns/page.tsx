import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PagePlaceholder } from "@/components/layout/page-placeholder";

export async function generateMetadata(props: PageProps<"/[locale]/ueber-uns">): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "Pages" });
  return { title: `${t("about")} · Greencore AI` };
}

export default async function Page(props: PageProps<"/[locale]/ueber-uns">) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  return <PagePlaceholder page="about" />;
}
