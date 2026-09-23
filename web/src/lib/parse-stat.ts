/**
 * Zerlegt einen Kennzahl-Wert aus Sanity (deutsches Zahlenformat, z. B. "−32",
 * "65.000", "1,5") in Präfix, Zahl, Nachkommastellen und Rest – damit er
 * hochgezählt und je Sprache formatiert werden kann. null = keine Zahl.
 */
export function parseStat(raw: string) {
  const m = raw.trim().match(/^(\D*?)(\d[\d.]*(?:,\d+)?)(.*)$/);
  if (!m) return null;
  const [, prefix, digits, suffix] = m;
  const decimals = digits.includes(",") ? digits.split(",")[1].length : 0;
  const value = Number(digits.replace(/\./g, "").replace(",", "."));
  return Number.isFinite(value) ? { prefix, value, decimals, suffix } : null;
}
