import {localeString} from './objects/locale-string'
import {localeText} from './objects/locale-text'
import {localeBlockContent} from './objects/locale-block-content'
import {seo} from './objects/seo'

import {siteSettings} from './documents/site-settings'
import {navigation} from './documents/navigation'
import {homePage} from './documents/home-page'
import {aboutPage} from './documents/about-page'
import {solutionOverviewPage, solutionModule} from './documents/solution'
import {post} from './documents/post'
import {caseStudy} from './documents/case-study'
import {pressMention} from './documents/press'
import {demoPage} from './documents/demo-page'
import {contactPage} from './documents/contact-page'
import {legalPage} from './documents/legal-page'

export const schemaTypes = [
  // Wiederverwendbare Feldgruppen (Objekte)
  localeString,
  localeText,
  localeBlockContent,
  seo,

  // Singletons — in der Studio-Struktur (structure.ts) auf je 1 Dokument beschränkt
  siteSettings,
  navigation,
  homePage,
  aboutPage,
  solutionOverviewPage,
  demoPage,
  contactPage,

  // Repeatable Dokumente
  solutionModule,
  post,
  caseStudy,
  pressMention,
  legalPage,
]
