/**
 * Grafik zur Gegenüberstellung: links getrennte Systeme ohne Verbindung,
 * rechts dieselben Anlagen an einer Plattform. Nimmt die Netz-Bildsprache der
 * Seite auf und macht das Argument sichtbar, statt es nur zu behaupten.
 */
export function PlatformDiagram({ labels }: { labels: { left: string; right: string } }) {
  const dots = [
    { x: 30, y: 30 },
    { x: 96, y: 24 },
    { x: 160, y: 38 },
    { x: 34, y: 96 },
    { x: 104, y: 104 },
    { x: 162, y: 92 },
  ];
  return (
    <div className="diagram" role="img" aria-label={`${labels.left} — ${labels.right}`}>
      <figure className="diagram__side">
        <svg viewBox="0 0 192 128" aria-hidden="true">
          {dots.map((d, i) => (
            <rect
              key={i}
              x={d.x - 14}
              y={d.y - 11}
              width="28"
              height="22"
              rx="6"
              fill="none"
              stroke="var(--silver-dark)"
              strokeWidth="1.5"
              opacity="0.75"
            />
          ))}
        </svg>
        <figcaption>{labels.left}</figcaption>
      </figure>

      <figure className="diagram__side diagram__side--connected">
        <svg viewBox="0 0 192 128" aria-hidden="true">
          {dots.map((d, i) => (
            <line
              key={`l${i}`}
              x1="96"
              y1="64"
              x2={d.x}
              y2={d.y}
              stroke="var(--flash)"
              strokeWidth="1.4"
              opacity="0.55"
            />
          ))}
          {dots.map((d, i) => (
            <rect
              key={`r${i}`}
              x={d.x - 14}
              y={d.y - 11}
              width="28"
              height="22"
              rx="6"
              fill="none"
              stroke="var(--flash)"
              strokeWidth="1.5"
              opacity="0.85"
            />
          ))}
          <circle cx="96" cy="64" r="15" fill="var(--flash)" />
        </svg>
        <figcaption>{labels.right}</figcaption>
      </figure>
    </div>
  );
}
