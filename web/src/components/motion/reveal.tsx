"use client";

import * as m from "motion/react-m";
import { useSyncExternalStore, type ComponentPropsWithoutRef } from "react";

type RevealTag = "div" | "p" | "figure" | "article" | "li" | "ol" | "ul";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Verzoegerung in Sekunden, z. B. fuer gestaffelte Kacheln */
  delay?: number;
  /** Element, das die Klasse traegt – kein zusaetzlicher Wrapper. */
  as?: RevealTag;
} & Omit<ComponentPropsWithoutRef<"div">, "children" | "className">;

const MotionTag = {
  div: m.div,
  p: m.p,
  figure: m.figure,
  article: m.article,
  li: m.li,
  ol: m.ol,
  ul: m.ul,
} as const;

const REDUCE_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReduce(onStoreChange: () => void) {
  const mq = window.matchMedia(REDUCE_QUERY);
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

function getReduceSnapshot() {
  return window.matchMedia(REDUCE_QUERY).matches;
}

function getReduceServerSnapshot() {
  return false;
}

/**
 * Einfacher Einblende-Effekt beim Hineinscrollen – laut CLAUDE.md sollen
 * Abschnitte bewusst nur mit einfachen Effekten animiert werden, weil der
 * animierte Hintergrund bereits Bewegung liefert.
 *
 * Nicht fuer den Hero verwenden: Inhalte im ersten Bildschirm muessen sofort
 * sichtbar sein, sonst leidet der LCP.
 *
 * Bei prefers-reduced-motion bleibt der Inhalt sichtbar (CSS-Fallback + kein
 * initiales Verstecken), damit Hydration nichts dauerhaft unsichtbar laesst.
 */
export function Reveal({ children, className, delay = 0, as = "div", ...rest }: RevealProps) {
  const reduce = useSyncExternalStore(subscribeReduce, getReduceSnapshot, getReduceServerSnapshot);
  const Tag = MotionTag[as];
  const mergedClass = className ? `reveal ${className}` : "reveal";

  return (
    <Tag
      className={mergedClass}
      initial={reduce ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: reduce ? 0 : 0.5, delay: reduce ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
