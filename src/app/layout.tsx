import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { createClient } from '@/prismicio'
import { localBusinessSchema, SITE_URL } from '@/lib/structured-data'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Éducatrice canine Granville & Coutances | Éducation Honnête',
    template: '%s | Éducation Honnête',
  },
  description:
    'Marie-Anne Lamellière, éducatrice canine bienveillante à Granville et Coutances (Manche). Renforcement positif, cours à domicile. Chiot, réactivité, rappel.',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Éducation Honnête',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
  },
  other: {
    'geo.region': 'FR-50',
    'geo.placename': 'Granville, Manche',
    'geo.position': '48.836;-1.597',
    ICBM: '48.836, -1.597',
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const client = createClient()
  const [layout, cityPages] = await Promise.all([
    client.getSingle('layout'),
    client.getAllByType('city_page', {
      orderings: [{ field: 'my.city_page.city_name', direction: 'asc' }],
    }).catch(() => []),
  ])

  return (
    <html lang="fr" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <meta name="keywords" content="éducatrice canine Granville, éducateur canin Coutances, éducation canine Manche, comportementaliste canin Normandie, renforcement positif chien" />
      </head>
      <body className="flex flex-col min-h-screen">
        <Script
          id="schema-local-business"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <Header layout={layout as any} cityPages={cityPages as any} />
        <main className="flex-1">{children}</main>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <Footer layout={layout as any} />
      </body>
    </html>
  )
}
