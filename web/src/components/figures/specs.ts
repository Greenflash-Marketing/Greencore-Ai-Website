import type { FigureSpec } from "./figure";

/**
 * Die Diagramme zu den Anwendungsfaellen.
 *
 * Alle Werte sind Anteile zwischen 0 und 1 und rein schematisch: Sie zeigen
 * den Mechanismus, nicht gemessene Groessen. Wo echte Zahlen belegt sind,
 * stehen sie im Text daneben, nicht in der Zeichnung.
 */

/** Werktagsprofil eines Industriebetriebs, 0–24 Uhr in Zweistundenschritten */
const DAY = [0.3, 0.28, 0.34, 0.62, 0.78, 0.74, 0.7, 0.66, 0.58, 0.46, 0.36, 0.3, 0.29];
/** Erzeugung einer Photovoltaikanlage ueber denselben Tag */
const PV = [0, 0, 0.06, 0.34, 0.66, 0.86, 0.9, 0.78, 0.52, 0.22, 0.03, 0, 0];
/** Boersenstrompreis: mittags niedrig, abends teuer */
const PRICE = [0.52, 0.46, 0.44, 0.38, 0.26, 0.16, 0.12, 0.2, 0.34, 0.58, 0.74, 0.64, 0.55];

const T = { hours: ["00:00", "24:00"] as [string, string] };

export const FIGURES = {
  /* ---------- Planung ---------- */

  payback: {
    caption: "Amortisation je Variante · Jahre",
    bars: [
      { value: 0.92, label: "nur PV" },
      { value: 0.58, label: "PV + Speicher", accent: true },
      { value: 0.76, label: "+ Ladepark" },
    ],
  },

  sizing: {
    caption: "Ergebnis über Speichergröße",
    series: [{ points: [0.1, 0.38, 0.62, 0.8, 0.9, 0.93, 0.9, 0.84, 0.76], tone: "accent" }],
    windows: [{ from: 0.5, to: 0.68, label: "Optimum", tone: "accent" }],
    axis: ["klein", "groß"],
  },

  scenarios: {
    caption: "Energiekosten im Vergleich · €/a",
    bars: [
      { value: 0.95, label: "heute" },
      { value: 0.72, label: "Variante A" },
      { value: 0.48, label: "Variante B", accent: true },
      { value: 0.61, label: "Variante C" },
    ],
  },

  capacity: {
    caption: "Netzbezug gegen Anschlussgrenze",
    series: [
      { points: DAY.map((v) => v * 1.12), tone: "ink", dashed: true },
      { points: DAY.map((v) => Math.min(v, 0.62)), tone: "accent" },
    ],
    threshold: { at: 0.68, label: "Anschlussgrenze" },
    axis: T.hours,
  },

  retrofit: {
    caption: "Eigenverbrauch ohne und mit Speicher",
    series: [
      { points: PV, area: true },
      { points: DAY, tone: "ink", dashed: true },
      { points: DAY.map((v, i) => Math.max(v, PV[i] * 0.72)), tone: "accent" },
    ],
    axis: T.hours,
  },

  procurement: {
    caption: "Beschaffungsmodelle · Kosten je MWh",
    bars: [
      { value: 0.88, label: "Fixpreis" },
      { value: 0.7, label: "Day-Ahead" },
      { value: 0.54, label: "strukturiert", accent: true },
    ],
  },

  cashflow: {
    caption: "Liquidität über die Laufzeit",
    zeroAt: 0.32,
    series: [
      { points: [0.32, 0.1, 0.16, 0.26, 0.38, 0.52, 0.66, 0.8, 0.92], tone: "accent" },
    ],
    axis: ["Investition", "Jahr 10"],
  },

  /* ---------- Optimierung ---------- */

  peak: {
    caption: "Netzbezug · ohne und mit Steuerung",
    series: [
      { points: DAY, tone: "ink", dashed: true },
      { points: DAY.map((v) => Math.min(v, 0.6)), tone: "accent" },
    ],
    threshold: { at: 0.6, label: "Zielwert" },
    axis: T.hours,
  },

  selfuse: {
    caption: "Erzeugung und Verbrauch über den Tag",
    series: [
      { points: PV, area: true },
      { points: DAY, tone: "ink", dashed: true },
      { points: DAY.map((v, i) => Math.max(v, PV[i] * 0.8)), tone: "accent" },
    ],
    axis: T.hours,
  },

  windows: {
    caption: "Hochlastzeitfenster des Netzbetreibers",
    series: [
      { points: DAY, tone: "ink", dashed: true },
      { points: DAY.map((v, i) => (i >= 3 && i <= 5 ? v * 0.55 : v)), tone: "accent" },
    ],
    windows: [{ from: 0.24, to: 0.46, label: "Hochlast" }],
    axis: T.hours,
  },

  soc: {
    caption: "Ladezustand folgt dem Preis",
    series: [
      { points: PRICE, tone: "muted" },
      { points: [0.3, 0.26, 0.3, 0.44, 0.66, 0.86, 0.92, 0.8, 0.58, 0.36, 0.28, 0.3, 0.34], tone: "accent" },
    ],
    windows: [
      { from: 0.3, to: 0.52, label: "laden", tone: "accent" },
      { from: 0.66, to: 0.86, label: "entladen", tone: "cool" },
    ],
    axis: T.hours,
  },

  charging: {
    caption: "Ladepark · ungesteuert und verteilt",
    series: [
      { points: [0, 0, 0, 0.1, 0.2, 0.2, 0.24, 0.9, 0.84, 0.3, 0.06, 0, 0], tone: "ink", dashed: true },
      { points: [0, 0, 0, 0.12, 0.26, 0.3, 0.34, 0.42, 0.44, 0.42, 0.34, 0.16, 0.02], tone: "accent" },
    ],
    threshold: { at: 0.55, label: "Lastgrenze" },
    axis: ["Ankunft", "Abfahrt"],
  },

  negative: {
    caption: "Preis unter null · Reaktion der Anlage",
    zeroAt: 0.42,
    series: [
      { points: [0.62, 0.58, 0.5, 0.36, 0.2, 0.1, 0.08, 0.16, 0.34, 0.52, 0.64, 0.6, 0.56], tone: "ink" },
      { points: [0.42, 0.42, 0.44, 0.56, 0.72, 0.84, 0.86, 0.74, 0.56, 0.44, 0.42, 0.42, 0.42], tone: "accent" },
    ],
    windows: [{ from: 0.3, to: 0.54, label: "unter null", tone: "cool" }],
    axis: T.hours,
  },

  thermal: {
    caption: "Temperatur im zulässigen Korridor",
    series: [
      { points: [0.5, 0.52, 0.5, 0.38, 0.3, 0.26, 0.3, 0.44, 0.58, 0.66, 0.6, 0.54, 0.5], tone: "accent" },
    ],
    threshold: { at: 0.74, label: "Obergrenze" },
    windows: [{ from: 0.24, to: 0.5, label: "vorkühlen", tone: "accent" }],
    axis: T.hours,
  },

  tariff: {
    caption: "Netzentgelt je Leistungsstufe",
    bars: [
      { value: 0.9, label: "ungesteuert" },
      { value: 0.66, label: "Stufe 2" },
      { value: 0.42, label: "Stufe 3", accent: true },
    ],
  },

  /* ---------- Energiehandel ---------- */

  tranches: {
    caption: "Beschaffung in Tranchen über das Jahr",
    bars: [
      { value: 0.34, label: "Q1" },
      { value: 0.52, label: "Q2", accent: true },
      { value: 0.28, label: "Q3" },
      { value: 0.46, label: "Q4" },
    ],
  },

  spot: {
    caption: "Spotpreis und Einsatzfenster · 24 h",
    series: [{ points: PRICE, tone: "ink" }],
    windows: [
      { from: 0.3, to: 0.52, label: "einkaufen", tone: "accent" },
      { from: 0.68, to: 0.88, label: "vermarkten", tone: "cool" },
    ],
    axis: T.hours,
  },

  flex: {
    caption: "Freie Leistung am Markt",
    series: [
      { points: [0.82, 0.84, 0.8, 0.6, 0.46, 0.5, 0.54, 0.62, 0.7, 0.78, 0.8, 0.82, 0.84], tone: "muted" },
      { points: DAY.map((v) => v * 0.7), area: true },
    ],
    axis: T.hours,
  },

  forecast: {
    caption: "Prognose gegen tatsächlichen Verbrauch",
    series: [
      { points: DAY, tone: "accent" },
      { points: DAY.map((v, i) => v + (i % 3 === 0 ? 0.04 : -0.03)), tone: "ink", dashed: true },
    ],
    axis: T.hours,
  },
} satisfies Record<string, FigureSpec>;

export type FigureKey = keyof typeof FIGURES;
