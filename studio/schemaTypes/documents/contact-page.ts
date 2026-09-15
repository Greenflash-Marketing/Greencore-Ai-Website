import {defineType, defineField} from 'sanity'
import {EnvelopeIcon} from '@sanity/icons/Envelope'

// Kontaktseite (Singleton) — bewusst verkaufendes Wording statt generischem Formulartext
export const contactPage = defineType({
  name: 'contactPage',
  title: 'Kontakt',
  type: 'document',
  icon: EnvelopeIcon,
  fields: [
    defineField({name: 'headline', title: 'Headline (verkaufend, nicht generisch)', type: 'localeString'}),
    defineField({name: 'subline', title: 'Subline', type: 'localeText'}),
    defineField({name: 'seo', title: 'SEO', type: 'seo'}),
  ],
})
