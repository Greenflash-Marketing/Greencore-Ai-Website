const STEPS = ["Planen", "Bauen", "Vernetzen", "Optimieren", "Beschaffen", "Betreiben"];
// Greencore AI ist die digitale Ebene der Kette – Vernetzen, Optimieren, Beschaffen.
const CORE = new Set(["Vernetzen", "Optimieren", "Beschaffen"]);

/** Die Kette von Greenflash und Greencore AI: wer welchen Teil übernimmt. */
export function ChainDiagram() {
  const width = 640;
  const slot = width / STEPS.length;
  return (
    <figure className="chain">
      <svg viewBox="0 0 640 150" role="img" aria-label="Planen, Bauen, Vernetzen, Optimieren, Beschaffen, Betreiben">
        <line className="chain__rail" x1="16" x2="624" y1="62" y2="62" />
        {STEPS.map((step, i) => {
          const x = slot * i + slot / 2;
          const core = CORE.has(step);
          return (
            <g key={step}>
              <circle className={core ? "chain__dot chain__dot--core" : "chain__dot"} cx={x} cy="62" r={core ? 9 : 6} />
              <text className="chain__label" x={x} y="92" textAnchor="middle">
                {step}
              </text>
            </g>
          );
        })}
        <rect className="chain__span" x={slot * 2 + 10} y="24" width={slot * 3 - 20} height="22" rx="6" />
        <text className="chain__spantext" x={slot * 3.5} y="39" textAnchor="middle">
          Greencore AI
        </text>
        <text className="chain__foot" x="320" y="128" textAnchor="middle">
          Greenflash begleitet das Gesamtprojekt · Greencore AI steuert
        </text>
      </svg>
    </figure>
  );
}
