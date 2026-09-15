import {defineType, defineField} from 'sanity'

export const localeText = defineType({
  name: 'localeText',
  title: 'Lokalisierter Text (mehrzeilig)',
  type: 'object',
  fields: [
    defineField({name: 'de', title: 'Deutsch', type: 'text'}),
    defineField({name: 'en', title: 'English', type: 'text'}),
  ],
})
