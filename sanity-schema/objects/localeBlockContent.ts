import {defineType, defineField} from 'sanity'

export const localeBlockContent = defineType({
  name: 'localeBlockContent',
  title: 'Lokalisierter Rich-Text',
  type: 'object',
  fields: [
    defineField({
      name: 'de',
      title: 'Deutsch',
      type: 'array',
      of: [{type: 'block'}, {type: 'image', options: {hotspot: true}}],
    }),
    defineField({
      name: 'en',
      title: 'English',
      type: 'array',
      of: [{type: 'block'}, {type: 'image', options: {hotspot: true}}],
    }),
  ],
})
