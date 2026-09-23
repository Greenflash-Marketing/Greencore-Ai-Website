import {defineType, defineField, defineArrayMember} from 'sanity'
import {InfoOutlineIcon} from '@sanity/icons/InfoOutline'

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'Über Greencore AI',
  type: 'document',
  icon: InfoOutlineIcon,
  fields: [
    defineField({name: 'headline', title: 'Headline', type: 'localeString'}),
    defineField({name: 'kicker', title: 'Kicker', type: 'localeString'}),
    defineField({name: 'lede', title: 'Einleitung', type: 'localeText'}),
    defineField({
      name: 'positioning',
      title: 'Positionierung: vom passiven Verbraucher zum aktiven Marktakteur',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'shift',
          type: 'object',
          fields: [
            defineField({name: 'from', title: 'Heute', type: 'localeString'}),
            defineField({name: 'to', title: 'Mit Greencore AI', type: 'localeString'}),
          ],
          preview: {select: {title: 'from.de', subtitle: 'to.de'}},
        }),
      ],
    }),
    defineField({
      name: 'principles',
      title: 'Grundsätze / Startvoraussetzungen',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'principle',
          type: 'object',
          fields: [
            defineField({name: 'title', title: 'Titel', type: 'localeString'}),
            defineField({name: 'text', title: 'Text', type: 'localeText'}),
          ],
          preview: {select: {title: 'title.de'}},
        }),
      ],
    }),
    defineField({name: 'greenflash', title: 'Verhältnis zu Greenflash', type: 'localeBlockContent'}),
    defineField({name: 'body', title: 'Inhalt (Was/Wie/Für wen)', type: 'localeBlockContent'}),
    defineField({
      name: 'visionMissionValueProp',
      title: 'Vision / Mission / Value Proposition',
      type: 'localeBlockContent',
    }),
    defineField({name: 'seo', title: 'SEO', type: 'seo'}),
  ],
})
