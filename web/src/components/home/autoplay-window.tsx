"use client";

import { useEffect, useState } from "react";

// ponytail: Beispiel-Oberfläche aus Entwurf A (nur Deutsch) – wird durch echte
// Screenshots/Autoplay-Videos ersetzt, sobald die Assets vom Designer da sind.
const FRAMES = [
  <div key="last" className="autoplay__frame-body">
    <div className="ui-kpis">
      <Kpi label="Lastspitze heute" value="4,8 MW" />
      <Kpi label="Eigenverbrauch" value="78 %" positive />
      <Kpi label="Ersparnis Monat" value="12.400 €" positive />
    </div>
    <div className="ui-chart">
      <div className="ui-chart__head"><span>Lastgang · 24 h</span></div>
      <svg viewBox="0 0 320 96">
        <g stroke="#bacad4" strokeWidth="0.5">
          <line x1="0" y1="32" x2="320" y2="32" />
          <line x1="0" y1="64" x2="320" y2="64" />
        </g>
        <path d="M0 78 L26 70 L52 74 L78 52 L104 44 L130 50 L156 30 L182 36 L208 26 L234 40 L260 46 L286 58 L320 62 L320 96 L0 96 Z" fill="rgba(3,112,69,0.18)" />
        <path d="M0 78 L26 70 L52 74 L78 52 L104 44 L130 50 L156 30 L182 36 L208 26 L234 40 L260 46 L286 58 L320 62" fill="none" stroke="#037045" strokeWidth="2" />
      </svg>
    </div>
  </div>,
  <div key="speicher" className="autoplay__frame-body">
    <div className="ui-kpis">
      <Kpi label="Speicher" value="6,1 MWh" />
      <Kpi label="Ladezustand" value="82 %" positive />
      <Kpi label="Spotpreis" value="62 €/MWh" />
    </div>
    <div className="ui-rows">
      <Row a="Batteriespeicher 1" b="entlädt · 620 kW" badge="automatisch" />
      <Row a="PV-Feld Süd" b="3,4 MW" badge="Einspeisung" />
      <Row a="Ladepark Logistik" b="480 kW" badge="gedrosselt" idle />
    </div>
  </div>,
  <div key="spitze" className="autoplay__frame-body">
    <div className="ui-chart">
      <div className="ui-chart__head">
        <span>Netzbezug · Zielwert 4,5 MW</span>
        <div className="ui-legend">
          <span><i style={{ background: "#037045" }} />ohne</span>
          <span><i style={{ background: "#9ff55d" }} />mit</span>
        </div>
      </div>
      <svg viewBox="0 0 320 120">
        <line x1="0" y1="42" x2="320" y2="42" stroke="#5a6bd6" strokeDasharray="4 4" />
        <path d="M0 98 L40 90 L80 46 L120 16 L160 54 L200 32 L240 78 L280 90 L320 96" fill="none" stroke="#037045" strokeWidth="2" strokeDasharray="5 4" />
        <path d="M0 100 L40 94 L80 62 L120 46 L160 60 L200 46 L240 82 L280 92 L320 98" fill="none" stroke="#9ff55d" strokeWidth="2.6" />
      </svg>
    </div>
    <div className="ui-rows">
      <Row a="Lastspitze vermieden" b="−1,3 MW" badge="heute" />
    </div>
  </div>,
];

export function Kpi({ label, value, positive }: { label: string; value: string; positive?: boolean }) {
  return (
    <div className="ui-kpi">
      <div className="ui-kpi__label">{label}</div>
      <div className={positive ? "ui-kpi__value is-positive" : "ui-kpi__value"}>{value}</div>
    </div>
  );
}

export function Row({ a, b, badge, idle }: { a: string; b: string; badge: string; idle?: boolean }) {
  return (
    <div className="ui-row">
      <span>{a}</span>
      <span>{b}</span>
      <span className={idle ? "ui-badge ui-badge--idle" : "ui-badge"}>{badge}</span>
    </div>
  );
}

/** Laufendes Software-Fenster im Hero – die Ansichten wechseln ruhig. */
export function AutoplayWindow() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % FRAMES.length), 2600);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="autoplay" aria-hidden="true">
      <div className="autoplay__screen">
        <div className="autoplay__head">
          <span>Werk Nord · Lastmanagement</span>
          <span className="autoplay__live">Live</span>
        </div>
        <div className="autoplay__frames">
          {FRAMES.map((frame, i) => (
            <div key={i} className="autoplay__frame" data-active={i === active || undefined}>
              {frame}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
