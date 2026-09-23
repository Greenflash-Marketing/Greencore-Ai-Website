import { Kpi, Row } from "./autoplay-window";

/**
 * Beispiel-Oberflächen aus Entwurf A. Sie stehen dort, wo in Sanity noch kein
 * Screenshot hinterlegt ist, und verschwinden automatisch, sobald einer da ist.
 * ponytail: bewusst wenige, wiederverwendete Darstellungen statt einer eigenen
 * Grafik je Fall – die echten Assets ersetzen sie ohnehin.
 */
export type MockKind = "bars" | "peak" | "selfUse" | "spot" | "storage";

const GRID = (
  <g stroke="#bacad4" strokeWidth="0.5">
    <line x1="0" y1="32" x2="320" y2="32" />
    <line x1="0" y1="64" x2="320" y2="64" />
  </g>
);

export function MockVisual({ kind }: { kind: MockKind }) {
  return (
    <div className="ui-mock" aria-hidden="true">
      {kind === "bars" && (
        <>
          <div className="ui-kpis">
            <Kpi label="Szenario A" value="7,2 J." />
            <Kpi label="Szenario B" value="4,1 J." positive />
            <Kpi label="Szenario C" value="5,6 J." />
          </div>
          <div className="ui-chart">
            <div className="ui-chart__head">
              <span>Amortisation im Vergleich</span>
            </div>
            <svg viewBox="0 0 320 110">
              <g fill="#037045">
                <rect x="20" y="40" width="46" height="60" rx="4" />
                <rect x="96" y="20" width="46" height="80" rx="4" fill="#9ff55d" />
                <rect x="172" y="56" width="46" height="44" rx="4" />
                <rect x="248" y="70" width="46" height="30" rx="4" fill="#5a6bd6" />
              </g>
              <line x1="10" y1="100" x2="310" y2="100" stroke="#bacad4" />
            </svg>
          </div>
        </>
      )}

      {kind === "peak" && (
        <>
          <div className="ui-chart">
            <div className="ui-chart__head">
              <span>Netzbezug · Zielwert 4,5 MW</span>
              <div className="ui-legend">
                <span>
                  <i style={{ background: "#037045" }} />ohne
                </span>
                <span>
                  <i style={{ background: "#9ff55d" }} />mit
                </span>
              </div>
            </div>
            <svg viewBox="0 0 320 120">
              <line x1="0" y1="42" x2="320" y2="42" stroke="#5a6bd6" strokeDasharray="4 4" />
              <path
                d="M0 98 L40 90 L80 46 L120 16 L160 54 L200 32 L240 78 L280 90 L320 96"
                fill="none"
                stroke="#037045"
                strokeWidth="2"
                strokeDasharray="5 4"
              />
              <path
                d="M0 100 L40 94 L80 62 L120 46 L160 60 L200 46 L240 82 L280 92 L320 98"
                fill="none"
                stroke="#9ff55d"
                strokeWidth="2.6"
              />
            </svg>
          </div>
          <div className="ui-rows">
            <Row a="Speicher entlädt" b="620 kW" badge="automatisch" />
            <Row a="Ladepark gedrosselt" b="−180 kW" badge="automatisch" />
          </div>
        </>
      )}

      {kind === "selfUse" && (
        <>
          <div className="ui-kpis">
            <Kpi label="PV-Erzeugung" value="3,4 MW" />
            <Kpi label="Direktverbrauch" value="2,7 MW" positive />
            <Kpi label="Quote" value="78 %" positive />
          </div>
          <div className="ui-chart">
            <div className="ui-chart__head">
              <span>Erzeugung vs. Verbrauch</span>
            </div>
            <svg viewBox="0 0 320 100">
              <path
                d="M0 92 L40 80 L80 52 L120 28 L160 20 L200 30 L240 52 L280 78 L320 90 L320 100 L0 100 Z"
                fill="rgba(159,245,93,0.28)"
              />
              <path
                d="M0 78 L40 74 L80 66 L120 60 L160 58 L200 60 L240 66 L280 72 L320 76"
                fill="none"
                stroke="#037045"
                strokeWidth="2.4"
              />
            </svg>
          </div>
        </>
      )}

      {kind === "spot" && (
        <div className="ui-chart">
          <div className="ui-chart__head">
            <span>Spotpreis &amp; Einsatzfenster · 24 h</span>
          </div>
          <svg viewBox="0 0 320 120">
            <rect x="52" y="10" width="42" height="100" fill="rgba(159,245,93,0.16)" />
            <rect x="214" y="10" width="46" height="100" fill="rgba(90,107,214,0.16)" />
            <path
              d="M0 70 L32 78 L64 96 L96 66 L128 52 L160 58 L192 40 L224 26 L256 38 L288 60 L320 72"
              fill="none"
              stroke="#037045"
              strokeWidth="2.4"
            />
            <text x="56" y="26" fontFamily="monospace" fontSize="8" fill="#566470">
              einkaufen
            </text>
            <text x="218" y="26" fontFamily="monospace" fontSize="8" fill="#566470">
              vermarkten
            </text>
          </svg>
        </div>
      )}

      {kind === "storage" && (
        <>
          <div className="ui-kpis">
            <Kpi label="Speicher" value="6,1 MWh" />
            <Kpi label="Ladezustand" value="82 %" positive />
            <Kpi label="Spotpreis" value="62 €/MWh" />
          </div>
          <div className="ui-chart">
            <div className="ui-chart__head">
              <span>Lade- und Entladefenster · 24 h</span>
            </div>
            <svg viewBox="0 0 320 96">
              {GRID}
              <path
                d="M0 78 L26 70 L52 74 L78 52 L104 44 L130 50 L156 30 L182 36 L208 26 L234 40 L260 46 L286 58 L320 62"
                fill="none"
                stroke="#037045"
                strokeWidth="2"
              />
            </svg>
          </div>
          <div className="ui-rows">
            <Row a="Batteriespeicher 1" b="entlädt · 620 kW" badge="automatisch" />
          </div>
        </>
      )}
    </div>
  );
}
