"use client";

import * as m from "motion/react-m";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Verzoegerung in Sekunden, z. B. fuer gestaffelte Kacheln */
  delay?: number;
};

/**
 * Einfacher Einblende-Effekt beim Hineinscrollen – laut CLAUDE.md sollen
 * Abschnitte bewusst nur mit einfachen Effekten animiert werden, weil der
 * animierte Hintergrund bereits Bewegung liefert.
 *
 * Nicht fuer den Hero verwenden: Inhalte im ersten Bildschirm muessen sofort
 * sichtbar sein, sonst leidet der LCP.
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.38, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </m.div>
  );
}
