import {defineType, defineField} from 'sanity'
import {CaseIcon} from '@sanity/icons/Case'

export const caseStudy = defineType({
  name: 'caseStudy',
  title: 'Referenz / Case Study',
  type: 'document',
  icon: CaseIcon,
  fields: [
    defineField({name: 'title', title: 'Titel', type: 'localeString'}),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title.de'},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'customerApprovalConfirmed',
      title: 'Freigabe durch Kunden bestätigt',
      description:
        'Für die aktuellen Referenzen bereits im Vorfeld erfolgt (Stand 15.09.) – Feld bleibt als ' +
        'Dokumentation/Tracking für künftige neue Referenzen bestehen, blockiert aber nicht mehr ' +
        'die Veröffentlichung.',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({name: 'customerName', title: 'Kundenname (öffentlich)', type: 'string'}),
    defineField({
      name: 'industry',
      title: 'Branche (für die Filterung)',
      type: 'string',
      options: {
        list: ['Lebensmittel', 'Kunststoff & Chemie', 'Logistik', 'Handel', 'Metall & Maschinenbau', 'Industrie'],
      },
    }),
    defineField({name: 'consumption', title: 'Verbrauch (z. B. "30 GWh")', type: 'string'}),
    defineField({
      name: 'components',
      title: 'Komponenten (z. B. "10,2 MWp PV · 6,1 MWh BESS")',
      type: 'string',
    }),
    defineField({
      name: 'resultHighlight',
      title: 'Ergebnis-Highlight (z. B. "65.000 €/a Einsparung")',
      type: 'string',
    }),
    defineField({name: 'coverImage', title: 'Titelbild', type: 'image', options: {hotspot: true}}),
    defineField({name: 'body', title: 'Inhalt', type: 'localeBlockContent'}),
    defineField({name: 'seo', title: 'SEO', type: 'seo'}),
  ],
  preview: {select: {title: 'title.de', subtitle: 'customerName', media: 'coverImage'}},
})
