import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import * as prismic from '@prismicio/client'
import { createClient, siteUrl } from '@/prismicio'

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient()
  const page = await client.getSingle('case_studies_page').catch(() => null)
  const pageUrl = `${siteUrl}/cas-pratiques-education-canine`
  const title = page?.data.meta_title ?? 'Cas pratiques – Éducation Honnête'
  const description = page?.data.meta_description ?? 'Découvrez les chiens accompagnés par Marie-Anne Lamellière, éducatrice canine en Normandie.'
  return {
    title,
    description,
    alternates: { canonical: pageUrl },
    openGraph: { title, description, url: pageUrl },
  }
}

export default async function CasPratiquesPage() {
  const client = createClient()
  const [caseStudies, page] = await Promise.all([
    client.getAllByType('case_study', { fetchLinks: ['race.nom'] }),
    client.getSingle('case_studies_page').catch(() => null),
  ])

  const heroEyebrow = page?.data.hero_eyebrow ?? 'Témoignages'
  const heroTitle = page?.data.hero_title ?? 'Cas pratiques'
  const heroDescription = page?.data.hero_description ?? 'Chaque chien a son histoire. Découvrez les transformations vécues par nos binômes maître·sse–chien.'
  const cardCtaLabel = page?.data.card_cta_label ?? 'Lire le cas pratique'
  const emptyStateText = page?.data.empty_state_text ?? 'Aucun cas pratique publié pour le moment.'

  return (
    <div className="bg-cream min-h-screen">
      <div className="bg-forest-800 py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-amber-warm font-semibold text-sm uppercase tracking-widest mb-3">{heroEyebrow}</p>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white">{heroTitle}</h1>
          <p className="mt-4 text-forest-200 text-lg max-w-xl mx-auto">{heroDescription}</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {caseStudies.length === 0 ? (
          <p className="text-center text-gray-500 py-20">{emptyStateText}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((cs) => {
              const imgUrl = prismic.isFilled.image(cs.data.dog_portrait) ? cs.data.dog_portrait.url : null
              const breedRef = cs.data.dog_breed as prismic.ContentRelationshipField<'race'>
              const breedFilled = prismic.isFilled.contentRelationship(breedRef)
                ? breedRef as prismic.FilledContentRelationshipField
                : null
              const breedName = breedFilled
                ? ((breedFilled as unknown as { data?: { nom?: string } }).data?.nom) ?? null
                : null

              return (
                <Link
                  key={cs.uid}
                  href={`/cas-pratiques-education-canine/${cs.uid}`}
                  className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-forest-100">
                    {imgUrl ? (
                      <Image
                        src={imgUrl}
                        alt={cs.data.dog_name ?? ''}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-7xl">🐕</div>
                    )}
                  </div>

                  <div className="p-6">
                    {breedName && (
                      <p className="text-xs font-semibold text-amber-warm uppercase tracking-wider mb-1">
                        {breedName}
                      </p>
                    )}
                    <h2 className="text-2xl font-serif font-bold text-forest-800 group-hover:text-forest-600 transition-colors">
                      {cs.data.dog_name}
                    </h2>

                    {cs.data.location && (
                      <p className="text-sm text-gray-500 mt-2 flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        {cs.data.location}
                      </p>
                    )}

                    {cs.data.training_duration && (
                      <p className="text-sm text-gray-500 mt-1 flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
                        </svg>
                        {cs.data.training_duration}
                      </p>
                    )}

                    <div className="mt-5 text-sm font-semibold text-forest-700 flex items-center gap-1.5">
                      {cardCtaLabel}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
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
