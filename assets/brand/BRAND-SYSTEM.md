# Greencore AI — Brand System Handbook

Standalone · pack-u · mirrors the current DM mockup page.  
Read with `IDENTITY-PACK.md` + `TYPE-AND-SPACE.md` + `DENSITY-AND-CLARITY.md` + `tokens/tokens.css`.  
Live CSS ground truth: `css-extract/theme.css`, `css-extract/style.css`.

---

## Decision ladder (color)

1. Primary action? → **flash** `#9FF55D`  
2. Support chip / secondary? → **soft** `#67D645`  
3. Cool contrast? → **lilac** `#5A6BD6` / soft `#AFC5FA`  
4. Structure / ink? → ultra / dark / dark-flash  
5. Field? → silver scale  

Logo v1 (in `logo-v1/`): flash on dark · ultra on silver. See `logo-v1/LOGO.md`.  
Forbidden chrome: `#FFFFFF`, `#009E4F`.

---

## Type treatment (critical)

**Kickers** = tiny uppercase mono eyebrows above titles (not metrics). Full rules in `TYPE-AND-SPACE.md`.

Headlines are **tight**:
- tracking **−0.03em**
- leading **1.05**
- measure ~**16ch**

Do not “open up” display type. Body stays 18 / 1.5 / tracking 0.  
Mono only for numbers. **No Areal.**

Hero: pointer-reactive gradient display (SVG+mask on the live page). Required.

---

## Buttons

```
Primary:   bg #9FF55D; color #00211E; padding 10px 20px; radius 10px; tracking -0.01em; weight 600
Secondary: soft fill or ghost hairline — not lilac primary
Hover:     slight opacity / color takeover — not elevation theater
```

---

## Gradients allowlist

| Yes | No |
|---|---|
| Hero gradient type | Page/section gradient backgrounds |
| Card holo foil hover | Loud neon spotlight washes |

---

## Layout patterns

- **Nav:** floating inset ~20px; silver panel; radius ~14  
- **Hero:** silver field; gradient type; strip; slim CTA; metrics  
- **After hero:** ultra-dark band (one claim)  
- **50/50:** left color+text | right images | 3 cases synced  
- **Bands:** padding `clamp(72px, 10vw, 120px)` · inner max ~1080  

---


---

## Density and clarity (critical)

Marketing pages fail when overstuffed. Full rules: `DENSITY-AND-CLARITY.md`.

Hard caps:
- One idea per band
- Max 2–3 modules in a laptop view
- One card DNA everywhere (including Kunden)
- Silver air default; dark as punctuation
- Nav surface-dependent, not permanent dark glass
- Subtract before add. Empty silver is correct.

## Motion

motion.dev (`motion/react`). Budgeted. Honor `prefers-reduced-motion`.

---

## Agent checklist

- [ ] DM Sans + DM Mono only (no Areal / Jakarta)  
- [ ] No `#FFF` / no `#009E4F`  
- [ ] Flash CTAs; soft secondary; lilac tertiary  
- [ ] Logo flash/ultra  
- [ ] Headlines −0.03em / ~1.05 leading / short measure  
- [ ] Kickers = mono 13 / 0.1em / uppercase / opacity 0.65 (not metrics)  
- [ ] Floating nav; slim 10×20 buttons; radii 10–14  
- [ ] Working gradient hero type  
- [ ] Ultra-dark band after hero  
- [ ] 50/50 left color+text / right images  
- [ ] Holo cards subtle  
- [ ] No page gradient washes  
- [ ] One idea per band; ≤2–3 modules in view  
- [ ] Shared card shell (no reinvented Kunden cards; no bg-matching cards)  
- [ ] Silver-air default; no mid-green wallpaper; no dark↔bright carnival  
- [ ] Nav not permanent dark glass  
- [ ] Reduced-motion respected  

---

## Product context

European industry energy SaaS from Greenflash. Marketing = software leadership (modules, metrics), bilingual DE/EN — not NGO brochure. Parent only in footer.
