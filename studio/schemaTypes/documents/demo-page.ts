import {defineType, defineField, defineArrayMember} from 'sanity'
import {RocketIcon} from '@sanity/icons/Rocket'
import {ThListIcon} from '@sanity/icons/ThList'

// "Demo buchen" (Singleton): Seitentext für den individuellen, lastgang-basierten
// Demo-Zugang. Das eigentliche Upload-/Lead-Handling ist App-Logik, nicht CMS-Content.
export const demoPage = defineType({
  name: 'demoPage',
  title: 'Demo buchen',
  type: 'document',
  icon: RocketIcon,
  fields: [
    defineField({name: 'headline', title: 'Headline', type: 'localeString'}),
    defineField({name: 'intro', title: 'Einleitungstext', type: 'localeText'}),
    defineField({
      name: 'steps',
      title: 'Ablauf-Schritte (z. B. Lastgang hochladen → individuelle Demo erhalten)',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'demoStep',
          type: 'object',
          icon: ThListIcon,
          fields: [
            defineField({name: 'title', title: 'Titel', type: 'localeString'}),
            defineField({name: 'description', title: 'Beschreibung', type: 'localeText'}),
          ],
          preview: {select: {title: 'title.de'}},
        }),
      ],
    }),
    defineField({name: 'ctaLabel', title: 'CTA-Text', type: 'localeString'}),
    defineField({name: 'seo', title: 'SEO', type: 'seo'}),
  ],
})
