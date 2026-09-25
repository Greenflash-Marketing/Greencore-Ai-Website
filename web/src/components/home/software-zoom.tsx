"use client";

import { useEffect, useRef, useState } from "react";
import type { SoftwareInsights } from "@/lib/sanity/home";
import { Reveal } from "@/components/motion/reveal";
import { stagger } from "@/components/motion/stagger";

const DEMO_SRC = "/software-demo/index.html#/";

/**
 * 2 — Software-Einblick mit Scroll-Zoom (Header-Scroll-Konzept, CLAUDE.md).
 *
 * Desktop: EIN angehefteter Bereich (position: sticky), die Scroll-Position
 * steuert den Zoom 1:1 – kein Scroll-Hijacking, Zurückscrollen spult zurück.
 * Gerät und iframe bleiben stets bei der Endgröße; sichtbar wird per
 * transform: scale verkleinert/vergrößert, damit die Demo nicht umbricht.
 *
 * Mobil / reduzierte Bewegung: kein Anheften; Tippen öffnet das Vollbild.
 * Die Demo läuft im iframe und wird erst geladen, wenn die Spur nah ist.
 */
export function SoftwareZoom({ intro }: { intro?: SoftwareInsights }) {
  const track = useRef<HTMLDivElement>(null);
  const device = useRef<HTMLDivElement>(null);
  const screen = useRef<HTMLDivElement>(null);
  const [fullscreen, setFullscreen] = useState(false);
  const [demoInView, setDemoInView] = useState(false);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setDemoInView(entry.isIntersecting),
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const pinned = window.matchMedia("(min-width: 1001px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const root = document.documentElement;
    let frame = 0;

    const reset = () => {
      device.current?.style.removeProperty("width");
      screen.current?.style.removeProperty("height");
      device.current?.style.setProperty("--p", "0");
      device.current?.style.setProperty("--scale", "1");
      delete device.current?.dataset.live;
      delete root.dataset.navHidden;
    };

    const update = () => {
      frame = 0;
      const el = track.current;
      if (!el || !device.current || !screen.current) return;
      if (!pinned.matches || reduce.matches) return reset();

      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const raw = total > 0 ? Math.min(Math.max(-rect.top, 0), total) / total : 0;

      // 0 → 0.45 hineinzoomen · bis 0.75 halten · danach herauszoomen
      const p = Math.max(0, Math.min(1, raw < 0.45 ? raw / 0.45 : raw < 0.75 ? 1 : 1 - (raw - 0.75) / 0.25));

      const vw = window.innerWidth;
      const vh = window.innerHeight;
      // Endgröße = Layoutgröße des iframes (Angular rechnet immer damit)
      const finalW = vw - 36;
      const finalH = vh - 88;
      const startW = Math.min(760, vw * 0.86);
      const scale = startW / finalW + (1 - startW / finalW) * p;

      device.current.style.width = `${finalW}px`;
      screen.current.style.height = `${finalH}px`;
      device.current.style.setProperty("--p", p.toFixed(3));
      device.current.style.setProperty("--scale", scale.toFixed(4));

      if (p > 0.92) device.current.dataset.live = "";
      else delete device.current.dataset.live;

      if (p > 0.55) root.dataset.navHidden = "";
      else delete root.dataset.navHidden;
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    pinned.addEventListener("change", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      pinned.removeEventListener("change", schedule);
      delete root.dataset.navHidden;
    };
  }, []);

  useEffect(() => {
    if (!fullscreen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setFullscreen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [fullscreen]);

  // Vollbild nur dort, wo nicht angeheftet wird (mobil)
  const toggleFullscreen = () => {
    if (!window.matchMedia("(min-width: 1001px)").matches) setFullscreen((f) => !f);
  };

  return (
    <section className="zoom band--silver" id="plattform" data-surface="silver">
      <div className="zoom__intro">
        {(intro?.kicker || intro?.headline) && (
          <Reveal className="band__head">
            {intro?.kicker && <span className="kicker">{intro.kicker}</span>}
            {intro?.headline && <h2 className="band__title">{intro.headline}</h2>}
          </Reveal>
        )}
        {intro?.lede && (
          <Reveal as="p" className="band__lede" delay={stagger(1)}>
            {intro.lede}
          </Reveal>
        )}
      </div>

      <div className="zoom__track" ref={track}>
        <div className="zoom__stage">
          <div className="zoom__device" ref={device}>
            <div
              className={fullscreen ? "tablet is-fullscreen" : "tablet"}
              onClick={toggleFullscreen}
            >
              <div className="tablet__screen tablet__screen--live" ref={screen}>
                {demoInView && (
                  <iframe
                    className="tablet__demo"
                    src={DEMO_SRC}
                    title="Greencore AI"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    sandbox="allow-scripts allow-same-origin"
                  />
                )}
              </div>
              {fullscreen && (
                <button
                  type="button"
                  className="tablet__close"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFullscreen(false);
                  }}
                >
                  Schließen
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
