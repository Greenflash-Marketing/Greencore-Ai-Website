import {NextIntlClientProvider} from 'next-intl'
import {getMessages} from 'next-intl/server'
import '../globals.css'

export function generateStaticParams() {
  return [{locale: 'de'}, {locale: 'en'}]
}

export default async function LocaleLayout({
  children,
  params: {locale},
}: {
  children: React.ReactNode
  params: {locale: string}
}) {
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {/* TODO: gemeinsame Navigation-Komponente (siehe Bausteine-Konzept) */}
          {children}
          {/* TODO: Footer mit dezentem Greenflash-Bezug (siehe Projektplan) */}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
