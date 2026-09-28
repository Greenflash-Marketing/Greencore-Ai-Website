const GROUPS = [
  { label: "PV und Wechselrichter", y: 26 },
  { label: "Batteriespeicher", y: 68 },
  { label: "Ladeinfrastruktur", y: 110 },
  { label: "Mess- und Zählertechnik", y: 152 },
];

/**
 * Schaubild fuer den Kompatibilitaets-Abschnitt: vier Geraetegruppen links,
 * die ueber standardisierte Schnittstellen auf einer Ebene zusammenlaufen,
 * rechts der Strommarkt. Bewusst schematisch – es zeigt die Anordnung, nicht
 * eine bestimmte Anlage.
 */
export function CompatDiagram() {
  return (
    <figure className="compat-diagram">
      <svg viewBox="0 0 640 200" role="img" aria-label="Geräte verschiedener Hersteller laufen auf einer Ebene zusammen">
        {GROUPS.map((group) => (
          <g key={group.label}>
            <rect className="compat-diagram__box" x="8" y={group.y - 14} width="196" height="28" rx="6" />
            <text className="compat-diagram__label" x="20" y={group.y + 4}>
              {group.label}
            </text>
            <path
              className="compat-diagram__wire"
              d={`M204 ${group.y} C 250 ${group.y}, 250 100, 296 100`}
            />
          </g>
        ))}

        <rect className="compat-diagram__hub" x="296" y="72" width="184" height="56" rx="10" />
        <text className="compat-diagram__hubtext" x="388" y="97" textAnchor="middle">
          Greencore AI
        </text>
        <text className="compat-diagram__hubsub" x="388" y="113" textAnchor="middle">
          Prognose · Optimierung · Steuerung
        </text>

        <path className="compat-diagram__wire compat-diagram__wire--out" d="M480 100 L560 100" />
        <rect className="compat-diagram__box" x="560" y="86" width="72" height="28" rx="6" />
        <text className="compat-diagram__label" x="572" y="104">
          Strommarkt
        </text>
      </svg>
    </figure>
  );
}
