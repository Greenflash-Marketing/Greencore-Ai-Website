import {defineType, defineField} from 'sanity'

export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({name: 'metaTitle', title: 'Meta-Titel', type: 'localeString'}),
    defineField({name: 'metaDescription', title: 'Meta-Beschreibung', type: 'localeText'}),
    defineField({
      name: 'ogImage',
      title: 'Social-Share-Bild',
      type: 'image',
      options: {hotspot: true},
    }),
  ],
})
