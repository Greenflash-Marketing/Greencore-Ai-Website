import {defineType, defineField} from 'sanity'

// Startseite (Singleton) — abgebildet nach der finalen 10-Abschnitte-Storyline (siehe CLAUDE.md)
export const homePage = defineType({
  name: 'homePage',
  title: 'Startseite',
  type: 'document',
  fields: [
    // 1. Header
    defineField({
      name: 'hero',
      title: '1 — Header',
      type: 'object',
      fields: [
        {name: 'headline', title: 'Headline', type: 'localeString'},
        {name: 'subline', title: 'Subline', type: 'localeText'},
        {name: 'ctaPrimaryLabel', title: 'Primärer CTA-Text', type: 'localeString'},
        {name: 'ctaPrimaryHref', title: 'Primärer CTA-Ziel', type: 'string'},
        {name: 'ctaSecondaryLabel', title: 'Sekundärer CTA-Text', type: 'localeString'},
        {
          name: 'softwareScreenshotEntry',
          title: 'Vollflächiger Software-Screenshot (Scroll-Zoom-Ziel)',
          type: 'image',
          options: {hotspot: true},
        },
      ],
    }),
    // 2. Kundenlogos
    defineField({
      name: 'logoSlider',
      title: '2 — Kundenlogos (Referenz-Slider)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'name', title: 'Kundenname', type: 'string'},
            {name: 'logo', title: 'Logo (PNG)', type: 'image'},
          ],
        },
      ],
    }),
    // 3. Software-Einblicke
    defineField({
      name: 'softwareInsights',
      title: '3 — Einblicke in die Software',
      type: 'object',
      fields: [
        {name: 'kicker', title: 'Kicker', type: 'localeString'},
        {name: 'headline', title: 'Headline', type: 'localeString'},
        {
          name: 'showcase',
          title: 'Screenshots/Autoplay-Videos',
          type: 'array',
          of: [
            {type: 'image', options: {hotspot: true}},
            {type: 'file', options: {accept: 'video/*'}},
          ],
        },
      ],
    }),
    // 4. Kennzahlen
    defineField({
      name: 'statTiles',
      title: '4 — Kennzahlen-Kacheln (Glasoptik + Animation)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'value', title: 'Wert', type: 'string'},
            {name: 'unit', title: 'Einheit', type: 'string'},
            {name: 'label', title: 'Beschriftung', type: 'localeString'},
          ],
        },
      ],
    }),
    // 5. Lösungen im Tab-Menü
    defineField({
      name: 'solutionTabs',
      title: '5 — Lösungen im Tab-Menü (Referenzen auf die 3 Module)',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'solutionModule'}]}],
      validation: (Rule) => Rule.max(3),
    }),
    // 6. Funktionen/Anwendungsfälle
    defineField({
      name: 'useCases',
      title: '6 — Funktionen/Anwendungsfälle (Orientierung: furoenergy.com)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', title: 'Titel', type: 'localeString'},
            {name: 'description', title: 'Beschreibung', type: 'localeText'},
            {
              name: 'media',
              title: 'Visualisierung/Autoplay-Video',
              type: 'array',
              of: [{type: 'image'}, {type: 'file', options: {accept: 'video/*'}}],
            },
          ],
        },
      ],
    }),
    // 7. Testimonials
    defineField({
      name: 'testimonials',
      title: '7 — Referenz-Testimonials (1–2 fix oder Slider)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'quote', title: 'Zitat', type: 'localeText'},
            {name: 'personName', title: 'Name', type: 'string'},
            {name: 'personRole', title: 'Rolle/Unternehmen', type: 'string'},
            {name: 'personPhoto', title: 'Foto', type: 'image', options: {hotspot: true}},
          ],
        },
      ],
    }),
    // 8. Warum Greencore AI
    defineField({
      name: 'whySection',
      title: '8 — Warum Greencore AI (Energieplattform vs. Energiemanagement)',
      type: 'object',
      fields: [
        {name: 'headline', title: 'Headline', type: 'localeString'},
        {name: 'body', title: 'Inhalt', type: 'localeBlockContent'},
      ],
    }),
    // 9. FAQ
    defineField({
      name: 'faq',
      title: '9 — FAQ',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'question', title: 'Frage', type: 'localeString'},
            {name: 'answer', title: 'Antwort', type: 'localeText'},
          ],
        },
      ],
    }),
    // 10. Abschluss-CTA
    defineField({
      name: 'finalCta',
      title: '10 — Abschluss-CTA (Demo-Anfrage)',
      type: 'object',
      fields: [
        {name: 'headline', title: 'Headline', type: 'localeString'},
        {name: 'ctaLabel', title: 'CTA-Text', type: 'localeString'},
        {name: 'ctaHref', title: 'CTA-Ziel', type: 'string', initialValue: '/demo'},
      ],
    }),
    defineField({name: 'seo', title: 'SEO', type: 'seo'}),
  ],
})
