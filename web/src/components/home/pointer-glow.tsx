"use client";

import { useEffect } from "react";

/**
 * Karten-Effekt aus Entwurf A: ein weicher Lichtschein folgt dem Mauszeiger
 * über der Karte (--mx/--my). Läuft nur auf Zeigergeräten und pausiert bei
 * reduzierter Bewegung. Ein Listener am Dokument statt einer pro Karte.
 */
export function PointerGlow({ selector }: { selector: string }) {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const onMove = (e: PointerEvent) => {
      const card = (e.target as Element | null)?.closest?.(selector) as HTMLElement | null;
      if (!card) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${(((e.clientX - r.left) / r.width) * 100).toFixed(1)}%`);
        card.style.setProperty("--my", `${(((e.clientY - r.top) / r.height) * 100).toFixed(1)}%`);
      });
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("pointermove", onMove);
    };
  }, [selector]);

  return null;
}
