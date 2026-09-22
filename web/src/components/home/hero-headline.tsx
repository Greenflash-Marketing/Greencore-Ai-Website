"use client";

import { useEffect, useRef } from "react";

/**
 * H1 mit Verlaufsschrift (Brand-Bundle: zeigerreaktiver Verlauf im Hero).
 * Desktop: der Verlauf folgt dem Mauszeiger. Touch: einmaliger Sweep nach
 * dem Laden. Bei reduzierter Bewegung bleibt er stehen.
 */
export function HeroHeadline({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const set = (p: number) => el.style.setProperty("--x1", `${(p * 100 - 45).toFixed(1)}%`);

    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      let frame = 0;
      const onMove = (e: PointerEvent) => {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => set(e.clientX / window.innerWidth));
      };
      window.addEventListener("pointermove", onMove, { passive: true });
      return () => {
        cancelAnimationFrame(frame);
        window.removeEventListener("pointermove", onMove);
      };
    }

    const start = performance.now();
    let frame = requestAnimationFrame(function sweep(now) {
      const p = Math.min(1, (now - start) / 2200);
      set(p);
      if (p < 1) frame = requestAnimationFrame(sweep);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <h1 ref={ref} className="hero__title">
      {children}
    </h1>
  );
}
