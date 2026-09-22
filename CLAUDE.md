# Greencore AI Website — Projektkontext

Diese Datei bündelt alle bisherigen Entscheidungen. Stand: nach Erhalt der
Produktstrategie-Präsentation (CEO/CTO), des Brand-Bundles vom UI/UX-Designer und
der finalisierten Sitemap/Homepage-Struktur.

## Claim, Vision, Mission, Value Proposition (Originalwortlaut aus der Strategie-Präsentation)

- **Claim:** "The leading operating system for industrial energy"
- **Vision:** Greencore AI ist Europas leistungsfähigstes Betriebssystem für die industrielle Energieversorgung.
- **Value Proposition:** Keine andere Plattform steuert die Kilowattstunde wirtschaftlicher als Greencore AI.
- **Mission:** Wir verbinden und optimieren die gesamte Behind-the-Meter-Energieversorgung von Industrieunternehmen auf einer Plattform. Von Erzeugung und Speicher über Verbrauch, Netz und Beschaffung bis Vermarktung von Flexibilitäten – automatisiert, intelligent und in Echtzeit.

## Markentrennung Greenflash / Greencore AI

- **Greenflash** = "End-to-end energy partner for industry": führt die Kundenbeziehung, orchestriert das Gesamtsystem, begleitet Kunden durch alle Phasen.
- **Greencore AI** = "The operating system for industrial energy": eigenständiges Produkt, wird auch in Projekten verbaut, die NICHT von Greenflash gebaut wurden.
- Greenflash-Bezug auf der Website nur als dezente Footer-Erwähnung ("footer whisper"), keine gleichwertige Co-Branding-Präsenz.

## Kommunikations-Leitplanken — unbedingt einhalten

- **Nach außen wird ausschließlich von "Greencore AI" gesprochen.** Intern getrennte Software-Bausteine werden öffentlich NICHT einzeln benannt — ihre Funktionen werden als Teil von "Greencore AI" kommuniziert. Beispiel: extern heißt es "Greencore AI berechnet Ihr Energiekonzept".
- **Elektrifizierung/Erneuerbare Energien = Greenflash-Thema.** Auf der Greencore-AI-Website liegt der Fokus auf **Flexibilisierung** (Eigenverbrauchsoptimierung, Lastspitzenkappung, atypische Netznutzung, Speicheroptimierung, strukturierte Strombeschaffung, Spotmarktoptimierung/Energiehandel) — nicht auf Anlagenbau/Elektrifizierung.
- **Technische Basis/Edge-Integration** wird nach außen nur als "breite Hersteller-/Produktkompatibilität" und ggf. über die dadurch nutzbaren Kundenreferenzen kommuniziert — keine Technologiepartner namentlich nennen.
- **ICP:** energieintensive Industrie, weitgehend deckungsgleich mit dem bisherigen Greenflash-Kundenprofil. Positionierung: eigenständige Marktführerlösung für intelligente industrielle Steuerung.

**Vertrauliche Details** (interne Modulnamen, Technologiepartner) stehen in der lokalen, nicht
versionierten Datei `CLAUDE.intern.md`. Sie gelten genauso verbindlich, dürfen aber nie in Code,
Kommentare, Commit-Messages oder öffentliche Texte gelangen – das Repo ist öffentlich.

@CLAUDE.intern.md

## Animationskonzept: entschieden (15.09.)

Erster Aufschlag geht mit **vollseitig animiertem Hintergrund** (Scroll-Effekte, Visualisierung
der intelligenten Vernetzung) — Feinabstimmung mit dem Designer läuft parallel weiter. Harte
Bedingung des Nutzers: **keine negativen Auswirkungen auf Performance/Ladezeit.** Das
Brand-Bundle-Verbot "keine vollflächigen Seiten-Gradients" bleibt in Kraft — die Lösung ist eine
animierte **Linien-/Netzwerk-Visualisierung (Canvas/WebGL)**, keine Farbverlaufs-Fläche; damit
sind Bewegungskonzept und Brand-Bundle vereinbar.

**Performance-Leitplanken für die Umsetzung in Claude Code (verbindlich):**
- Canvas/WebGL statt CSS-Gradient-Flächen; Partikel-/Knotenzahl an Viewportgröße und
  Geräteklasse koppeln (weniger Knoten auf Mobile)
- `devicePixelRatio` für den Animations-Canvas deckeln (~1.5), nicht ungedrosselt auf Retina rendern
- Animation pausieren, wenn Tab inaktiv (Page Visibility API) oder Canvas außerhalb des
  Viewports (IntersectionObserver) — läuft nie unsichtbar im Hintergrund weiter
- `prefers-reduced-motion` → statisches Einzelbild statt Animation
- Animations-Script lazy/code-gesplittet laden, damit es das initiale Rendering/LCP nicht blockiert
- Verstärktes Glass-Element (`backdrop-filter: blur`) NICHT flächendeckend über den animierten
  Hintergrund legen — Blur + ständig neu zeichnender Canvas gleichzeitig ist die eigentliche
  Performance-Falle, nicht die Animation allein. Blur gezielt auf einzelne Panels begrenzen.
- Vor "fertig" gilt: Lighthouse/WebPageTest auf einem Mid-Range-Mobilgerät prüfen, nicht nur
  Desktop — Zielwerte grob: LCP < 2.5s, keine spürbaren Ruckler beim Scrollen
- Fallback für sehr schwache Geräte/Verbindungen erwägen (z. B. über `navigator.deviceMemory`
  oder Connection-Type): statischer Hintergrund statt Animation

## Referenzen: Freigabe bereits erfolgt

Die im Projektplan/Schema vorgesehene Freigabe-Prüfung ist für die aktuellen Referenzkunden
bereits im Vorfeld erledigt (Stand 15.09.) — das `caseStudy`-Feld `customerApprovalConfirmed`
ist entsprechend nicht mehr blockierend (Default `true`), bleibt aber als Dokumentationsfeld für
künftige neue Referenzen bestehen.

## Design-System (verbindlich, aus Brand-Bundle "pack-t", Stand 2026-09-15)

**Wichtig: Ersetzt alle früheren Annahmen zu Plus Jakarta Sans / Greenflash-1:1-Farben.**
Die Greenflash-Typografie/Farb-Grundlage aus den ersten Gesprächen ist durch dieses
Bundle final überschrieben.

### Typografie
- **DM Sans + DM Mono — ausschließlich.** Kein Plus Jakarta Sans, kein ABC Areal (wurde vom
  Designer getestet und explizit verworfen — die "areal"-Variante im Mockup-Paket ist Referenz,
  nicht Zielzustand).
- Headlines: `letter-spacing: -0.03em`, `line-height: 1.05`, Zeilenlänge ~16 Zeichen.
- Body: 18px / line-height 1.5 / tracking 0.
- "Kicker" (Section-Eyebrows): DM Mono, 13px, tracking 0.1em, uppercase, opacity 0.65 —
  NICHT mit Metrik-Zahlen verwechseln (die sind ebenfalls Mono, aber groß und nicht uppercase).
- Volle Skala in `TYPE-AND-SPACE.md` im Brand-Bundle.

### Farben (Design-Tokens, siehe `tokens/tokens.css`)
| Token | Hex | Rolle |
|---|---|---|
| flash | `#9FF55D` | Primär: CTAs, Logo auf Dunkel |
| soft | `#67D645` | Sekundär: Buttons/Chips |
| lilac | `#5A6BD6` | Tertiär: Links, Tags, ein kühles Panel |
| lilac-soft | `#AFC5FA` | Tertiär hell |
| ultra | `#00211E` | Struktur/Ink, Logo auf Silber |
| dark | `#073D2B` | Struktur |
| dark-flash | `#037045` | Struktur/Border |
| silver | `#EBF1F5` | Fläche (Standard-Hintergrund) |
| silver-card | `#DCE6ED` | Karten/Panels |
| silver-base | `#BACAD4` | Border auf Silber |
| silver-dark | `#566470` | Muted Text auf Silber |

**Verboten:** reines Weiß `#FFFFFF`, Greenflashs "Balanced Flash" `#009E4F`. Lilac nie im Logo
oder als primärer CTA.

### Sonstige Tokens
- Radius: Card 12px, Panel 14px, Button/Control 10px
- Spacing-Basis 4px, Skala 4/8/12/16/24/32/48/64/96/128
- Buttons primär: `bg flash / color ultra / padding 10×20 / radius 10 / tracking -0.01em / weight 600`
- Floating, inset Navigation (~20px Abstand, radius ~14)
- Layout-Pattern "50/50": links Farbfläche + Text, rechts Bilder — für die 3 Lösungs-Module (Plan/Operate/Flex) vorgesehen
- Nach dem Hero: ein "ultra-dark band" (eine große Kernaussage, dunkler Hintergrund)
- Motion: **motion.dev** (`motion/react`), budgetiert eingesetzt, `prefers-reduced-motion` zwingend zu respektieren

### Logo — bereits geliefert (v1)
Anders als zuvor angekündigt liegt bereits eine erste Logo-Version vor (`logo-v1/` im
Brand-Bundle): Bildmarke separat + volles Lockup (Marke + Schriftzug), je in einer
Dark-Variante (Flash `#9FF55D`) und einer Silber-Variante (Ultra `#00211E`). Kein Lilac im
Logo. Mindestgröße digital ~24px, Schutzraum ≥ 0,5× Markenhöhe. Diese v1 ist laut Designer
noch nicht final ("Open questions: Final Bildmarke") — für den technischen Aufbau aber bereits
nutzbar.

## Referenz-Mockup (Live-Quelle der Styles)

Ein gebautes React-Mockup liegt bei (`greencore-mockup-present.zip`), Variante `dm/` ist die
aktuell gültige (DM Sans), `areal/` ist eine verworfene A/B-Alternative. Die CSS-Extrakte
(`css-extract/style.css`, `css-extract/theme.css`) gelten laut Designer als Ground Truth —
bei Zweifeln zwischen Doku und CSS gewinnt das CSS.

## Sitemap (final)

1. Startseite
2. Plattform / Lösung — Übersichtsseite + 3 Unterseiten:
   - Plan / Simulation (Simulations-/Wirtschaftlichkeitsfunktionen — extern als "Greencore AI")
   - Operate / Optimierung (Eigenverbrauchsoptimierung, Lastspitzenkappung, atypische Netznutzung, Speicheroptimierung, strukturierte Strombeschaffung)
   - Flex / Energiehandel (Spotmarktoptimierung, automatisierter Energieeinkauf)
3. Referenzen (Bestandsprojekte mit Kennzahlen — **Freigabe-Status je Referenz prüfen, siehe unten**)
4. Ressourcen — 2 Unterseiten:
   - Blog (SEO/GEO-optimierte News)
   - Presse (Presseartikel, u. a. Handelsblatt-Beitrag als Trust-Element)
5. Über Greencore AI (kompakte SEO/GEO-optimierte Beschreibung)
6. Demo buchen (zeitlich begrenzter kostenloser Demo-Zugang, individuell auf Basis des
   hochgeladenen Lastgangs des Interessenten)
7. Kontakt (verkaufendes Wording, nicht generisches Formular)

Noch zu ergänzen (aus früheren Absprachen, in der aktuellen Sitemap-Liste nicht explizit
wiederholt): Impressum, Datenschutz (Footer), Sprachumschalter DE/EN sichtbar in der Navigation.

## Referenz-Kennzahlen aus der Strategie-Präsentation

Die Präsentation enthält reale Kundennamen und konkrete Umsatz-/Einsparpotenziale
(z. B. "SPIES Kunststoffe … 65.000 €/a", "Vossko · Borgmeier … 38.000 €/a" usw.) sowie
Verbrauchs-/Komponenten-Detailwerte. **Freigabe zur öffentlichen Nennung liegt bereits vor
(Stand 15.09.)** — das `caseStudy`-Schema hat weiterhin ein Freigabe-Feld für künftige neue
Referenzen, blockiert die Veröffentlichung aber nicht mehr standardmäßig.

## Homepage-Storyline (final, 10 Abschnitte)

1. Header: Nutzenbotschaft + Kurzerklärung + CTAs. Geplanter Effekt: Scroll-Zoom von der
   Bildmarke hinein in einen vollflächigen, interaktiven Software-Screenshot (Umsetzung über
   motion.dev, ggf. 21st.dev für Bausteine)
2. Kundenlogos als Referenz-Slider (PNG, automatische Einfärbung je nach Hintergrund) —
   ggf. direkt im Header integriert, damit der Scroll-Effekt funktioniert; alternativ Tausch
   mit Punkt 3
3. Einblicke in die Software
4. 3–4 Kennzahlen-Kacheln (Glasoptik + Animation)
5. Lösungen im Tab-Menü: Tab 1 Simulation, Tab 2 Optimierung, Tab 3 Energiehandel — interaktive/
   Autoplay-Screenshots
6. Funktionen/Anwendungsfälle (Orientierung an furoenergy.com) — animierte Visualisierungen
   oder Autoplay-Videos aus der Software
7. 1–2 fixe Referenz-Testimonials mit Personenbild (Kachel) oder Slider
8. "Warum Greencore AI" / Energieplattform vs. Energiemanagement (Abgrenzungsargument)
9. FAQ-Bereich
10. Abschluss-CTA: "Jetzt Demo anfragen" / Lastgang hochladen für kostenlose Demo-Version

Bild-/Screenshot-Assets für Abschnitt 1/3/5/6 folgen Ende dieser/Anfang nächster Woche;
bis dahin Platzhalter setzen. Fallback falls interaktive Screenshots technisch nicht machbar:
Autoplay-Videos, Referenzbeispiele dafür: furoenergy.com und trawa.de (Startseiten).

## Trust-Elemente / Presse

Es existiert bereits Presseberichterstattung, u. a. ein Handelsblatt-Beitrag
("Greencore AI von Greenflash: Wie Energiesysteme wirklich intelligent werden") — Quelle für
die Presse-Unterseite und als externes Trust-Element.

## Tech-Stack (fixiert, unverändert)

| Bereich | Entscheidung |
|---|---|
| Frontend | Next.js (App Router), TypeScript, Tailwind CSS |
| UI-Basiskomponenten | 21st.dev-Registry, motion.dev für Scroll-/Section-Animationen (Komponenten vs. Animations-Engine — beides einsetzen, nicht entweder/oder) |
| CMS | Sanity (Free Tier), Schema-as-Code im Repo: Standalone-Studio in `studio/` — Projekt-ID `9xpdwcge`, Dataset `production` (public) |
| i18n | next-intl, Locales `de` (Default) + `en` |
| Hosting | Vercel |
| Domain | greencore-ai.com (IONOS, DNS-Cutover bei Launch) |
| Cookie-/Consent | UniConsent im API-Only-Modus, eigenes Banner-UI |
| Tracking | Eigener GTM-Container + eigene GA4-Property, Consent Mode v2 |
| CRM | Kontaktformular → Dynamics 365 (Greenflash) |

### Stand 21.09.: Grundgerüst steht

`nextjs-scaffold/` ist entfernt, das frische Projekt liegt in `web/` (Next.js 16.3.5, React 19,
Tailwind v4, next-intl 4.14, next-sanity, motion). Produktions-Build läuft grün, `/de` und `/en`
werden statisch vorgerendert.

> **Stolperstein Next.js 16 — unbedingt beachten:** Die Datei `middleware.ts` ist in Next 16
> **abgekündigt und in `proxy.ts` umbenannt** (die Funktion heißt `proxy` statt `middleware`).
> Die Sprachweiche von next-intl liegt deshalb in `web/src/proxy.ts`. Wer hier nach älterem
> Wissensstand `middleware.ts` anlegt, bekommt **keine Fehlermeldung** — die Weiche greift
> schlicht nicht. Next.js legt dazu eine eigene `web/AGENTS.md` an, die auf die mitgelieferten
> Handbücher unter `web/node_modules/next/dist/docs/` verweist; die sind bei Zweifeln maßgeblich.

## Weitere Dokumente

- Projektplan: `greencore-ai-website-projektplan.md`
- Frühere Design-Diskussionsentwürfe (Achtung: nutzen noch Plus-Jakarta-Sans-Platzhalter und
  Gradient-Hintergründe — durch dieses Brand-Bundle stilistisch überholt, vor Weiterverwendung
  auf DM Sans + das Gradient-Verbot anpassen): `greencore-ai-hero-konzept.html`,
  `greencore-ai-bausteine-konzept.html`
- Sanity Studio: `studio/` — Schema in `studio/schemaTypes/`, Einzelseiten-Struktur in
  `studio/structure.ts`; lokal starten mit `npm run dev` im Ordner `studio/` → http://localhost:3333
- Next.js-Grundgerüst: `web/` — Next.js 16 (App Router), TypeScript, Tailwind v4,
  next-intl (de/en), Sanity-Client. Lokal starten mit `npm run dev` im Ordner `web/`
- Brand-Bundle (Originalquelle): `greencore-ai-brand-bundle.zip`
- Mockup-Referenz (Live-Styles): `greencore-mockup-present.zip`

## Offene Punkte

- [ ] Interaktive Screenshot-Assets (Abschnitt 1/3/5/6 der Startseite) — Lieferung Ende
      dieser/Anfang nächster Woche
- [ ] Icon-Integrationsformat vom Designer noch offen
- [ ] Finale Freigabe Logo v1 durch Designer noch ausstehend
- [ ] Feinabstimmung Animationskonzept mit dem Designer läuft parallel weiter (Grundrichtung
      und Performance-Leitplanken bereits entschieden, siehe oben)
- [ ] Rechtlicher Mini-Review Datenschutz/Impressum weiterhin offen (siehe Projektplan)
