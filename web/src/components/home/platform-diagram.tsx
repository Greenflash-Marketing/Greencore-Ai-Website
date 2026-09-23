const DOTS = [
  { x: 26, y: 24 },
  { x: 80, y: 18 },
  { x: 134, y: 28 },
  { x: 28, y: 76 },
  { x: 86, y: 82 },
  { x: 136, y: 72 },
];

/**
 * Kleine Grafik im Kopf der Vergleichskarten: dieselben Anlagen einmal
 * unverbunden, einmal an einer Plattform. Bewusst klein gehalten, damit der
 * Abschnitt kompakt bleibt.
 */
export function CardDiagram({ connected }: { connected?: boolean }) {
  const stroke = connected ? "var(--flash)" : "var(--silver-dark)";
  return (
    <svg className="card__diagram" viewBox="0 0 162 100" aria-hidden="true">
      {connected &&
        DOTS.map((d, i) => (
          <line key={`l${i}`} x1="81" y1="50" x2={d.x} y2={d.y} stroke={stroke} strokeWidth="1.2" opacity="0.5" />
        ))}
      {DOTS.map((d, i) => (
        <rect
          key={i}
          x={d.x - 12}
          y={d.y - 9}
          width="24"
          height="18"
          rx="5"
          fill="none"
          stroke={stroke}
          strokeWidth="1.4"
          opacity={connected ? 0.85 : 0.7}
        />
      ))}
      {connected && <circle cx="81" cy="50" r="12" fill="var(--flash)" />}
    </svg>
  );
}
