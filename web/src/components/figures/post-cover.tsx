/**
 * Ersatzmotiv fuer Kacheln ohne Bild.
 *
 * Statt einer gestrichelten Attrappe steht hier ein ruhiges Liniengeflecht in
 * den Markenfarben – dieselbe Idee wie im Logo: Knoten, die verbunden sind.
 * Aus dem Titel wird ein Zahlenwert abgeleitet, damit zwei Kacheln
 * nebeneinander nicht identisch aussehen.
 */
function seedFrom(text: string) {
  let seed = 0;
  for (let i = 0; i < text.length; i += 1) {
    seed = (seed * 31 + text.charCodeAt(i)) % 100000;
  }
  return seed;
}

/** Einfacher, wiederholbarer Zufall – gleicher Titel, gleiches Bild. */
function makeRandom(seed: number) {
  let value = seed || 1;
  return () => {
    value = (value * 1103515245 + 12345) % 2147483648;
    return value / 2147483648;
  };
}

export function PostCover({ title, tag }: { title: string; tag?: string }) {
  const random = makeRandom(seedFrom(title));
  const nodes = Array.from({ length: 11 }, () => ({
    x: 16 + random() * 288,
    y: 16 + random() * 148,
  }));

  const links: [number, number][] = [];
  nodes.forEach((node, i) => {
    let nearest = -1;
    let best = Infinity;
    nodes.forEach((other, j) => {
      if (i === j) return;
      const distance = (node.x - other.x) ** 2 + (node.y - other.y) ** 2;
      if (distance < best) {
        best = distance;
        nearest = j;
      }
    });
    if (nearest > i) links.push([i, nearest]);
  });

  return (
    <div className="post-cover">
      <svg viewBox="0 0 320 180" role="img" aria-label={title}>
        {links.map(([a, b]) => (
          <line
            key={`${a}-${b}`}
            x1={nodes[a].x}
            y1={nodes[a].y}
            x2={nodes[b].x}
            y2={nodes[b].y}
            className="post-cover__link"
          />
        ))}
        {nodes.map((node, i) => (
          <circle
            key={i}
            cx={node.x}
            cy={node.y}
            r={i % 4 === 0 ? 4 : 2.4}
            className={i % 4 === 0 ? "post-cover__node post-cover__node--on" : "post-cover__node"}
          />
        ))}
        {tag && (
          <text className="post-cover__tag" x="16" y="166">
            {tag}
          </text>
        )}
      </svg>
    </div>
  );
}
