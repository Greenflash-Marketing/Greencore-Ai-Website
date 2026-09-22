"use client";

import { LazyMotion, MotionConfig } from "motion/react";

const loadFeatures = () => import("./features").then((mod) => mod.default);

/**
 * Zentrale motion.dev-Einstellungen fuer die ganze Seite.
 *
 * - reducedMotion="user": Wer im Betriebssystem reduzierte Bewegung eingestellt
 *   hat, bekommt keine Bewegungs-Animationen (Leitplanke aus CLAUDE.md).
 * - LazyMotion: Eigener Code nutzt die schlanke `m`-Komponente
 *   (`import * as m from "motion/react-m"`). Bewusst OHNE `strict` –
 *   Komponenten aus 21st.dev verwenden meist `motion.div` und wuerden sonst
 *   einen Fehler werfen.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={loadFeatures}>{children}</LazyMotion>
    </MotionConfig>
  );
}
