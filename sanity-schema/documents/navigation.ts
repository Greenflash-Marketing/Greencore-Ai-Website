import {defineType, defineField} from 'sanity'

export const navigation = defineType({
  name: 'navigation',
  title: 'Hauptnavigation',
  type: 'document',
  fields: [
    defineField({
      name: 'items',
      title: 'Navigationspunkte',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'label', title: 'Label', type: 'localeString'},
            {name: 'href', title: 'Ziel-URL/Slug', type: 'string'},
          ],
        },
      ],
    }),
    defineField({name: 'ctaLabel', title: 'CTA-Button-Text', type: 'localeString'}),
    defineField({name: 'ctaHref', title: 'CTA-Ziel', type: 'string'}),
  ],
})
