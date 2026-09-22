# Type & Space — matches the current Greencore page

Extracted from the live mockup (`css-extract/style.css` + `Hero.jsx`).  
**Families:** DM Sans (everything UI) + DM Mono (metrics/micro only).  
**Areal:** retired — do not ship.

---

## Families & roles

| Role | Family | Weight |
|---|---|---|
| Display / headlines | DM Sans | 700 |
| Sub / lede | DM Sans | 500 |
| Body | DM Sans | 400 |
| Buttons | DM Sans | 600 |
| Nav brand | DM Sans | 700 |
| Kickers / labels | DM Mono or Sans small | Mono 400–500; Sans 500–600 |
| Metric values | DM Mono | 500 |

Never mono for headlines or long DE/EN body. Pattern: **Sans label + Mono value**.

---

## Type scale (live)

| Step | Size | Tracking | Line-height | Notes |
|---|---|---|---|---|
| **Hero display** | ~72px in SVG (width min 720px); visual ~clamp 48–90 | **−0.03em** | tight (~0.95–1.0 via SVG) | Pointer-reactive gradient SVG text — required |
| **Band title** | `clamp(32px, 4.5vw, 52px)` | **−0.03em** | **1.05** | max-width ~16ch |
| **Dark-band claim** | `clamp(32px, 4.8vw, 56px)` | **−0.03em** | **1.05** | max-width ~16ch |
| **Hero sub** | `clamp(18px, 2.1vw, 26px)` | 0 | 1.4 | weight 500; margin-top 28px |
| **Band lede** | `clamp(17px, 1.8vw, 20px)` | 0 | 1.45 | margin-top 18px; max ~38ch |
| **Body** | 18px | 0 | 1.5 | |
| **Button** | 14px | **−0.01em** | — | padding 10×20; radius 10px |
| **Nav brand** | 14px | **−0.02em** | — | weight 700 |
| **Nav links** | 13px | 0 | — | weight 500 |
| **Kicker** (section eyebrow) | 13px **DM Mono** | **0.1em** | — | uppercase; opacity 0.65; mb 20px — see Kickers section |
| **Metric num** | `clamp(28px, 3.5vw, 40px)` | **−0.02em** | 1 | Mono; flash or lilac-soft |
| **Metric label** | 13px | 0.04em or 0 | — | |
| **Small / chip** | 12–13px | — | — | |

### Reduced headline spacing (do this)

Headlines are **optically tight**:
- letter-spacing **−0.03em** on display / band titles / dark claims  
- line-height **~1.05** (not 1.2–1.4)  
- short measure (**~16ch**) so lines stay punchy  
- avoid loose tracking on big type  

Buttons/nav brand get milder negative tracking (−0.01 / −0.02). Body stays neutral (0).

---


---

## Kickers (and other micro mono)

**Kicker** = the tiny section eyebrow above a headline. Not a metric, not body.

On the live page: class `.kicker` — sits above hero / proof / cases / modules / color-slab titles.

### Spec (from live CSS)

| Property | Value |
|---|---|
| Family | **DM Mono** |
| Size | **13px** |
| Weight | 400 |
| Tracking | **0.1em** (wide — opposite of display) |
| Transform | **uppercase** |
| Opacity | **0.65** on default field (silver/dark ink) |
| Color variant | `.kicker--flash` → flash `#9FF55D`, opacity 1 (on dark bands) |
| Spacing below | **margin-bottom 20px** before the headline |

### What kickers say (role)

Short category / stance labels — 1–3 words. Examples on the page: `Greencore AI`, `Produkt` / `Product`, `Cases`, `Module` / `Modules`, `Stance`.

They orient the section; the **Sans headline** does the talking.

### Kickers vs other mono (don’t mix these up)

| Role | Class / pattern | Spec | Example |
|---|---|---|---|
| **Kicker** | `.kicker` | 13px mono · 0.1em · uppercase · opacity 0.65 | `CASES` above a title |
| **Metric value** | `.mono.metric-num` / CountUp | large mono · −0.02em · **not** uppercase | `128.4` |
| **Metric label** | Sans small / `.metric-label` | 13px Sans | `kW peak` |
| **Tag / chip text** | `.mono` in cards | ~11–12px mono · often uppercase · tighter | `LIVE`, module tags |
| **Tab index** | `.mono` | small mono numerals | `01` `02` `03` |
| **Footer whisper** | `.mono` | 12px · muted · **not** a kicker | parent attribution |

**Rule:** if it’s an eyebrow above a display title → **kicker**. If it’s a number proving something → **metric mono**. If it’s a quiet legal/parent line → **footer mono**, not kicker.

### Do / don’t

**Do:** one kicker per section title; keep copy short; use flash kicker on dark when you need voltage.  
**Don’t:** use kickers as body; stack multiple kickers; put kickers in DM Sans; use kicker tracking on big headlines.

## Space rhythm

Whitespace is a brand rule, not leftover. Module caps and band density live in `DENSITY-AND-CLARITY.md`. Do not shrink band padding to fit more modules.


Base unit **4**. Scale: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128.

| Context | Value |
|---|---|
| Hero padding | `clamp(96px, 12vw, 140px)` top · side `clamp(20px, 4vw, 48px)` · bottom `clamp(48px, 7vw, 80px)` |
| Band padding | `clamp(72px, 10vw, 120px)` vertical · same side clamp |
| Band max width | 1080px (cases 1120; narrow 720) |
| Hero sub → strip | 28px then 40px |
| CTA after hero copy | ~36px |
| Metric row | margin-top 48px; gap 12px |
| Title → lede | 16–18px |
| Card radius | 12px |
| Panel radius | 14px |
| Button radius | 10px |
| Control/chip radius | 10px |

Nav: floating inset (~20px from top/sides), radius ~14px, light blur OK.

---

## Hero type implementation note

Live page uses **SVG text + mask** with pointer-tracked gradient (flash → soft → lilac), not fragile `background-clip` alone.  
Specs in spirit: DM Sans 700, ~72px, letter-spacing −0.03em, silver field behind.  
If broken: **fix** — never remove.

---

## Do / don’t (type)

**Do:** tight display tracking; short headline measure; Mono only on numbers; Sans everywhere else.  
**Don’t:** Areal; Plus Jakarta; Extra Light/Extra Bold; loose 1.3+ line-height on big titles; mono paragraphs.
