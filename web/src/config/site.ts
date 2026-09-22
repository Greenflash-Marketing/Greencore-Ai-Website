import type { AppPathname } from "@/i18n/routing";

/**
 * Struktur der Seitenhülle (Navigation, Halobar, Footer).
 *
 * Übergangslösung: Die Texte kommen aus messages/*.json, die Schalter von hier.
 * Später liefert Sanity (siteSettings, navigation) dieselben Werte – die
 * Komponenten bekommen sie als Eigenschaften und ändern sich dafür nicht.
 */

export type NavItem = { key: string; href: AppPathname; hash?: string };

export const navItems: NavItem[] = [
  { key: "platform", href: "/plattform" },
  { key: "useCases", href: "/", hash: "anwendungsfaelle" },
  { key: "references", href: "/referenzen" },
  { key: "resources", href: "/ressourcen" },
  { key: "about", href: "/ueber-uns" },
];

export const footerColumns: { key: string; items: NavItem[] }[] = [
  {
    key: "platform",
    items: [
      { key: "simulation", href: "/plattform/simulation" },
      { key: "optimization", href: "/plattform/optimierung" },
      { key: "trading", href: "/plattform/energiehandel" },
    ],
  },
  {
    key: "resources",
    items: [
      { key: "blog", href: "/ressourcen/blog" },
      { key: "press", href: "/ressourcen/presse" },
      { key: "references", href: "/referenzen" },
    ],
  },
  {
    key: "company",
    items: [
      { key: "about", href: "/ueber-uns" },
      { key: "demo", href: "/demo" },
      { key: "contact", href: "/kontakt" },
    ],
  },
];

/** Aufklappbare Neuigkeiten-Leiste über der Navigation – standardmäßig aus. */
export const halobar = {
  enabled: false,
  href: "/ressourcen/presse" as AppPathname,
};

/** Login in die Software – nicht Teil des Go-Live, Platz ist vorgesehen. */
export const login = {
  enabled: false,
  url: "",
};
