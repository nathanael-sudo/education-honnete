import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import * as prismic from '@prismicio/client'
import { PrismicRichText } from '@prismicio/react'
import { createClient, siteUrl } from '@/prismicio'
import BreedFaq from '@/components/BreedFaq'

type Props = { params: { uid: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const client = createClient()
  try {
    const breed = await client.getByUID('race', params.uid)
    const pageUrl = `${siteUrl}/races/${params.uid}`
    const title = breed.data.meta_title ?? `${breed.data.nom ?? params.uid} : éducation et comportement | Éducation Honnête`
    const description = breed.data.meta_description ?? undefined
    return {
      title,
      description,
      alternates: { canonical: pageUrl },
      openGraph: {
        title,
        description,
        url: pageUrl,
        type: 'website',
        images: prismic.isFilled.image(breed.data.meta_image)
          ? [{ url: breed.data.meta_image.url! }]
          : prismic.isFilled.image(breed.data.photo)
          ? [{ url: breed.data.photo.url! }]
          : undefined,
      },
    }
  } catch {
    return { title: 'Race – Éducation Honnête' }
  }
}

export async function generateStaticParams() {
  const client = createClient()
  try {
    const breeds = await client.getAllByType('race')
    return breeds.map((b) => ({ uid: b.uid }))
  } catch {
    return []
  }
}

export default async function BreedPage({ params }: Props) {
  const client = createClient()
  let breed: prismic.PrismicDocument
  try {
    breed = await client.getByUID('race', params.uid)
  } catch {
    notFound()
  }

  const { nom, photo, description, faq } = breed.data

  const imgUrl = prismic.isFilled.image(photo) ? photo.url : null
  const faqItems: { question: prismic.KeyTextField; reponse: prismic.RichTextField }[] = faq ?? []

  // Fetch case studies linked to this breed
  let linkedCaseStudies: prismic.PrismicDocument[] = []
  try {
    linkedCaseStudies = await client.getAllByType('case_study', {
      filters: [prismic.filter.at('my.case_study.race', breed.id)],
    })
  } catch {
    // none linked yet
  }

  return (
    <div className="bg-cream min-h-screen">
      {/* Hero */}
      <div className="bg-forest-800 py-20 px-4 relative overflow-hidden">
        {imgUrl && (
          <div className="absolute inset-0 opacity-20">
            <Image src={imgUrl} alt="" fill className="object-cover" priority />
          </div>
        )}
        <div className="relative max-w-3xl mx-auto text-center">
          <Link
            href="/races"
            className="inline-flex items-center gap-1.5 text-forest-300 hover:text-white text-sm mb-6 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Toutes les races
          </Link>
          <p className="text-amber-warm font-semibold text-sm uppercase tracking-widest mb-3">Fiche race</p>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white leading-tight">{nom}</h1>
        </div>
      </div>

      {/* Breed photo */}
      {imgUrl && (
        <div className="max-w-3xl mx-auto px-4 -mt-10 mb-12">
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src={imgUrl}
              alt={nom ?? ''}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
        </div>
      )}

      <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-20 space-y-16">
        {/* Description */}
        {prismic.isFilled.richText(description) && (
          <section>
            <h2 className="text-2xl font-serif font-bold text-forest-800 mb-6">
              Caractère et éducation du {nom}
            </h2>
            <div className="prose-custom bg-white rounded-2xl p-6 sm:p-10 shadow-sm">
              <PrismicRichText field={description} />
            </div>
          </section>
        )}

        {/* FAQ */}
        {faqItems.length > 0 && (
          <section>
            <h2 className="text-2xl font-serif font-bold text-forest-800 mb-6 text-center">
              Questions fréquentes sur le {nom}
            </h2>
            <BreedFaq items={faqItems} />
          </section>
        )}

        {/* Linked case studies */}
        {linkedCaseStudies.length > 0 && (
          <section>
            <h2 className="text-2xl font-serif font-bold text-forest-800 mb-6">
              Cas pratiques — {nom}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {linkedCaseStudies.map((cs) => {
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
                        <Image
                          src={imgUrl}
                          alt={cs.data.dog_name ?? ''}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
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
            Un {nom} à éduquer ?
          </h2>
          <p className="text-forest-200 mb-6 max-w-sm mx-auto">
            Marie-Anne intervient à domicile en Manche et Normandie avec une approche positive adaptée à chaque race.
          </p>
          <Link
            href="/reservation"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-amber-warm text-white font-semibold hover:bg-amber-600 transition-colors"
          >
            Réserver une séance
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </section>
      </div>
    </div>
  )
}
