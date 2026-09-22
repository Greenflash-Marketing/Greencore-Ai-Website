import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["de", "en"],
  defaultLocale: "de",
  // /de/... und /en/... immer explizit – sauber für SEO und hreflang
  localePrefix: "always",
});
