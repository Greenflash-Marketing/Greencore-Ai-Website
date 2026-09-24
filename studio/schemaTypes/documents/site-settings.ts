import {defineType, defineField, defineArrayMember} from 'sanity'
import {CogIcon} from '@sanity/icons/Cog'
import {ImagesIcon} from '@sanity/icons/Images'
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
      name: 'taggedLogos',
      title: 'Getaggte Logos (Inline-Zyklus)',
      description:
        'Logos für Textstellen wie „Funktioniert mit: {hersteller}“. Tags ohne geschweifte Klammern eintragen.',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'taggedLogo',
          type: 'object',
          icon: ImagesIcon,
          fields: [
            defineField({name: 'name', title: 'Name (Alt-Text)', type: 'string'}),
            defineField({name: 'logo', title: 'Logo (PNG)', type: 'image'}),
            defineField({
              name: 'tags',
              title: 'Tags',
              description: 'z. B. „hersteller“ – ein Logo kann mehrere Tags tragen.',
              type: 'array',
              of: [{type: 'string'}],
              options: {layout: 'tags'},
            }),
          ],
          preview: {
            select: {title: 'name', tags: 'tags', media: 'logo'},
            prepare: ({title, tags, media}) => ({
              title: title || 'Logo',
              subtitle: Array.isArray(tags) ? tags.join(', ') : undefined,
              media,
            }),
          },
        }),
      ],
    }),
    defineField({
      name: 'halobar',
      title: 'Halobar (Neuigkeiten-Leiste über der Navigation)',
      description: 'Nur sichtbar, wenn aktiviert.',
      type: 'object',
      options: {collapsible: true, collapsed: true},
      fields: [
        defineField({name: 'enabled', title: 'Aktiviert', type: 'boolean', initialValue: false}),
        defineField({name: 'tag', title: 'Kennzeichnung (z. B. „Neu“)', type: 'localeString'}),
        defineField({name: 'text', title: 'Text', type: 'localeString'}),
        defineField({name: 'href', title: 'Ziel-URL/Slug', type: 'string'}),
      ],
    }),
    defineField({
      name: 'login',
      title: 'Login in die Software',
      description: 'Nicht Teil des Go-Live – Platz in der Navigation ist vorgesehen.',
      type: 'object',
      options: {collapsible: true, collapsed: true},
      fields: [
        defineField({name: 'enabled', title: 'Button anzeigen', type: 'boolean', initialValue: false}),
        defineField({name: 'url', title: 'Login-URL', type: 'url'}),
      ],
    }),
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
