import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import * as prismic from '@prismicio/client'
import { createClient, siteUrl } from '@/prismicio'

export const metadata: Metadata = {
  title: 'Races de chiens : éducation et comportement',
  description:
    'Fiches éducation par race : Border Collie, Labrador, Berger Allemand, Golden Retriever et bien d\'autres. Conseils adaptés à chaque profil canin.',
  alternates: { canonical: `${siteUrl}/races` },
  openGraph: {
    title: 'Races de chiens : éducation et comportement | Éducation Honnête',
    description: 'Trouvez la fiche éducation adaptée à la race de votre chien — méthode positive et conseils pratiques.',
    url: `${siteUrl}/races`,
    type: 'website',
  },
}

export default async function RacesPage() {
  const client = createClient()
  let breeds: prismic.PrismicDocument[] = []
  try {
    breeds = await client.getAllByType('race', {
      orderings: [{ field: 'my.race.nom', direction: 'asc' }],
    })
  } catch {
    // no breeds yet
  }

  return (
    <div className="bg-cream min-h-screen">
      <div className="bg-forest-800 py-16 px-4 text-center">
        <p className="text-amber-warm font-semibold text-sm uppercase tracking-widest mb-3">Ressources</p>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white">Races de chiens</h1>
        <p className="mt-4 text-forest-200 text-lg max-w-xl mx-auto">
          Chaque race a ses particularités. Retrouvez les conseils d&apos;éducation adaptés au profil de votre chien.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {breeds.length === 0 ? (
          <p className="text-center text-gray-500 py-20">Aucune fiche race publiée pour le moment.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {breeds.map((breed) => {
              const imgUrl = prismic.isFilled.image(breed.data.photo) ? breed.data.photo.url : null
              return (
                <Link
                  key={breed.uid}
                  href={`/races/${breed.uid}`}
                  className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-forest-100">
                    {imgUrl ? (
                      <Image
                        src={imgUrl}
                        alt={breed.data.nom ?? ''}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-7xl">🐕</div>
                    )}
                  </div>
                  <div className="p-6 flex items-center justify-between">
                    <h2 className="text-xl font-serif font-bold text-forest-800 group-hover:text-forest-600 transition-colors">
                      {breed.data.nom}
                    </h2>
                    <svg className="w-5 h-5 text-amber-warm shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
