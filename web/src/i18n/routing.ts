import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["de", "en"],
  defaultLocale: "de",
  // /de/... und /en/... immer explizit – sauber für SEO und hreflang
  localePrefix: "always",
  // Interne Pfade (= Ordner unter src/app/[locale]) sind deutsch; die
  // englischen Adressen werden darauf abgebildet. Vorschlag, noch nicht final.
  pathnames: {
    "/": "/",
    "/plattform": { de: "/plattform", en: "/platform" },
    "/plattform/simulation": { de: "/plattform/simulation", en: "/platform/simulation" },
    "/plattform/optimierung": { de: "/plattform/optimierung", en: "/platform/optimization" },
    "/plattform/energiehandel": { de: "/plattform/energiehandel", en: "/platform/energy-trading" },
    "/referenzen": { de: "/referenzen", en: "/references" },
    "/ressourcen": { de: "/ressourcen", en: "/resources" },
    "/ressourcen/blog": { de: "/ressourcen/blog", en: "/resources/blog" },
    "/ressourcen/presse": { de: "/ressourcen/presse", en: "/resources/press" },
    "/ueber-uns": { de: "/ueber-uns", en: "/about" },
    "/demo": "/demo",
    "/kontakt": { de: "/kontakt", en: "/contact" },
    "/impressum": { de: "/impressum", en: "/legal-notice" },
    "/datenschutz": { de: "/datenschutz", en: "/privacy" },
  },
});

export type AppPathname = keyof typeof routing.pathnames;
