import {defineType, defineField} from 'sanity'
import {TextIcon} from '@sanity/icons/Text'

export const localeText = defineType({
  name: 'localeText',
  title: 'Lokalisierter Text (mehrzeilig)',
  type: 'object',
  icon: TextIcon,
  fields: [
    defineField({name: 'de', title: 'Deutsch', type: 'text'}),
    defineField({name: 'en', title: 'English', type: 'text'}),
  ],
})
