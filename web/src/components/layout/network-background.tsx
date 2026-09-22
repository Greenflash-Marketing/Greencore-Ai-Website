"use client";

import { useEffect, useRef } from "react";

/**
 * Canvas für den animierten Netzwerk-Hintergrund.
 *
 * Die Animationslogik wird erst geladen, wenn der Browser Luft hat
 * (requestIdleCallback) – sie blockiert damit weder das erste Rendern noch
 * den LCP (Leitplanke aus CLAUDE.md).
 */
export function NetworkBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let cleanup: (() => void) | undefined;
    let cancelled = false;

    const run = () =>
      import("./network-engine").then(({ startNetwork }) => {
        if (!cancelled && ref.current) cleanup = startNetwork(ref.current);
      });

    const hasIdle = "requestIdleCallback" in window;
    const handle = hasIdle
      ? window.requestIdleCallback(run, { timeout: 1500 })
      : window.setTimeout(run, 300);

    return () => {
      cancelled = true;
      if (hasIdle) window.cancelIdleCallback(handle);
      else window.clearTimeout(handle);
      cleanup?.();
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="network-bg" />;
}
