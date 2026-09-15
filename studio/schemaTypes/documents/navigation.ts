import {defineType, defineField, defineArrayMember} from 'sanity'
import {MenuIcon} from '@sanity/icons/Menu'
import {LinkIcon} from '@sanity/icons/Link'

// Singleton – in der Studio-Struktur (structure.ts) auf ein Dokument beschränkt
export const navigation = defineType({
  name: 'navigation',
  title: 'Hauptnavigation',
  type: 'document',
  icon: MenuIcon,
  fields: [
    defineField({
      name: 'items',
      title: 'Navigationspunkte',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'navItem',
          type: 'object',
          icon: LinkIcon,
          fields: [
            defineField({name: 'label', title: 'Label', type: 'localeString'}),
            defineField({name: 'href', title: 'Ziel-URL/Slug', type: 'string'}),
          ],
          preview: {select: {title: 'label.de', subtitle: 'href'}},
        }),
      ],
    }),
    defineField({name: 'ctaLabel', title: 'CTA-Button-Text', type: 'localeString'}),
    defineField({name: 'ctaHref', title: 'CTA-Ziel', type: 'string'}),
  ],
})
