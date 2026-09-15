import {defineType, defineField} from 'sanity'

export const legalPage = defineType({
  name: 'legalPage',
  title: 'Rechtliche Seite (Impressum/Datenschutz)',
  type: 'document',
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
})
