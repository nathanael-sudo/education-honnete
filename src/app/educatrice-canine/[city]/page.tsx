import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Script from 'next/script'
import { notFound } from 'next/navigation'
import * as prismic from '@prismicio/client'
import { PrismicRichText } from '@prismicio/react'
import { createClient, siteUrl } from '@/prismicio'
import { localBusinessSchema, BUSINESS_ID } from '@/lib/structured-data'

type Props = { params: { city: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const client = createClient()
  try {
    const page = await client.getByUID('city_page', params.city)
    const pageUrl = `${siteUrl}/educatrice-canine/${params.city}`
    const title = page.data.meta_title ?? `Éducatrice canine à ${page.data.city_name ?? params.city} | Éducation Honnête`
    const description = page.data.meta_description ?? undefined
    return {
      title,
      description,
      alternates: { canonical: pageUrl },
      openGraph: { title, description, url: pageUrl, type: 'website' },
    }
  } catch {
    return { title: 'Éducatrice canine – Éducation Honnête' }
  }
}

export async function generateStaticParams() {
  const client = createClient()
  try {
    const pages = await client.getAllByType('city_page')
    return pages.map((p) => ({ city: p.uid }))
  } catch {
    return []
  }
}

export default async function CityPage({ params }: Props) {
  const client = createClient()
  let page
  try {
    page = await client.getByUID('city_page', params.city)
  } catch {
    notFound()
  }

  const {
    city_name, hero_title, hero_description,
    local_context, services_intro,
  } = page.data

  // Fetch case studies and filter to those mentioning this city
  let relatedCaseStudies: prismic.PrismicDocument[] = []
  try {
    const all = await client.getAllByType('case_study')
    const cityLower = (city_name ?? params.city).toLowerCase()
    relatedCaseStudies = all.filter((cs) =>
      (cs.data.location ?? '').toLowerCase().includes(cityLower)
    )
  } catch {
    // no case studies
  }

  // Build a city-specific LocalBusiness schema with this city highlighted
  const citySchema = {
    ...localBusinessSchema,
    areaServed: [
      { '@type': 'City', name: city_name ?? params.city },
      ...localBusinessSchema.areaServed,
    ],
  }

  const heroTitleNode = hero_title?.[0] as { text?: string } | undefined
  const heroTitleText = heroTitleNode?.text ?? `Éducatrice canine à ${city_name ?? params.city}`

  return (
    <div className="bg-cream min-h-screen">
      <Script
        id={`schema-lb-${params.city}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(citySchema) }}
      />

      {/* Hero */}
      <div className="bg-forest-800 py-20 px-4 text-center">
        <p className="text-amber-warm font-semibold text-sm uppercase tracking-widest mb-3">
          Manche · Normandie
        </p>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white mb-6">
          {heroTitleText}
        </h1>
        {prismic.isFilled.richText(hero_description) && (
          <div className="text-forest-200 text-lg max-w-2xl mx-auto leading-relaxed [&_p]:mb-3">
            <PrismicRichText field={hero_description} />
          </div>
        )}
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/reservation"
            className="px-6 py-3 rounded-full bg-amber-warm text-white font-semibold hover:bg-amber-600 transition-colors"
          >
            Réserver une séance
          </Link>
          <Link
            href="/prix"
            className="px-6 py-3 rounded-full border-2 border-forest-300 text-forest-200 font-semibold hover:bg-forest-700 transition-colors"
          >
            Voir les tarifs
          </Link>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 space-y-14">
        {/* Local context */}
        {prismic.isFilled.richText(local_context) && (
          <section>
            <h2 className="text-2xl font-serif font-bold text-forest-800 mb-5">
              Éducation canine à {city_name ?? params.city}
            </h2>
            <div className="prose-custom bg-white rounded-xl p-6 shadow-sm">
              <PrismicRichText field={local_context} />
            </div>
          </section>
        )}

        {/* Services */}
        {prismic.isFilled.richText(services_intro) && (
          <section>
            <h2 className="text-2xl font-serif font-bold text-forest-800 mb-5">
              Services proposés
            </h2>
            <div className="prose-custom bg-forest-50 border border-forest-200 rounded-xl p-6">
              <PrismicRichText field={services_intro} />
            </div>
          </section>
        )}

        {/* Related case studies */}
        {relatedCaseStudies.length > 0 && (
          <section>
            <h2 className="text-2xl font-serif font-bold text-forest-800 mb-6">
              Cas pratiques à {city_name ?? params.city}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {relatedCaseStudies.map((cs) => {
                const imgUrl = prismic.isFilled.image(cs.data.dog_portrait)
                  ? cs.data.dog_portrait.url
                  : null
                return (
                  <Link
                    key={cs.uid}
                    href={`/cas-pratiques-education-canine/${cs.uid}`}
                    className="group flex gap-4 bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all"
                  >
                    {imgUrl && (
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-forest-100">
                        <Image src={imgUrl} alt={cs.data.dog_name ?? ''} fill className="object-cover" sizes="80px" />
                      </div>
                    )}
                    <div>
                      <p className="text-xs font-semibold text-amber-warm uppercase tracking-wider mb-1">
                        {cs.data.dog_breed}
                      </p>
                      <p className="font-serif font-bold text-forest-800 group-hover:text-forest-600 transition-colors">
                        {cs.data.dog_name}
                      </p>
                      <p className="text-sm text-gray-500 mt-0.5">{cs.data.location}</p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="bg-forest-800 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-serif font-bold text-white mb-3">
            Prêt·e à commencer ?
          </h2>
          <p className="text-forest-200 mb-6 max-w-sm mx-auto">
            Réservez une première séance à {city_name ?? params.city} — à domicile, dans votre environnement.
          </p>
          <Link
            href="/reservation"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-amber-warm text-white font-semibold hover:bg-amber-600 transition-colors"
          >
            Réserver maintenant
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </section>
      </div>
    </div>
  )
}
