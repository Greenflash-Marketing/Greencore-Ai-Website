"use client";

import { useEffect, useRef } from "react";
import { useLocale } from "next-intl";
import { parseStat } from "@/lib/parse-stat";

/**
 * Zählt eine Kennzahl beim Hineinscrollen einmal hoch (1,3 s, ease-out).
 * Der Server liefert den Endwert – ohne JavaScript oder bei reduzierter
 * Bewegung bleibt er einfach stehen.
 */
export function CountUp({ value }: { value: string }) {
  const locale = useLocale();
  const ref = useRef<HTMLSpanElement>(null);
  const stat = parseStat(value);
  const format = (n: number) =>
    stat
      ? stat.prefix +
        n.toLocaleString(locale, {
          minimumFractionDigits: stat.decimals,
          maximumFractionDigits: stat.decimals,
        }) +
        stat.suffix
      : value;

  useEffect(() => {
    const el = ref.current;
    if (!el || !stat || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / 1300);
          el.textContent = format(stat.value * (1 - Math.pow(1 - p, 3)));
          if (p < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
    // format hängt nur von value/locale ab
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, locale]);

  return <span ref={ref}>{stat ? format(stat.value) : value}</span>;
}
