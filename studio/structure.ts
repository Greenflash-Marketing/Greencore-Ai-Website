import type {ComponentType} from 'react'
import type {StructureBuilder, StructureResolver} from 'sanity/structure'
import {CogIcon} from '@sanity/icons/Cog'
import {DashboardIcon} from '@sanity/icons/Dashboard'
import {DocumentsIcon} from '@sanity/icons/Documents'
import {EnvelopeIcon} from '@sanity/icons/Envelope'
import {HomeIcon} from '@sanity/icons/Home'
import {InfoOutlineIcon} from '@sanity/icons/InfoOutline'
import {MenuIcon} from '@sanity/icons/Menu'
import {RocketIcon} from '@sanity/icons/Rocket'

// Singletons: genau ein Dokument je Typ, feste Dokument-ID = Typname
export const SINGLETON_TYPES = new Set([
  'siteSettings',
  'navigation',
  'homePage',
  'aboutPage',
  'solutionOverviewPage',
  'demoPage',
  'contactPage',
])

function singleton(S: StructureBuilder, typeName: string, title: string, icon: ComponentType) {
  return S.listItem()
    .id(typeName)
    .title(title)
    .icon(icon)
    .child(S.document().schemaType(typeName).documentId(typeName).title(title))
}

// Reihenfolge orientiert sich an der Sitemap (siehe CLAUDE.md)
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Inhalte')
    .items([
      singleton(S, 'homePage', 'Startseite', HomeIcon),
      S.listItem()
        .id('platform')
        .title('Plattform / Lösung')
        .icon(DashboardIcon)
        .child(
          S.list()
            .title('Plattform / Lösung')
            .items([
              singleton(S, 'solutionOverviewPage', 'Übersicht', DashboardIcon),
              S.documentTypeListItem('solutionModule').title('Lösungs-Module'),
            ]),
        ),
      S.documentTypeListItem('caseStudy').title('Referenzen'),
      S.listItem()
        .id('resources')
        .title('Ressourcen')
        .icon(DocumentsIcon)
        .child(
          S.list()
            .title('Ressourcen')
            .items([
              S.documentTypeListItem('post').title('Blog'),
              S.documentTypeListItem('pressMention').title('Presse'),
            ]),
        ),
      singleton(S, 'aboutPage', 'Über Greencore AI', InfoOutlineIcon),
      singleton(S, 'demoPage', 'Demo buchen', RocketIcon),
      singleton(S, 'contactPage', 'Kontakt', EnvelopeIcon),
      S.divider(),
      S.documentTypeListItem('legalPage').title('Impressum & Datenschutz'),
      singleton(S, 'navigation', 'Hauptnavigation', MenuIcon),
      singleton(S, 'siteSettings', 'Website-Einstellungen', CogIcon),
    ])
