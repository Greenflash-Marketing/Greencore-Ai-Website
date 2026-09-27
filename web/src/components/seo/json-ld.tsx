/**
 * Strukturierte Daten (schema.org) als JSON-LD.
 *
 * Suchmaschinen und Sprachmodelle lesen daraus, was Greencore AI ist, ohne den
 * Fließtext interpretieren zu müssen. Die Inhalte dürfen nichts behaupten,
 * was auf der Seite nicht auch sichtbar steht.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify liefert hier ausschliesslich Werte aus dem CMS bzw. dieser Datei.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export const SITE_URL = "https://greencore-ai.com";

/** Organisation und Produkt – gilt für die ganze Seite. */
export function organizationJsonLd(locale: string) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "Greencore AI",
        url: SITE_URL,
        description:
          "Energieplattform für Industrie und Logistik: verbindet Erzeugung, Speicher, Ladeinfrastruktur und Verbrauch mit dem Strommarkt und steuert sie wirtschaftlich.",
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${SITE_URL}/#software`,
        name: "Greencore AI",
        applicationCategory: "BusinessApplication",
        applicationSubCategory: "Energiemanagement",
        operatingSystem: "Web",
        inLanguage: locale,
        publisher: { "@id": `${SITE_URL}/#organization` },
        featureList: [
          "Simulation und Wirtschaftlichkeitsberechnung",
          "Verbrauchs-, Erzeugungs- und Preisprognose",
          "Lastspitzenkappung",
          "Eigenverbrauchsoptimierung",
          "Atypische Netznutzung",
          "Speicheroptimierung und Multi-Use",
          "Ladeoptimierung",
          "Strukturierte Strombeschaffung",
          "Spotmarktoptimierung",
          "Flexibilitätsvermarktung",
        ],
      },
    ],
  };
}

/** FAQ der Startseite – Frage-Antwort-Paare werden direkt übernommen. */
export function faqJsonLd(items: { question?: string; answer?: string }[]) {
  const entries = items.filter((item) => item.question && item.answer);
  if (!entries.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entries.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
