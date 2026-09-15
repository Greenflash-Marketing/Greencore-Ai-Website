import {defineType, defineField} from 'sanity'

// "Demo buchen" (Singleton): Seitentext für den individuellen, lastgang-basierten
// Demo-Zugang. Das eigentliche Upload-/Lead-Handling ist App-Logik, nicht CMS-Content.
export const demoPage = defineType({
  name: 'demoPage',
  title: 'Demo buchen',
  type: 'document',
  fields: [
    defineField({name: 'headline', title: 'Headline', type: 'localeString'}),
    defineField({name: 'intro', title: 'Einleitungstext', type: 'localeText'}),
    defineField({
      name: 'steps',
      title: 'Ablauf-Schritte (z. B. Lastgang hochladen → individuelle Demo erhalten)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', title: 'Titel', type: 'localeString'},
            {name: 'description', title: 'Beschreibung', type: 'localeText'},
          ],
        },
      ],
    }),
    defineField({name: 'ctaLabel', title: 'CTA-Text', type: 'localeString'}),
    defineField({name: 'seo', title: 'SEO', type: 'seo'}),
  ],
})
