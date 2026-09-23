"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { SoftwareInsights } from "@/lib/sanity/home";
import { Kpi, Row } from "./autoplay-window";

/**
 * 2 — Software-Einblick mit Scroll-Zoom (Header-Scroll-Konzept, CLAUDE.md).
 *
 * Desktop: EIN angehefteter Bereich (position: sticky), die Scroll-Position
 * steuert den Zoom 1:1 – kein Scroll-Hijacking, Zurückscrollen spult zurück.
 * Breite und Höhe wachsen getrennt ins Bildschirmformat, damit nicht zu tief
 * in das Tablet hineingezoomt wird. Die Navigation tritt währenddessen zurück.
 *
 * Mobil / reduzierte Bewegung: kein Anheften; Tippen öffnet das Vollbild.
 */
export function SoftwareZoom({
  intro,
  screenshot,
}: {
  intro?: SoftwareInsights;
  screenshot?: string;
}) {
  const track = useRef<HTMLDivElement>(null);
  const device = useRef<HTMLDivElement>(null);
  const screen = useRef<HTMLDivElement>(null);
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    const pinned = window.matchMedia("(min-width: 1001px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const root = document.documentElement;
    let frame = 0;

    const reset = () => {
      device.current?.style.removeProperty("width");
      screen.current?.style.removeProperty("height");
      device.current?.style.setProperty("--p", "0");
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
      const startW = Math.min(760, vw * 0.86);
      const startH = 560; // Startgröße: muss zur Höhe in globals.css passen
      device.current.style.width = `${Math.round(startW + (vw - 36 - startW) * p)}px`;
      screen.current.style.height = `${Math.round(startH + (vh - 88 - startH) * p)}px`;
      device.current.style.setProperty("--p", p.toFixed(3));

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
        {intro?.kicker && <span className="kicker">{intro.kicker}</span>}
        {intro?.headline && <h2 className="band__title">{intro.headline}</h2>}
        {intro?.lede && <p className="band__lede">{intro.lede}</p>}
      </div>

      <div className="zoom__track" ref={track}>
        <div className="zoom__stage">
          <div className="zoom__device" ref={device}>
            <div
              className={fullscreen ? "tablet is-fullscreen" : "tablet"}
              onClick={toggleFullscreen}
            >
              <div className="tablet__screen" ref={screen}>
                {screenshot ? (
                  <Image src={screenshot} alt="" fill sizes="100vw" className="object-cover object-top" />
                ) : (
                  <MockDashboard />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ponytail: Beispiel-Oberfläche aus Entwurf A (nur Deutsch) – ersetzt, sobald im
// Studio ein Screenshot unter „1 — Header → Vollflächiger Software-Screenshot" liegt.
function MockDashboard() {
  const nav = ["Übersicht", "Simulation", "Optimierung", "Energiehandel", "Anlagen", "Berichte"];
  return (
    <>
      <aside className="ui-side" aria-hidden="true">
        <div className="ui-side__brand">
          <Image src="/brand/mark-only-on-dark-flash.svg" alt="" width={16} height={16} />
          <span>Greencore AI</span>
        </div>
        {nav.map((item, i) => (
          <div key={item} className="ui-nav-item" data-active={i === 0 || undefined}>
            <i className="ui-dot" /> {item}
          </div>
        ))}
      </aside>
      <div className="ui-main" aria-hidden="true">
        <div className="ui-topbar">
          <strong>Werk Nord · Lastmanagement</strong>
          <span className="ui-time">Live · 14:02</span>
        </div>
        <div className="ui-kpis">
          <Kpi label="Lastspitze heute" value="4,8 MW" />
          <Kpi label="Eigenverbrauch" value="78 %" positive />
          <Kpi label="Ersparnis Monat" value="12.400 €" positive />
        </div>
        <div className="ui-chart">
          <div className="ui-chart__head">
            <span>Lastgang &amp; Steuerung · 24 h</span>
            <div className="ui-legend">
              <span><i style={{ background: "#037045" }} />Last</span>
              <span><i style={{ background: "#9ff55d" }} />PV</span>
              <span><i style={{ background: "#5a6bd6" }} />Speicher</span>
            </div>
          </div>
          <svg viewBox="0 0 320 96">
            <g stroke="#bacad4" strokeWidth="0.5">
              <line x1="0" y1="24" x2="320" y2="24" />
              <line x1="0" y1="48" x2="320" y2="48" />
              <line x1="0" y1="72" x2="320" y2="72" />
            </g>
            <path d="M0 78 L26 70 L52 74 L78 52 L104 44 L130 50 L156 30 L182 36 L208 26 L234 40 L260 46 L286 58 L320 62 L320 96 L0 96 Z" fill="rgba(3,112,69,0.18)" />
            <path d="M0 78 L26 70 L52 74 L78 52 L104 44 L130 50 L156 30 L182 36 L208 26 L234 40 L260 46 L286 58 L320 62" fill="none" stroke="#037045" strokeWidth="2" />
            <path d="M0 92 L40 88 L80 66 L120 44 L160 34 L200 40 L240 58 L280 80 L320 90" fill="none" stroke="#9ff55d" strokeWidth="2" />
            <path d="M0 86 L40 84 L80 80 L120 68 L160 72 L200 60 L240 66 L280 76 L320 78" fill="none" stroke="#5a6bd6" strokeWidth="1.6" strokeDasharray="4 3" />
          </svg>
        </div>
        <div className="ui-rows">
          <Row a="Batteriespeicher 1" b="6,1 MWh · 82 %" badge="lädt" />
          <Row a="PV-Feld Süd" b="10,2 MWp · 3,4 MW" badge="Einspeisung" />
          <Row a="Ladepark Logistik" b="12 Punkte · 480 kW" badge="gedrosselt" idle />
        </div>
      </div>
    </>
  );
}
