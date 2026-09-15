import {defineType, defineField} from 'sanity'

// Kontaktseite (Singleton) — bewusst verkaufendes Wording statt generischem Formulartext
export const contactPage = defineType({
  name: 'contactPage',
  title: 'Kontakt',
  type: 'document',
  fields: [
    defineField({name: 'headline', title: 'Headline (verkaufend, nicht generisch)', type: 'localeString'}),
    defineField({name: 'subline', title: 'Subline', type: 'localeText'}),
    defineField({name: 'seo', title: 'SEO', type: 'seo'}),
  ],
})
