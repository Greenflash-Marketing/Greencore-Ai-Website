import {defineType, defineField, defineArrayMember} from 'sanity'
import {CogIcon} from '@sanity/icons/Cog'
import {LinkIcon} from '@sanity/icons/Link'

// Singleton – in der Studio-Struktur (structure.ts) auf ein Dokument beschränkt
export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Website-Einstellungen',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({name: 'siteName', title: 'Seitenname', type: 'string', initialValue: 'Greencore AI'}),
    defineField({name: 'logo', title: 'Logo', type: 'image'}),
    defineField({name: 'defaultSeo', title: 'Standard-SEO', type: 'seo'}),
    defineField({
      name: 'footerText',
      title: 'Footer-Text (dezenter Greenflash-Bezug)',
      type: 'localeString',
    }),
    defineField({name: 'greenflashLink', title: 'Link zu Greenflash', type: 'url'}),
    defineField({
      name: 'socialLinks',
      title: 'Social-Media-Links',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'socialLink',
          type: 'object',
          icon: LinkIcon,
          fields: [
            defineField({name: 'platform', title: 'Plattform', type: 'string'}),
            defineField({name: 'url', title: 'URL', type: 'url'}),
          ],
          preview: {select: {title: 'platform', subtitle: 'url'}},
        }),
      ],
    }),
  ],
})
