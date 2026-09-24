"use client";

import Image from "next/image";
import { AnimatePresence, useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import { useEffect, useMemo, useState } from "react";
import type { TaggedLogo } from "@/lib/sanity/logos";

const HOLD_MS = 800;
const SWAP_S = 0.22;
const IMG_H = 26;

type CycleItem = {
  key: string;
  name: string;
  url?: string;
  width: number;
  height: number;
};

const PLACEHOLDERS: CycleItem[] = [
  { key: "ph-0", name: "", width: 96, height: IMG_H },
  { key: "ph-1", name: "", width: 72, height: IMG_H },
  { key: "ph-2", name: "", width: 110, height: IMG_H },
  { key: "ph-3", name: "", width: 84, height: IMG_H },
];

function parseText(text: string) {
  const match = text.match(/\{([^}]+)\}/);
  if (!match || match.index === undefined) {
    return { prefix: text, tag: null as string | null, suffix: "" };
  }
  return {
    prefix: text.slice(0, match.index),
    tag: match[1],
    suffix: text.slice(match.index + match[0].length),
  };
}

/**
 * Inline-Logo-Zyklus: in `text` steht ein `{tag}`; alle Logos mit diesem Tag
 * wechseln nacheinander im Slot (runter/raus, von unten rein). Hover und Fokus
 * halten an; ohne Treffer laufen Platzhalter.
 */
export function LogoCycle({ text, logos }: { text: string; logos: TaggedLogo[] }) {
  const { prefix, tag, suffix } = useMemo(() => parseText(text), [text]);
  const items = useMemo((): CycleItem[] => {
    if (!tag) return PLACEHOLDERS;
    const matched = logos
      .filter((logo) => logo.tags.includes(tag))
      .map((logo) => ({
        key: logo.url,
        name: logo.name,
        url: logo.url,
        width: logo.width,
        height: logo.height,
      }));
    return matched.length > 0 ? matched : PLACEHOLDERS;
  }, [tag, logos]);

  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [hoverPaused, setHoverPaused] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);

  useEffect(() => {
    const onVis = () => setTabHidden(document.hidden);
    onVis();
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  const paused = Boolean(reduce) || hoverPaused || tabHidden;
  const count = items.length;

  useEffect(() => {
    if (paused || count < 2) return;
    const id = window.setTimeout(() => {
      setIndex((i) => (i + 1) % count);
    }, HOLD_MS);
    return () => window.clearTimeout(id);
  }, [paused, count, index]);

  const current = items[index % count] ?? items[0];
  const named = items.map((item) => item.name).filter(Boolean);

  return (
    <p
      className="logo-cycle"
      tabIndex={0}
      onMouseEnter={() => setHoverPaused(true)}
      onMouseLeave={() => setHoverPaused(false)}
      onFocus={() => setHoverPaused(true)}
      onBlur={() => setHoverPaused(false)}
    >
      {prefix}
      <span className="logo-cycle__slot" aria-hidden="true">
        <AnimatePresence mode="wait" initial={false}>
          <m.span
            key={current.key}
            className="logo-cycle__mark"
            initial={reduce ? false : { opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: "100%" }}
            transition={
              reduce
                ? { duration: 0 }
                : {
                    y: { duration: SWAP_S, ease: [0.22, 1, 0.36, 1] },
                    opacity: { duration: SWAP_S * 0.75, ease: "easeOut" },
                  }
            }
          >
            {current.url ? (
              <Image
                src={current.url}
                alt=""
                width={Math.round((IMG_H * current.width) / current.height)}
                height={IMG_H}
                unoptimized
              />
            ) : (
              <span
                className="logo-cycle__ph"
                style={{ width: current.width }}
              />
            )}
          </m.span>
        </AnimatePresence>
      </span>
      {suffix}
      {named.length > 0 && (
        <span className="logo-cycle__sr">
          {named.join(", ")}
        </span>
      )}
    </p>
  );
}
