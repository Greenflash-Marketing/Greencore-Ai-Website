import {localeString} from './objects/localeString'
import {localeText} from './objects/localeText'
import {localeBlockContent} from './objects/localeBlockContent'
import {seo} from './objects/seo'

import {siteSettings} from './documents/siteSettings'
import {navigation} from './documents/navigation'
import {homePage} from './documents/homePage'
import {aboutPage} from './documents/aboutPage'
import {solutionOverviewPage, solutionModule} from './documents/solution'
import {post} from './documents/post'
import {caseStudy} from './documents/caseStudy'
import {pressMention} from './documents/press'
import {demoPage} from './documents/demoPage'
import {contactPage} from './documents/contactPage'
import {legalPage} from './documents/legalPage'

export const schemaTypes = [
  // Wiederverwendbare Feldgruppen (Objekte)
  localeString,
  localeText,
  localeBlockContent,
  seo,

  // Singletons — in der Studio-Struktur auf je 1 Dokument beschränken
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
