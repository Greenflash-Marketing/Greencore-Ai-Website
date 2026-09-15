import {defineType, defineField} from 'sanity'
import {LockIcon} from '@sanity/icons/Lock'

const PAGE_TYPE_TITLES: Record<string, string> = {
  imprint: 'Impressum',
  privacy: 'Datenschutzerklärung',
}

export const legalPage = defineType({
  name: 'legalPage',
  title: 'Rechtliche Seite (Impressum/Datenschutz)',
  type: 'document',
  icon: LockIcon,
  fields: [
    defineField({
      name: 'pageType',
      title: 'Seitentyp',
      type: 'string',
      options: {
        list: [
          {title: 'Impressum', value: 'imprint'},
          {title: 'Datenschutzerklärung', value: 'privacy'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'title', title: 'Titel', type: 'localeString'}),
    defineField({name: 'body', title: 'Inhalt', type: 'localeBlockContent'}),
    defineField({
      name: 'lastReviewed',
      title: 'Zuletzt rechtlich geprüft am',
      description: 'Wichtig für den geplanten Tools-/Auftragsverarbeiter-Review (siehe Projektplan)',
      type: 'date',
    }),
  ],
  preview: {
    select: {pageType: 'pageType', lastReviewed: 'lastReviewed'},
    prepare: ({pageType, lastReviewed}) => ({
      title: PAGE_TYPE_TITLES[pageType] ?? 'Rechtliche Seite',
      subtitle: lastReviewed ? `Geprüft am ${lastReviewed}` : 'Noch nicht rechtlich geprüft',
    }),
  },
})
