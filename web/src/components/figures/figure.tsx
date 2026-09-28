import { FIGURES, type FigureKey } from "./specs";

const W = 320;
const H = 176;
const PAD = { top: 30, right: 14, bottom: 26, left: 14 };
const PLOT_H = H - PAD.top - PAD.bottom;
const PLOT_W = W - PAD.left - PAD.right;

const TONE = {
  ink: "var(--ultra)",
  accent: "var(--dark-flash)",
  muted: "var(--silver-base)",
  cool: "var(--lilac)",
} as const;

export type Tone = keyof typeof TONE;

export type Series = {
  points: number[];
  tone?: Tone;
  /** Flaeche unter der Linie statt reiner Linie */
  area?: boolean;
  dashed?: boolean;
};

export type FigureSpec = {
  /** Mono-Zeile ueber der Zeichnung – sagt, was zu sehen ist */
  caption: string;
  series?: Series[];
  bars?: { value: number; label: string; accent?: boolean }[];
  /** Waagerechte Marke, z. B. ein Zielwert oder die Anschlussgrenze */
  threshold?: { at: number; label: string };
  /** Hervorgehobene Zeitfenster, Werte als Anteil der Breite (0–1) */
  windows?: { from: number; to: number; label?: string; tone?: "accent" | "cool" }[];
  /** Beschriftung links und rechts unter der Zeichnung */
  axis?: [string, string];
  /** Null-Linie einzeichnen (fuer Werte, die negativ werden) */
  zeroAt?: number;
};

const x = (i: number, count: number) => PAD.left + (PLOT_W * i) / Math.max(1, count - 1);
const y = (value: number) => PAD.top + PLOT_H * (1 - Math.min(1, Math.max(0, value)));

function line(points: number[]) {
  return points.map((p, i) => `${i === 0 ? "M" : "L"}${x(i, points.length).toFixed(1)} ${y(p).toFixed(1)}`).join(" ");
}

function areaPath(points: number[]) {
  const base = y(0);
  return `${line(points)} L${x(points.length - 1, points.length).toFixed(1)} ${base} L${PAD.left} ${base} Z`;
}

/**
 * Diagramm zu einem Anwendungsfall.
 *
 * Bewusst zurueckhaltend: duenne Linien auf Silber, Mono-Beschriftung wie an
 * einem Messgeraet und genau eine gruene Akzentfarbe fuer die Aussage, um die
 * es geht. Die Kurven sind schematisch und zeigen den Mechanismus – sie sind
 * keine Messdaten und behaupten keine konkreten Werte.
 */
export function Figure({ name, label }: { name: FigureKey; label?: string }) {
  // satisfies haelt die Schluessel fest, liefert aber je Eintrag den engen Literal-Typ.
  const spec: FigureSpec | undefined = FIGURES[name];
  if (!spec) return null;

  return (
    <figure className="figure">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={label ?? spec.caption}>
        <text className="figure__caption" x={PAD.left} y={16}>
          {spec.caption}
        </text>

        <g className="figure__grid">
          {[0.25, 0.5, 0.75].map((t) => (
            <line key={t} x1={PAD.left} x2={W - PAD.right} y1={y(t)} y2={y(t)} />
          ))}
          <line x1={PAD.left} x2={W - PAD.right} y1={y(spec.zeroAt ?? 0)} y2={y(spec.zeroAt ?? 0)} />
        </g>

        {spec.windows?.map((win, i) => (
          <g key={`w${i}`}>
            <rect
              className={`figure__window${win.tone === "cool" ? " figure__window--cool" : ""}`}
              x={PAD.left + PLOT_W * win.from}
              width={PLOT_W * (win.to - win.from)}
              y={PAD.top}
              height={PLOT_H}
            />
            {win.label && (
              <text
                className="figure__tick"
                x={PAD.left + PLOT_W * win.from + 4}
                y={PAD.top + 12}
              >
                {win.label}
              </text>
            )}
          </g>
        ))}

        {spec.bars?.map((bar, i, all) => {
          const slot = PLOT_W / all.length;
          const width = Math.min(46, slot * 0.56);
          const left = PAD.left + slot * i + (slot - width) / 2;
          return (
            <g key={`b${i}`}>
              <rect
                className={`figure__bar${bar.accent ? " figure__bar--accent" : ""}`}
                x={left}
                width={width}
                y={y(bar.value)}
                height={Math.max(1, y(0) - y(bar.value))}
                rx="2"
              />
              <text className="figure__tick" x={left + width / 2} y={H - 8} textAnchor="middle">
                {bar.label}
              </text>
            </g>
          );
        })}

        {spec.series?.map((serie, i) =>
          serie.area ? (
            <path key={`a${i}`} className="figure__area" d={areaPath(serie.points)} />
          ) : (
            <path
              key={`l${i}`}
              className={`figure__line${serie.dashed ? " figure__line--dashed" : ""}`}
              d={line(serie.points)}
              stroke={TONE[serie.tone ?? "ink"]}
            />
          ),
        )}

        {spec.threshold && (
          <g>
            <line
              className="figure__threshold"
              x1={PAD.left}
              x2={W - PAD.right}
              y1={y(spec.threshold.at)}
              y2={y(spec.threshold.at)}
            />
            <text className="figure__tick" x={W - PAD.right} y={y(spec.threshold.at) - 5} textAnchor="end">
              {spec.threshold.label}
            </text>
          </g>
        )}

        {spec.axis && (
          <>
            <text className="figure__tick" x={PAD.left} y={H - 8}>
              {spec.axis[0]}
            </text>
            <text className="figure__tick" x={W - PAD.right} y={H - 8} textAnchor="end">
              {spec.axis[1]}
            </text>
          </>
        )}
      </svg>
    </figure>
  );
}
