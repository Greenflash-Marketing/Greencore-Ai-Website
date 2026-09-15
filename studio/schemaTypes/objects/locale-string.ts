import {defineType, defineField} from 'sanity'
import {StringIcon} from '@sanity/icons/String'

// Pragmatischer feldbasierter i18n-Ansatz (statt Dokument-Level-i18n-Plugin) –
// bewusst gewählt für Tempo bei kleiner, überschaubarer Seite mit 2 Sprachen.
// Bei Bedarf später auf ein dediziertes i18n-Plugin migrierbar.
export const localeString = defineType({
  name: 'localeString',
  title: 'Lokalisierter Text (einzeilig)',
  type: 'object',
  icon: StringIcon,
  fields: [
    defineField({name: 'de', title: 'Deutsch', type: 'string'}),
    defineField({name: 'en', title: 'English', type: 'string'}),
  ],
})
