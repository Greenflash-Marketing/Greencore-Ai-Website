import type { Metadata } from "next";
import { DM_Sans, DM_Mono } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { MotionProvider } from "@/components/motion/motion-provider";
import { NetworkBackground } from "@/components/layout/network-background";
import { SiteNav } from "@/components/layout/site-nav";
import { SiteFooter } from "@/components/layout/site-footer";
import { Halobar } from "@/components/layout/halobar";
import { halobar } from "@/config/site";
import "../globals.css";

// Laut Brand-Bundle ausschliesslich DM Sans + DM Mono.
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(
  props: LayoutProps<"/[locale]">,
): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "Meta" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function LocaleLayout(props: LayoutProps<"/[locale]">) {
  const { locale } = await props.params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Ermoeglicht statisches Rendern der Sprachvarianten
  setRequestLocale(locale);

  return (
    <html lang={locale} className={`${dmSans.variable} ${dmMono.variable}`}>
      <body>
        <NextIntlClientProvider>
          <MotionProvider>
            <NetworkBackground />
            <div className="page">
              {halobar.enabled && <Halobar href={halobar.href} />}
              <SiteNav />
              <main id="inhalt">{props.children}</main>
              <SiteFooter />
            </div>
          </MotionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
