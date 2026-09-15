import {defineType, defineField, defineArrayMember} from 'sanity'
import {DashboardIcon} from '@sanity/icons/Dashboard'
import {BoltIcon} from '@sanity/icons/Bolt'
import {StackIcon} from '@sanity/icons/Stack'

// Übersichtsseite "Plattform / Lösung" (Singleton) — Intro-Text vor den 3 Modulen
export const solutionOverviewPage = defineType({
  name: 'solutionOverviewPage',
  title: 'Plattform / Lösung — Übersicht',
  type: 'document',
  icon: DashboardIcon,
  fields: [
    defineField({name: 'kicker', title: 'Kicker (Section-Eyebrow)', type: 'localeString'}),
    defineField({name: 'headline', title: 'Headline', type: 'localeString'}),
    defineField({name: 'intro', title: 'Einleitungstext', type: 'localeText'}),
    defineField({name: 'seo', title: 'SEO', type: 'seo'}),
  ],
})

// Die 3 Lösungs-Module: Plan/Simulation, Operate/Optimierung, Flex/Energiehandel
// Extern werden diese als Teil von "Greencore AI" kommuniziert — nie als eigenständige
// Produktnamen (interne Modulnamen) benennen, siehe CLAUDE.md.
export const solutionModule = defineType({
  name: 'solutionModule',
  title: 'Lösungs-Modul (Plan / Operate / Flex)',
  type: 'document',
  icon: BoltIcon,
  fields: [
    defineField({
      name: 'moduleKey',
      title: 'Modul',
      type: 'string',
      options: {
        list: [
          {title: 'Plan / Simulation', value: 'plan'},
          {title: 'Operate / Optimierung', value: 'operate'},
          {title: 'Flex / Energiehandel', value: 'flex'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'title', title: 'Titel', type: 'localeString'}),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title.de'},
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'kicker', title: 'Kicker (Section-Eyebrow)', type: 'localeString'}),
    defineField({name: 'shortDescription', title: 'Kurzbeschreibung (Tab/Teaser)', type: 'localeText'}),
    defineField({name: 'body', title: 'Inhalt', type: 'localeBlockContent'}),
    defineField({
      name: 'subFeatures',
      title: 'Teilfunktionen (z. B. bei Operate: Eigenverbrauchsoptimierung, Lastspitzenkappung, ...)',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'subFeature',
          type: 'object',
          icon: StackIcon,
          fields: [
            defineField({name: 'title', title: 'Titel', type: 'localeString'}),
            defineField({name: 'description', title: 'Beschreibung', type: 'localeText'}),
          ],
          preview: {select: {title: 'title.de'}},
        }),
      ],
    }),
    defineField({
      name: 'softwareShowcase',
      title: 'Software-Einblick (interaktiver Screenshot oder Autoplay-Video-Fallback)',
      type: 'array',
      of: [
        defineArrayMember({type: 'image', title: 'Screenshot', options: {hotspot: true}}),
        defineArrayMember({
          type: 'file',
          title: 'Autoplay-Video (Fallback)',
          options: {accept: 'video/*'},
        }),
      ],
    }),
    defineField({name: 'order', title: 'Reihenfolge (Plan=1, Operate=2, Flex=3)', type: 'number'}),
    defineField({name: 'seo', title: 'SEO', type: 'seo'}),
  ],
  orderings: [
    {title: 'Reihenfolge', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]},
  ],
  preview: {select: {title: 'title.de', subtitle: 'moduleKey'}},
})
