import {defineType, defineField, defineArrayMember} from 'sanity'
import {HomeIcon} from '@sanity/icons/Home'
import {ImagesIcon} from '@sanity/icons/Images'
import {BarChartIcon} from '@sanity/icons/BarChart'
import {SparklesIcon} from '@sanity/icons/Sparkles'
import {CommentIcon} from '@sanity/icons/Comment'
import {HelpCircleIcon} from '@sanity/icons/HelpCircle'

// Startseite (Singleton) — abgebildet nach der finalen 10-Abschnitte-Storyline (siehe CLAUDE.md)
export const homePage = defineType({
  name: 'homePage',
  title: 'Startseite',
  type: 'document',
  icon: HomeIcon,
  fields: [
    // 1. Header
    defineField({
      name: 'hero',
      title: '1 — Header',
      type: 'object',
      fields: [
        defineField({name: 'kicker', title: 'Kicker (kleine Zeile über der Headline)', type: 'localeString'}),
        defineField({name: 'headline', title: 'Headline', type: 'localeString'}),
        defineField({name: 'subline', title: 'Subline', type: 'localeText'}),
        defineField({name: 'ctaPrimaryLabel', title: 'Primärer CTA-Text', type: 'localeString'}),
        defineField({name: 'ctaPrimaryHref', title: 'Primärer CTA-Ziel', type: 'string'}),
        defineField({name: 'ctaSecondaryLabel', title: 'Sekundärer CTA-Text', type: 'localeString'}),
        defineField({name: 'ctaSecondaryHref', title: 'Sekundärer CTA-Ziel', type: 'string'}),
        defineField({
          name: 'logosLabel',
          title: 'Beschriftung über den Kundenlogos',
          type: 'localeString',
        }),
        defineField({
          name: 'softwareScreenshotEntry',
          title: 'Vollflächiger Software-Screenshot (Scroll-Zoom-Ziel)',
          type: 'image',
          options: {hotspot: true},
        }),
      ],
    }),
    // Dunkelgrünes Band direkt nach dem Header: die Kennzahlen (Entscheidung 22.09.)
    defineField({
      name: 'statsBand',
      title: '1b — Kennzahlen-Band (dunkelgrün, direkt nach dem Header)',
      description: 'Die Kacheln selbst stehen unter „4 — Kennzahlen-Kacheln“.',
      type: 'object',
      fields: [
        defineField({name: 'kicker', title: 'Kicker', type: 'localeString'}),
        defineField({name: 'headline', title: 'Headline', type: 'localeString'}),
        defineField({name: 'lede', title: 'Erläuterung', type: 'localeText'}),
      ],
    }),
    // 2. Kundenlogos
    defineField({
      name: 'logoSlider',
      title: '2 — Kundenlogos (Referenz-Slider)',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'customerLogo',
          type: 'object',
          icon: ImagesIcon,
          fields: [
            defineField({name: 'name', title: 'Kundenname', type: 'string'}),
            defineField({name: 'logo', title: 'Logo (PNG)', type: 'image'}),
          ],
          preview: {select: {title: 'name', media: 'logo'}},
        }),
      ],
    }),
    // 3. Software-Einblicke
    defineField({
      name: 'softwareInsights',
      title: '3 — Einblicke in die Software',
      type: 'object',
      fields: [
        defineField({name: 'kicker', title: 'Kicker', type: 'localeString'}),
        defineField({name: 'headline', title: 'Headline', type: 'localeString'}),
        defineField({name: 'lede', title: 'Einleitung', type: 'localeText'}),
        defineField({
          name: 'showcase',
          title: 'Screenshots/Autoplay-Videos',
          type: 'array',
          of: [
            defineArrayMember({type: 'image', options: {hotspot: true}}),
            defineArrayMember({type: 'file', options: {accept: 'video/*'}}),
          ],
        }),
      ],
    }),
    // 4. Kennzahlen
    defineField({
      name: 'statTiles',
      title: '4 — Kennzahlen-Kacheln (Glasoptik + Animation)',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'statTile',
          type: 'object',
          icon: BarChartIcon,
          fields: [
            defineField({
              name: 'value',
              title: 'Wert',
              description: 'Zahl mit optionalem Vorzeichen, z. B. „−32“ oder „65.000“ – wird beim Hineinscrollen hochgezählt.',
              type: 'string',
            }),
            defineField({name: 'unit', title: 'Einheit', type: 'string'}),
            defineField({name: 'label', title: 'Beschriftung', type: 'localeString'}),
          ],
          preview: {
            select: {value: 'value', unit: 'unit', label: 'label.de'},
            prepare: ({value, unit, label}) => ({
              title: [value, unit].filter(Boolean).join(' ') || 'Kennzahl',
              subtitle: label,
            }),
          },
        }),
      ],
    }),
    defineField({
      name: 'compatibility',
      title: '3b — Kompatibilität (herstellerübergreifend)',
      type: 'object',
      fields: [
        defineField({name: 'kicker', title: 'Kicker', type: 'localeString'}),
        defineField({name: 'headline', title: 'Headline', type: 'localeString'}),
        defineField({name: 'lede', title: 'Erläuterung', type: 'localeText'}),
        defineField({
          name: 'media',
          title: 'Bild (z. B. Wand kompatibler Hersteller)',
          type: 'image',
          options: {hotspot: true},
        }),
      ],
    }),
    defineField({
      name: 'europeBand',
      title: '6b — Europa (Vision und Marktposition)',
      type: 'object',
      fields: [
        defineField({name: 'kicker', title: 'Kicker', type: 'localeString'}),
        defineField({name: 'claim', title: 'Aussage', type: 'localeString'}),
        defineField({name: 'lede', title: 'Erläuterung', type: 'localeText'}),
        defineField({
          name: 'facts',
          title: 'Drei Punkte',
          type: 'array',
          of: [
            defineArrayMember({
              name: 'fact',
              type: 'object',
              fields: [
                defineField({name: 'title', title: 'Titel', type: 'localeString'}),
                defineField({name: 'text', title: 'Text', type: 'localeString'}),
              ],
              preview: {select: {title: 'title.de', subtitle: 'text.de'}},
            }),
          ],
          validation: (Rule) => Rule.max(3),
        }),
      ],
    }),
    // 5. Lösungen im Tab-Menü
    defineField({
      name: 'solutionsBand',
      title: '5 — Lösungen: Kicker und Headline',
      type: 'object',
      fields: [
        defineField({name: 'kicker', title: 'Kicker', type: 'localeString'}),
        defineField({name: 'headline', title: 'Headline', type: 'localeString'}),
      ],
    }),
    defineField({
      name: 'solutionTabs',
      title: '5 — Lösungen im Tab-Menü (Referenzen auf die 3 Module)',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'solutionModule'}]})],
      validation: (Rule) => Rule.max(3),
    }),
    // 6. Funktionen/Anwendungsfälle
    defineField({
      name: 'useCasesBand',
      title: '6 — Anwendungsfälle: Kicker und Headline',
      type: 'object',
      fields: [
        defineField({name: 'kicker', title: 'Kicker', type: 'localeString'}),
        defineField({name: 'headline', title: 'Headline', type: 'localeString'}),
      ],
    }),
    defineField({
      name: 'useCases',
      title: '6 — Funktionen/Anwendungsfälle (Orientierung: furoenergy.com)',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'useCase',
          type: 'object',
          icon: SparklesIcon,
          fields: [
            defineField({name: 'title', title: 'Titel', type: 'localeString'}),
            defineField({name: 'description', title: 'Beschreibung', type: 'localeText'}),
            defineField({
              name: 'media',
              title: 'Visualisierung/Autoplay-Video',
              type: 'array',
              of: [
                defineArrayMember({type: 'image'}),
                defineArrayMember({type: 'file', options: {accept: 'video/*'}}),
              ],
            }),
          ],
          preview: {select: {title: 'title.de'}},
        }),
      ],
    }),
    // 7. Testimonials
    defineField({
      name: 'testimonialsBand',
      title: '7 — Testimonials: Kicker und Headline',
      type: 'object',
      fields: [
        defineField({name: 'kicker', title: 'Kicker', type: 'localeString'}),
        defineField({name: 'headline', title: 'Headline', type: 'localeString'}),
      ],
    }),
    defineField({
      name: 'testimonials',
      title: '7 — Referenz-Testimonials (1–2 fix oder Slider)',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'testimonial',
          type: 'object',
          icon: CommentIcon,
          fields: [
            defineField({name: 'quote', title: 'Zitat', type: 'localeText'}),
            defineField({name: 'personName', title: 'Name', type: 'string'}),
            defineField({name: 'personRole', title: 'Rolle/Unternehmen', type: 'string'}),
            defineField({name: 'companyLogo', title: 'Kundenlogo (über dem Zitat)', type: 'image'}),
            defineField({
              name: 'personPhoto',
              title: 'Foto',
              type: 'image',
              options: {hotspot: true},
            }),
          ],
          preview: {select: {title: 'personName', subtitle: 'personRole', media: 'personPhoto'}},
        }),
      ],
    }),
    // 8. Warum Greencore AI
    defineField({
      name: 'whySection',
      title: '8 — Warum Greencore AI (Energieplattform vs. Energiemanagement)',
      type: 'object',
      fields: [
        defineField({name: 'kicker', title: 'Kicker', type: 'localeString'}),
        defineField({name: 'headline', title: 'Headline', type: 'localeString'}),
        defineField({name: 'body', title: 'Einleitung (optional)', type: 'localeBlockContent'}),
        defineField({
          name: 'compare',
          title: 'Gegenüberstellung (zwei Karten)',
          type: 'object',
          fields: [
            defineField({name: 'classicTitle', title: 'Linke Karte: Titel', type: 'localeString'}),
            defineField({
              name: 'classicItems',
              title: 'Linke Karte: Punkte',
              type: 'array',
              of: [
                defineArrayMember({
                  name: 'point',
                  type: 'object',
                  fields: [
                    defineField({name: 'title', title: 'Stichwort', type: 'localeString'}),
                    defineField({name: 'text', title: 'Erklärung', type: 'localeString'}),
                  ],
                  preview: {select: {title: 'title.de', subtitle: 'text.de'}},
                }),
              ],
            }),
            defineField({name: 'ourTitle', title: 'Rechte Karte: Titel', type: 'localeString'}),
            defineField({
              name: 'ourItems',
              title: 'Rechte Karte: Punkte',
              type: 'array',
              of: [
                defineArrayMember({
                  name: 'point',
                  type: 'object',
                  fields: [
                    defineField({name: 'title', title: 'Stichwort', type: 'localeString'}),
                    defineField({name: 'text', title: 'Erklärung', type: 'localeString'}),
                  ],
                  preview: {select: {title: 'title.de', subtitle: 'text.de'}},
                }),
              ],
            }),
          ],
        }),
      ],
    }),
    // 9. FAQ
    defineField({
      name: 'faqBand',
      title: '9 — FAQ: Kicker und Headline',
      type: 'object',
      fields: [
        defineField({name: 'kicker', title: 'Kicker', type: 'localeString'}),
        defineField({name: 'headline', title: 'Headline', type: 'localeString'}),
      ],
    }),
    defineField({
      name: 'faq',
      title: '9 — FAQ',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'faqItem',
          type: 'object',
          icon: HelpCircleIcon,
          fields: [
            defineField({name: 'question', title: 'Frage', type: 'localeString'}),
            defineField({name: 'answer', title: 'Antwort', type: 'localeText'}),
          ],
          preview: {select: {title: 'question.de'}},
        }),
      ],
    }),
    // 10. Abschluss-CTA
    defineField({
      name: 'finalCta',
      title: '10 — Abschluss-CTA (Demo-Anfrage)',
      type: 'object',
      fields: [
        defineField({name: 'headline', title: 'Headline', type: 'localeString'}),
        defineField({name: 'ctaLabel', title: 'CTA-Text', type: 'localeString'}),
        defineField({name: 'lede', title: 'Erläuterung', type: 'localeText'}),
        defineField({name: 'ctaHref', title: 'CTA-Ziel', type: 'string', initialValue: '/demo'}),
        defineField({name: 'ctaSecondaryLabel', title: 'Zweiter CTA-Text', type: 'localeString'}),
        defineField({name: 'ctaSecondaryHref', title: 'Zweites CTA-Ziel', type: 'string'}),
      ],
    }),
    defineField({name: 'seo', title: 'SEO', type: 'seo'}),
  ],
})
