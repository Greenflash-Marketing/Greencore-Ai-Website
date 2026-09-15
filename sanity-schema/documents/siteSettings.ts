import {defineType, defineField} from 'sanity'

// Singleton – in der Sanity Studio-Konfiguration auf ein Dokument beschränken
// (structure builder: S.listItem().id('siteSettings').child(...))
export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Website-Einstellungen',
  type: 'document',
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
        {
          type: 'object',
          fields: [
            {name: 'platform', type: 'string', title: 'Plattform'},
            {name: 'url', type: 'url', title: 'URL'},
          ],
        },
      ],
    }),
  ],
})
