import {defineType, defineField} from 'sanity'
import {DocumentsIcon} from '@sanity/icons/Documents'

// Presse-Unterseite: verlinkt auf externe Presseartikel (z. B. Handelsblatt), keine eigenen
// Volltexte — dient als Trust-Element.
export const pressMention = defineType({
  name: 'pressMention',
  title: 'Presseartikel (Verlinkung)',
  type: 'document',
  icon: DocumentsIcon,
  fields: [
    defineField({name: 'title', title: 'Titel des Artikels', type: 'string'}),
    defineField({name: 'publication', title: 'Publikation (z. B. Handelsblatt)', type: 'string'}),
    defineField({
      name: 'externalUrl',
      title: 'Externe URL',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'publishedAt', title: 'Veröffentlicht am', type: 'date'}),
    defineField({
      name: 'category',
      title: 'Kategorie (für die Filterung)',
      type: 'string',
      options: {list: ['Fachpresse', 'Wirtschaftspresse', 'Auszeichnung', 'Vortrag']},
    }),
    defineField({name: 'excerpt', title: 'Kurzbeschreibung', type: 'localeText'}),
    defineField({name: 'thumbnail', title: 'Vorschaubild', type: 'image', options: {hotspot: true}}),
  ],
  preview: {select: {title: 'title', subtitle: 'publication', media: 'thumbnail'}},
})
