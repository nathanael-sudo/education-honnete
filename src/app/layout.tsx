import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { createClient } from '@/prismicio'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const interSans = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Éducation Honnête',
  description: 'Éducation canine bienveillante en Normandie',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const client = createClient()
  const layout = await client.getSingle('layout')

  return (
    <html lang="fr" className={`${inter.variable} ${interSans.variable}`}>
      <body className="flex flex-col min-h-screen">
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <Header layout={layout as any} />
        <main className="flex-1">{children}</main>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <Footer layout={layout as any} />
      </body>
    </html>
  )
}
