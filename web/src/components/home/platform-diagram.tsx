const ASSETS = ["PV", "Speicher", "Ladepunkte", "Verbrauch"];

const W = 330;
const SLOT = W / ASSETS.length;
const BOX_W = 68;
const BOX_TOP = 8;
const BOX_H = 38;
const LABEL_Y = 62;
const DROP_TOP = 70;
const BAR_TOP = 88;
const BAR_H = 26;
const OUT_TOP = BAR_TOP + BAR_H;
const MARKET_TOP = 132;

const centerOf = (index: number) => SLOT * index + SLOT / 2;

/**
 * Grafik im Kopf der Vergleichskarten.
 *
 * Links vier Anlagen, jede mit eigener Messkurve und ohne Verbindung
 * untereinander. Rechts dieselben Anlagen auf einer gemeinsamen Ebene, mit
 * einer Linie zum Strommarkt. Der Unterschied zwischen den Karten ist damit
 * die Aussage des Abschnitts.
 */
export function CardDiagram({ connected }: { connected?: boolean }) {
  return (
    <svg className="card__diagram" viewBox={`0 0 ${W} ${connected ? 162 : 120}`} aria-hidden="true">
      {ASSETS.map((asset, i) => {
        const center = centerOf(i);
        const left = center - BOX_W / 2;
        return (
          <g key={asset}>
            <rect
              className={connected ? "cd__box cd__box--on" : "cd__box"}
              x={left}
              y={BOX_TOP}
              width={BOX_W}
              height={BOX_H}
              rx="8"
            />
            <path
              className={connected ? "cd__spark cd__spark--on" : "cd__spark"}
              d={`M${left + 12} ${BOX_TOP + 26} L${left + 24} ${BOX_TOP + 14}
                  L${left + 36} ${BOX_TOP + 21} L${left + 56} ${BOX_TOP + 9}`}
            />
            <text className="cd__label" x={center} y={LABEL_Y} textAnchor="middle">
              {asset}
            </text>
            {connected && (
              <line className="cd__drop" x1={center} y1={DROP_TOP} x2={center} y2={BAR_TOP} />
            )}
          </g>
        );
      })}

      {connected ? (
        <>
          <rect className="cd__bar" x="8" y={BAR_TOP} width={W - 16} height={BAR_H} rx="8" />
          <text className="cd__bartext" x={W / 2} y={BAR_TOP + 17} textAnchor="middle">
            Greencore AI
          </text>
          <line className="cd__out" x1={W / 2} y1={OUT_TOP} x2={W / 2} y2={MARKET_TOP} />
          <text className="cd__label" x={W / 2} y={MARKET_TOP + 14} textAnchor="middle">
            Strommarkt
          </text>
        </>
      ) : (
        <text className="cd__note" x={W / 2} y="96" textAnchor="middle">
          vier Systeme, vier Oberflächen
        </text>
      )}
    </svg>
  );
}
