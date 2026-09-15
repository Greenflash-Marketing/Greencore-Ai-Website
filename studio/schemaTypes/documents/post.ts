import {defineType, defineField} from 'sanity'
import {DocumentTextIcon} from '@sanity/icons/DocumentText'

export const post = defineType({
  name: 'post',
  title: 'Blog-Beitrag',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({name: 'title', title: 'Titel', type: 'localeString'}),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title.de'},
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'publishedAt', title: 'Veröffentlicht am', type: 'datetime'}),
    defineField({name: 'excerpt', title: 'Teaser-Text', type: 'localeText'}),
    defineField({name: 'coverImage', title: 'Titelbild', type: 'image', options: {hotspot: true}}),
    defineField({name: 'body', title: 'Inhalt', type: 'localeBlockContent'}),
    defineField({name: 'seo', title: 'SEO', type: 'seo'}),
  ],
  preview: {select: {title: 'title.de', subtitle: 'publishedAt', media: 'coverImage'}},
})
