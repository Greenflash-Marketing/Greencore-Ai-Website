import {defineType, defineField} from 'sanity'

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'Über Greencore AI',
  type: 'document',
  fields: [
    defineField({name: 'headline', title: 'Headline', type: 'localeString'}),
    defineField({name: 'body', title: 'Inhalt (Was/Wie/Für wen)', type: 'localeBlockContent'}),
    defineField({
      name: 'visionMissionValueProp',
      title: 'Vision / Mission / Value Proposition',
      type: 'localeBlockContent',
    }),
    defineField({name: 'seo', title: 'SEO', type: 'seo'}),
  ],
})
