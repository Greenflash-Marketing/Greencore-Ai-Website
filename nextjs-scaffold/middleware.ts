import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
  locales: ['de', 'en'],
  defaultLocale: 'de',
  localePrefix: 'always', // /de/... und /en/... explizit, gut für SEO/hreflang
})

export const config = {
  // Statische Assets und API-Routen von der Locale-Middleware ausnehmen
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}
