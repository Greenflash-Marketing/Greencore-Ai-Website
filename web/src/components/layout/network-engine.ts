/* ==========================================================================
   Animierter Netzwerk-Hintergrund „Einblick" (aus Entwurf A, Version 8)

   Die Vernetzung ist nicht dauerhaft gleich stark sichtbar, sondern erscheint
   dort, wo der Nutzer hinschaut – wie ein Blick in die Software.
   - Desktop: das Fenster folgt dem Mauszeiger
   - Touch: die Bildmitte übernimmt diese Rolle und wandert beim Scrollen mit
   - Das Netz liegt fest hinter der Seite und scrollt nicht mit. Wie stark es
     durchscheint, steuert die Deckkraft der Bänder (siehe globals.css).

   Performance-Leitplanken (CLAUDE.md): devicePixelRatio ≤ 1.5 · Maske in
   halber Auflösung · Pause bei inaktivem Tab · Standbild bei
   prefers-reduced-motion und schwachen Geräten · Knotenzahl nach Viewport ·
   Nachbarschaftssuche über Raster
   ========================================================================== */

type Surface = "silver" | "dark";
type NetNode = { x: number; y: number; vx: number; vy: number; r: number };
type Pulse = { a: number; b: number; t: number; speed: number };

// Auf Silber tragen die dunklen Akzente, auf Dunkel die hellen. Das Netz
// zeichnet kräftig, weil davor eine fast deckende Fläche liegt.
const PALETTE: Record<Surface, { link: string; node: string; pulse: string; base: number }> = {
  silver: { link: "3, 112, 69", node: "3, 112, 69", pulse: "90, 107, 214", base: 0.62 },
  dark: { link: "103, 214, 69", node: "159, 245, 93", pulse: "159, 245, 93", base: 0.95 },
};

type NavigatorExtras = Navigator & {
  deviceMemory?: number;
  connection?: { effectiveType?: string };
};

/** Startet die Animation auf dem Canvas und gibt eine Aufräumfunktion zurück. */
export function startNetwork(canvas: HTMLCanvasElement): () => void {
  const ctx = canvas.getContext("2d", { alpha: true });
  const mask = document.createElement("canvas");
  const mctx = mask.getContext("2d");
  if (!ctx || !mctx) return () => {};

  const nav = navigator as NavigatorExtras;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const memory = nav.deviceMemory ?? 8;
  const connection = nav.connection?.effectiveType;
  const weakDevice = memory <= 2 || connection === "slow-2g" || connection === "2g";
  const staticOnly = reduceMotion || weakDevice;

  let width = 0;
  let height = 0;
  let dpr = 1;
  let nodes: NetNode[] = [];
  let pulses: Pulse[] = [];
  let rafId: number | null = null;
  let lastFrame = 0;

  let surface: Surface = "silver";
  let spotX = -9999;
  let spotY = -9999;
  let spotR = 300;
  let spotEase = 0;

  const nodeCount = () => {
    const area = width * height;
    if (width < 700) return Math.round(Math.min(30, area / 14000));
    if (width < 1200) return Math.round(Math.min(58, area / 13000));
    return Math.round(Math.min(84, area / 12500));
  };

  const linkDistance = () => (width < 700 ? 116 : 150);

  const makeNode = (): NetNode => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.014,
    vy: (Math.random() - 0.5) * 0.014,
    r: 1.3 + Math.random() * 1.5,
  });

  function spawnPulse() {
    if (nodes.length < 2) return;
    const a = Math.floor(Math.random() * nodes.length);
    let b = Math.floor(Math.random() * nodes.length);
    if (a === b) b = (b + 1) % nodes.length;
    pulses.push({ a, b, t: 0, speed: 0.0005 + Math.random() * 0.0009 });
  }

  function build() {
    nodes = Array.from({ length: nodeCount() }, makeNode);
    pulses = [];
    if (!staticOnly) {
      const seed = Math.max(3, Math.round(nodes.length / 10));
      for (let i = 0; i < seed; i++) spawnPulse();
    }
    drawFrame();
  }

  /* Untergrund unter dem Fenster: dunkles Band oder Silberfläche. Wird nur bei
     Bewegung ausgewertet, nicht in jedem Frame. Ohne Zeiger gilt die Bildmitte. */
  function readSurface() {
    const px = spotX > -9000 ? spotX : width / 2;
    const py = spotY > -9000 ? spotY : height * 0.5;
    const el = document.elementFromPoint(
      Math.min(width - 2, Math.max(2, px)),
      Math.min(height - 2, Math.max(2, py)),
    );
    if (!el) return;
    const band = el.closest("[data-surface]");
    surface = band?.getAttribute("data-surface") === "dark" ? "dark" : "silver";
  }

  function forEachNeighbourPair(cb: (a: NetNode, b: NetNode, d: number, max: number) => void) {
    const max = linkDistance();
    const cols = Math.max(1, Math.ceil(width / max));
    const rows = Math.max(1, Math.ceil(height / max));
    const buckets: number[][] = new Array(cols * rows);

    nodes.forEach((n, i) => {
      const cx = Math.min(cols - 1, Math.max(0, Math.floor(n.x / max)));
      const cy = Math.min(rows - 1, Math.max(0, Math.floor(n.y / max)));
      (buckets[cy * cols + cx] ??= []).push(i);
    });

    for (let cy = 0; cy < rows; cy++) {
      for (let cx = 0; cx < cols; cx++) {
        const here = buckets[cy * cols + cx];
        if (!here) continue;
        for (let ny = cy; ny <= cy + 1; ny++) {
          for (let nx = cx - 1; nx <= cx + 1; nx++) {
            if (ny === cy && nx < cx) continue;
            if (nx < 0 || nx >= cols || ny >= rows) continue;
            const there = buckets[ny * cols + nx];
            if (!there) continue;
            for (const ai of here) {
              for (const bi of there) {
                if (ai >= bi) continue;
                const a = nodes[ai];
                const b = nodes[bi];
                const d = Math.hypot(a.x - b.x, a.y - b.y);
                if (d <= max) cb(a, b, d, max);
              }
            }
          }
        }
      }
    }
  }

  function drawNetwork(c: CanvasRenderingContext2D) {
    const p = PALETTE[surface];
    const strong = surface === "silver" ? 0.9 : 0.75;

    c.lineWidth = 1;
    forEachNeighbourPair((a, b, d, max) => {
      const alpha = (1 - d / max) * strong;
      if (alpha < 0.015) return;
      c.strokeStyle = `rgba(${p.link},${alpha.toFixed(3)})`;
      c.beginPath();
      c.moveTo(a.x, a.y);
      c.lineTo(b.x, b.y);
      c.stroke();
    });

    c.fillStyle = `rgba(${p.node},${(strong + 0.12).toFixed(3)})`;
    for (const n of nodes) {
      c.beginPath();
      c.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      c.fill();
    }

    const max = linkDistance();
    for (const pl of pulses) {
      const a = nodes[pl.a];
      const b = nodes[pl.b];
      if (!a || !b || Math.hypot(a.x - b.x, a.y - b.y) > max) continue;
      const x = a.x + (b.x - a.x) * pl.t;
      const y = a.y + (b.y - a.y) * pl.t;

      const glow = c.createRadialGradient(x, y, 0, x, y, 14);
      glow.addColorStop(0, `rgba(${p.pulse},0.5)`);
      glow.addColorStop(1, `rgba(${p.pulse},0)`);
      c.fillStyle = glow;
      c.beginPath();
      c.arc(x, y, 14, 0, Math.PI * 2);
      c.fill();

      c.fillStyle = `rgba(${p.pulse},0.9)`;
      c.beginPath();
      c.arc(x, y, 2, 0, Math.PI * 2);
      c.fill();
    }
  }

  /* Maske: Grundhelligkeit je Untergrund plus das Fenster am Zeiger.
     Halbe Auflösung reicht – die Kanten sind ohnehin weich. */
  function applyMask(c: CanvasRenderingContext2D, m: CanvasRenderingContext2D) {
    const base = PALETTE[surface].base;

    m.setTransform(1, 0, 0, 1, 0, 0);
    m.clearRect(0, 0, mask.width, mask.height);
    m.scale(0.5 * dpr, 0.5 * dpr);

    m.fillStyle = `rgba(0,0,0,${base.toFixed(3)})`;
    m.fillRect(0, 0, width, height);

    if (spotEase > 0.01 && spotX > -9000) {
      const g = m.createRadialGradient(spotX, spotY, 0, spotX, spotY, spotR);
      const peak = Math.min(1, base + spotEase);
      g.addColorStop(0, `rgba(0,0,0,${peak.toFixed(3)})`);
      g.addColorStop(0.55, `rgba(0,0,0,${(peak * 0.55).toFixed(3)})`);
      g.addColorStop(1, "rgba(0,0,0,0)");
      m.globalCompositeOperation = "lighter";
      m.fillStyle = g;
      m.beginPath();
      m.arc(spotX, spotY, spotR, 0, Math.PI * 2);
      m.fill();
      m.globalCompositeOperation = "source-over";
    }

    c.globalCompositeOperation = "destination-in";
    c.setTransform(1, 0, 0, 1, 0, 0);
    c.drawImage(mask, 0, 0, mask.width, mask.height, 0, 0, width * dpr, height * dpr);
    c.setTransform(dpr, 0, 0, dpr, 0, 0);
    c.globalCompositeOperation = "source-over";
  }

  function drawFrame() {
    ctx!.clearRect(0, 0, width, height);
    drawNetwork(ctx!);
    applyMask(ctx!, mctx!);
  }

  function step(now: number) {
    const delta = Math.min(now - lastFrame, 48);
    lastFrame = now;

    for (const n of nodes) {
      n.x += n.vx * delta;
      n.y += n.vy * delta;
      if (n.x < -30) n.x = width + 30;
      if (n.x > width + 30) n.x = -30;
      if (n.y < -30) n.y = height + 30;
      if (n.y > height + 30) n.y = -30;
    }

    for (let i = pulses.length - 1; i >= 0; i--) {
      pulses[i].t += pulses[i].speed * delta;
      if (pulses[i].t >= 1) {
        pulses.splice(i, 1);
        spawnPulse();
      }
    }

    // Fenster blendet weich ein und aus
    const wanted = spotX > -9000 ? 1 : 0;
    spotEase += (wanted - spotEase) * 0.06;

    drawFrame();
    rafId = window.requestAnimationFrame(step);
  }

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

    mask.width = Math.floor(width * dpr * 0.5);
    mask.height = Math.floor(height * dpr * 0.5);

    spotR = width < 700 ? 240 : 330;
    // Vor der ersten Zeigerbewegung liegt das Fenster in der Bildmitte –
    // am Desktop etwas schwächer, damit der Zeiger danach den Unterschied macht.
    if (spotX < -9000) {
      spotX = width / 2;
      spotY = height * 0.5;
      spotEase = canHover ? 0.5 : 1;
    }

    build();
  }

  function start() {
    if (staticOnly || rafId !== null) return;
    lastFrame = performance.now();
    rafId = window.requestAnimationFrame(step);
  }

  function stop() {
    if (rafId !== null) {
      window.cancelAnimationFrame(rafId);
      rafId = null;
    }
  }

  // --- Ereignisse (alle werden in der Aufräumfunktion wieder entfernt) ---
  const listeners: Array<() => void> = [];
  function on<K extends keyof WindowEventMap>(
    target: Window | Document,
    type: K | "scroll" | "visibilitychange",
    fn: EventListener,
    opts?: AddEventListenerOptions,
  ) {
    target.addEventListener(type, fn, opts);
    listeners.push(() => target.removeEventListener(type, fn, opts));
  }

  let surfTicking = false;
  const onScrollSurface = () => {
    if (surfTicking) return;
    surfTicking = true;
    window.requestAnimationFrame(() => {
      if (!canHover) {
        spotX = width / 2;
        spotY = height * 0.52;
      }
      readSurface();
      surfTicking = false;
    });
  };

  if (!staticOnly) {
    if (canHover) {
      on(window, "pointermove", ((e: PointerEvent) => {
        spotX = e.clientX;
        spotY = e.clientY;
        readSurface();
      }) as EventListener, { passive: true });
      on(document, "pointerleave", () => {
        spotX = -9999;
        spotY = -9999;
      });
    }
    // Capture-Phase am Dokument: erfasst auch scrollende Eltern-Elemente
    on(document, "scroll", onScrollSurface, { capture: true, passive: true });
  }

  let resizeTimer: number | undefined;
  on(window, "resize", () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(resize, 180);
  });

  on(document, "visibilitychange", () => (document.hidden ? stop() : start()));

  resize();
  readSurface();
  start();

  return () => {
    stop();
    window.clearTimeout(resizeTimer);
    listeners.forEach((off) => off());
  };
}
