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

**Ergänzung 16.09. (unverbindlich, Feinschliff bis 20.09.):** Die Linien sollen nicht nur
strukturell wirken, sondern **gesteuerte Energieströme/-flüsse** visualisieren (heller Grünton,
der durch die Linien "fließt") — scroll-ausgelöst oder dauerhaft laufend, technische Empfehlung
liegt bei Claude Code. Muss auf **hellem und dunklem** Hintergrund gleichermaßen gut
erkennbar/funktionsfähig sein (Liniendichte ergibt sich aus dieser Anforderung). Botschaft:
intelligente Vernetzung/Steuerung/Orchestrierung von Energie über eine Plattform — technische,
innovative IT-Exzellenz zur KI-Steuerung. Stil beim ersten Klickdummy: freie Gestaltung durch
Claude Code als Diskussionsgrundlage für die finale Entscheidung.

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
- Floating, inset Navigation (~20px Abstand, radius ~14), sticky. Zukünftig (nicht Go-Live):
  Login-Button in die Software — intern noch in Abstimmung, aber strukturell beim
  Navigationsaufbau mitdenken. Zukünftig außerdem eine **aufklappbare Halobar** über der
  Navigation für Neuigkeiten von Greencore AI — muss **aktivier-/deaktivierbar** sein und nur
  bei Aktivierung sichtbar; Platz/Struktur dafür jetzt schon vorsehen (Stand 16.09.)
- Layout-Pattern "50/50": links Farbfläche + Text, rechts Bilder — für die 3 Lösungs-Module
  (Plan/Operate/Flex) vorgesehen, soll auch als wiederverwendbare Komponente auf Unterseiten
  funktionieren; mobile Darstellung von Anfang an mitdenken (Stand 16.09.)
- Nach dem Hero: ein "ultra-dark band" (eine große Kernaussage, dunkler Hintergrund) — Platzierung
  im Zusammenspiel mit der aktualisierten Homepage-Storyline (siehe unten) noch zu prüfen
- Motion: **motion.dev** (`motion/react`), budgetiert eingesetzt, `prefers-reduced-motion`
  zwingend zu respektieren. Sections bewusst mit einfachen Effekten animieren, nicht überladen
  — der vollflächig animierte Hintergrund liefert bereits Bewegung (Stand 16.09.)
- Glass-Optik (Stand 16.09., final bis 20.09.): Navigation, Kennzahlen-Kacheln, Tab-Menü,
  CTA-Banner, Cookie-Banner, einzelne Panels
- Hero-Schriftzug-Gradient auf Touch-Geräten (Stand 16.09.): falls ohne Performance-Einbußen
  möglich, einmaliger automatischer Sweep-Effekt (links nach rechts über die H1) direkt nach
  dem ersten Laden; sonst entfällt der Effekt auf Touch-Geräten ersatzlos

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

## Homepage-Storyline (Stand 16.09., unverbindlich — final bis 20.09.)

**Ersetzt die vorherige 10-Abschnitte-Reihenfolge.** Erste Abstimmung mit dem Designer am
16.09. war nicht erschöpfend — die folgende Struktur ist Arbeitsgrundlage für den ersten
HTML-Klickdummy, keine endgültige Freigabe. Reihenfolge inkl. FAQ jetzt vor dem Footer statt
davor der Abschluss-CTA:

1. Header: H1 + Kurzerklärung + CTAs, rechts neben der H1 ein **Tablet-Mockup** mit
   Software-Screenshot. Scroll-Zoom-Effekt siehe eigener Abschnitt unten (ersetzt die frühere
   Idee "Zoom aus der Bildmarke heraus").
   - 1.2 Kundenlogos: bevorzugt **im Header integriert** (unterer Header-Rand), nur falls
     technisch/performant/responsiv unproblematisch — sonst direkt nach Abschnitt 2.
2. Software-Einblicke: vollflächiger, interaktiver Screenshot (Fortsetzung des Scroll-Zooms
   aus dem Header). Alternative nur falls UX unsauber: interaktiver Screenshot bleibt im
   Tablet statt vollflächig.
3. Kennzahlen-Kacheln (Glasoptik + Animation)
4. Lösungen im Tab-Menü: Tab 1 Simulation, Tab 2 Optimierung, Tab 3 Energiehandel — interaktive/
   Autoplay-Screenshots
5. Funktionen/Anwendungsfälle (Orientierung an furoenergy.com) — animierte Visualisierungen
   oder Autoplay-Videos aus der Software
6. 1–2 fixe Referenz-Testimonials mit Personenbild (Kachel) oder Slider
7. "Warum Greencore AI" / Energieplattform vs. Energiemanagement (Abgrenzungsargument)
8. Abschluss-CTA: gläserner Banner vor Keyvisual mit Bildmarke, "Jetzt Demo anfragen" /
   Lastgang hochladen für kostenlose Demo-Version
9. FAQ-Bereich
10. Footer (allgemein, inkl. Impressum/Datenschutz/dezente Greenflash-Erwähnung)

Hell/Dunkel-Rhythmus als Beispiel (wechselnd, keine feste Regel, wird mit Designer weiter
entwickelt): 1 Header dunkel · 2 Software-Einblicke (Hintergrund ergibt sich aus Screenshot) ·
3 Kennzahlen hell · 4 Tab-Menü hell · 5 Anwendungsfälle dunkel · 6 Testimonials hell ·
7 Warum Greencore AI dunkel · 8 Abschluss-CTA passend zum Keyvisual · 9 FAQ dunkel. Die
animierte Netzwerk-Visualisierung im Hintergrund muss sich **durchgehend und sauber über alle
Abschnitte** ziehen, unabhängig vom Hell/Dunkel-Wechsel der jeweiligen Section.

Bild-/Screenshot-Assets für Abschnitt 1/2/4/5 folgen Ende dieser/Anfang nächster Woche;
bis dahin Platzhalter setzen. Interaktive (klick-/navigierbare) Screenshots sind Stand heute
bis 20.09. realistisch angepeilt; falls nicht erreichbar, Umstellung auf Autoplay-Video-Fallback
(Referenzbeispiele: furoenergy.com und trawa.de, Startseiten).

### Header-Scroll-Konzept (Tablet-Zoom) — geändert am 16.09.

Ursprüngliche Idee (Scroll-Zoom von der Bildmarke direkt in die Software-Einblicke) ist
**ersetzt**:

1. Tablet-Mockup mit Software-Screenshot liegt rechts neben der H1.
2. Beim Scrollen wird in das Tablet **hineingezoomt**, bis der Screenshot vollflächig den
   Bildschirm ausfüllt — an diesem Punkt wird die Interaktivität ausgelöst (Nutzer kann sich
   durchklicken; technisch nicht machbar → Fallback Autoplay-Video). Das ist der Übergang zu
   Abschnitt 2 "Software-Einblicke".
3. Bei weiterem Scrollen wird wieder **herausgezoomt**: Tablet mit weiterhin interaktivem
   Screenshot vor dunklem Hintergrund.
4. Sobald das Tablet eine sinnvoll festzulegende Zielgröße relativ zur Bildschirmbreite
   erreicht, scrollt die Seite regulär in Abschnitt 3 (Kennzahlen-Kacheln) weiter.

**Technische Mechanik geklärt (16.09.):**
- **Pinning:** EIN gepinnter Bereich, die Scroll-Position steuert den Zoom-Fortschritt 1:1
  (scrubbed) — kein hartes Scroll-Hijacking, Zurückscrollen spult den Effekt zurück.
- **Mobile:** kein Pinning (Performance/Robustheit). Vereinfacht: Tablet skaliert/fadet beim
  Ins-Viewport-Scrollen ein, Tap öffnet den interaktiven Screenshot als Vollbild-Overlay.
- **Scroll vs. Klick:** Scroll steuert ausschließlich den Zoom; Klicks im Screenshot
  (Demo-Navigation der Software) laufen unabhängig davon.

## Erster Klickdummy (Stand 16.09.)

- Format: **HTML-Klickdummy** (nicht Figma) für interaktive Stakeholder-Vorschau.
- Ablage **nicht im Produktiv-Repo**, sondern separater `design-reference`-Ordner.
- Desktop UND Mobile von Anfang an mitdenken; Performance-Leitplanken (siehe
  Animationskonzept) gelten auch hier — nichts zeigen, was am Ende technisch/performant/
  responsiv nicht sauber umsetzbar wäre.
- Finale Optik-/Stil-Entscheidung (inkl. Glass-Elemente, Animationskonzept-Feinschliff,
  Style-Quelle) fällt spätestens **20.09.2026**, zusammen mit dem Start des technischen Aufbaus.

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

**Update 16.09.:** `nextjs-scaffold/` wird **verworfen** — frisches Next.js-Projekt wird
aufgesetzt, Ideen aus dem Scaffold fließen ein (Designer ist informiert). Styles/Komponenten
aus dem React-Mockup (`greencore-mockup-present.zip`) werden **nicht 1:1 übernommen**, sondern
auf Basis aller gesammelten Infos neu gebaut. Slugs, Meta-Descriptions u. ä. werden weiterhin
aus dem deutschen Text generiert, müssen aber im Sanity-Schema **bearbeitbar** bleiben —
insbesondere für saubere englische URLs/Metadaten.

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

**Deadline für alle Optik-/Stil-Themen: spätestens 20.09.2026 (= Start technischer Aufbau).**

- [ ] Interaktive Screenshot-Assets (Abschnitt 1/2/4/5 der Startseite) — Lieferung Ende
      dieser/Anfang nächster Woche
- [ ] Icon-Integrationsformat vom Designer noch offen — bis dahin SVGs + ergänzend Google
      Material Symbols
- [ ] Finale Freigabe Logo v1 durch Designer noch ausstehend — bis dahin v1 nutzen
- [ ] Feinabstimmung Animationskonzept inkl. Energiefluss-Visualisierung mit dem Designer läuft
      parallel weiter (Grundrichtung, Performance-Leitplanken und Konzept-Ergänzung 16.09.
      bereits entschieden, siehe oben)
- [ ] Style-Quelle final bestätigen: `css-extract/` als Ground Truth vs. Versionsbezeichnung
      `tokens.css`-Kopf "pack-q" vs. Doku "pack-t"
- [ ] Offene technische Fragen zum Header-Scroll-Zoom-Konzept (Tablet) klären, bevor es im
      Klickdummy umgesetzt wird
- [ ] Bild-/Video-Zuschnittgrößen je Section festlegen (Claude Code), PNG→WebP-Konvertierung
      automatisieren
- [ ] Login-Bereich/-Button und aufklappbare Halobar über der Navigation — intern noch zu
      klären, nicht Teil des Go-Live, aber strukturell in Navigation/Klickdummy mitdenken
- [ ] Rechtlicher Mini-Review Datenschutz/Impressum weiterhin offen (siehe Projektplan)
