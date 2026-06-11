import { Metadata } from 'next'
import Link from 'next/link'
import { createClient, siteUrl } from '@/prismicio'
import SliceZone from '@/components/SliceZone'

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient()
  const page = await client.getSingle('homepage')
  return {
    title: 'Éducatrice canine Granville & Coutances | Éducation Honnête',
    description:
      page.data.meta_description ??
      'Marie-Anne Lamellière, éducatrice canine bienveillante à Granville et Coutances (Manche). Renforcement positif, cours à domicile.',
    alternates: { canonical: siteUrl },
    openGraph: {
      title: 'Éducatrice canine Granville & Coutances | Éducation Honnête',
      description:
        'Éducatrice canine bienveillante à Granville et Coutances. Renforcement positif, cours à domicile.',
      url: siteUrl,
      type: 'website',
    },
  }
}

const COVERED_CITIES = [
  { name: 'Granville', slug: 'granville' },
  { name: 'Coutances', slug: 'coutances' },
  { name: 'Bréhal', slug: 'brehal' },
  { name: 'Hauteville-sur-Mer', slug: null },
  { name: 'Montmartin-sur-Mer', slug: null },
  { name: 'Lingreville', slug: null },
  { name: 'Cerisy-la-Salle', slug: null },
]

export default async function HomePage() {
  const client = createClient()
  const page = await client.getSingle('homepage')

  return (
    <>
      <SliceZone slices={page.data.slices} />

      {/* Zone d'intervention */}
      <section className="py-16 px-4 bg-forest-50">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-amber-warm font-semibold text-sm uppercase tracking-widest mb-2">Secteur</p>
          <h2 className="text-3xl font-serif font-bold text-forest-800 mb-4">Zone d&apos;intervention</h2>
          <p className="text-gray-600 leading-relaxed mb-8 max-w-2xl mx-auto">
            Marie-Anne intervient dans un rayon de 30 km autour de Granville et Coutances.
            Les frais de déplacement sont inclus dans ce secteur.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {COVERED_CITIES.map((city) =>
              city.slug ? (
                <Link
                  key={city.name}
                  href={`/educatrice-canine/${city.slug}`}
                  className="px-4 py-2 rounded-full bg-white border border-forest-200 text-forest-700 font-medium text-sm hover:bg-forest-700 hover:text-white hover:border-forest-700 transition-colors shadow-sm"
                >
                  {city.name}
                </Link>
              ) : (
                <span
                  key={city.name}
                  className="px-4 py-2 rounded-full bg-white border border-forest-200 text-forest-700 font-medium text-sm shadow-sm"
                >
                  {city.name}
                </span>
              )
            )}
          </div>
        </div>
      </section>
    </>
  )
}
