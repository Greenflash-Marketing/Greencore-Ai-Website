const ASSETS = [
  { label: "PV", x: 18 },
  { label: "Speicher", x: 96 },
  { label: "Ladepunkte", x: 174 },
  { label: "Verbrauch", x: 252 },
];

/**
 * Grafik im Kopf der Vergleichskarten.
 *
 * Links: vier Anlagen, jede mit eigener Messkurve und ohne Verbindung
 * untereinander. Rechts: dieselben Anlagen auf einer gemeinsamen Ebene, mit
 * einer durchgehenden Linie zum Strommarkt. Der Unterschied zwischen den
 * beiden Karten ist damit die Aussage des Abschnitts, nicht Dekoration.
 */
export function CardDiagram({ connected }: { connected?: boolean }) {
  return (
    <svg className="card__diagram" viewBox="0 0 330 132" aria-hidden="true">
      {ASSETS.map((asset) => (
        <g key={asset.label}>
          <rect
            className={connected ? "cd__box cd__box--on" : "cd__box"}
            x={asset.x}
            y="12"
            width="60"
            height="40"
            rx="8"
          />
          <path
            className={connected ? "cd__spark cd__spark--on" : "cd__spark"}
            d={`M${asset.x + 10} 40 L${asset.x + 22} 28 L${asset.x + 34} 36 L${asset.x + 50} 22`}
          />
          <text className="cd__label" x={asset.x + 30} y="66" textAnchor="middle">
            {asset.label}
          </text>
          {connected && <line className="cd__drop" x1={asset.x + 30} y1="70" x2={asset.x + 30} y2="86" />}
        </g>
      ))}

      {connected ? (
        <>
          <rect className="cd__bar" x="18" y="86" width="294" height="24" rx="8" />
          <text className="cd__bartext" x="165" y="102" textAnchor="middle">
            Greencore AI
          </text>
          <line className="cd__out" x1="165" y1="110" x2="165" y2="126" />
          <text className="cd__label" x="165" y="130" textAnchor="middle">
            Strommarkt
          </text>
        </>
      ) : (
        <text className="cd__note" x="165" y="104" textAnchor="middle">
          vier Systeme, vier Oberflächen
        </text>
      )}
    </svg>
  );
}
