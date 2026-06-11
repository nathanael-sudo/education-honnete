import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import * as prismic from '@prismicio/client'
import { PrismicRichText } from '@prismicio/react'
import { createClient, siteUrl } from '@/prismicio'

const MARIE_ANNE_AVATAR = 'https://images.prismic.io/education-honnete/aisfMqlQnVZVEOqs_Screenshot2026-06-11at22.48.33.png?auto=format,compress'

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient()
  try {
    const page = await client.getSingle('recommandations')
    return {
      title: page.data.meta_title ?? 'Recommandations clients | Éducation Honnête',
      description: page.data.meta_description ?? "Découvrez les avis de nos clients sur l'éducation canine avec Marie-Anne Lamellière.",
      alternates: { canonical: `${siteUrl}/recommandations` },
    }
  } catch {
    return { title: 'Recommandations | Éducation Honnête' }
  }
}

function StarRating() {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} className="w-5 h-5 text-amber-warm fill-current" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default async function RecommandationsPage() {
  const client = createClient()
  const page = await client.getSingle('recommandations')

  const googleUrl = prismic.isFilled.link(page.data.google_url)
    ? (page.data.google_url as prismic.FilledLinkToWebField).url
    : 'https://share.google/pz9ZOYebRKQzZYNid'

  type ReviewItem = {
    name: string | null
    dog_name: string | null
    date: string | null
    sort_date: string | null
    text: prismic.RichTextField
    response: prismic.RichTextField
  }

  const reviews = [...(page.data.reviews as ReviewItem[] ?? [])]
    .filter((r) => r.name && prismic.isFilled.richText(r.text))
    .sort((a, b) => (b.sort_date ?? '').localeCompare(a.sort_date ?? ''))

  const totalReviews = reviews.length || 28

  return (
    <div className="bg-cream min-h-screen">

      {/* Hero */}
      <div className="bg-forest-800 py-16 px-4 text-center">
        <p className="text-amber-warm font-semibold text-sm uppercase tracking-widest mb-3">Avis clients</p>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white mb-6">Recommandations</h1>

        {/* Rating summary */}
        <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-forest-700/50 rounded-2xl px-8 py-4 mb-6">
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <svg key={i} className="w-7 h-7 text-amber-warm fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <div className="text-white text-center sm:text-left">
            <span className="text-2xl font-serif font-bold">5,0</span>
            <span className="text-forest-300 ml-2 text-sm">{totalReviews} avis · Moyenne 5 étoiles</span>
          </div>
        </div>

        <div>
          <a
            href={googleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-forest-800 font-semibold text-sm hover:bg-gray-50 transition-colors shadow"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Lire sur Google
          </a>
        </div>
      </div>

      {/* Reviews list */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 space-y-6">
        {reviews.map((review, i) => (
          <article key={i} className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {/* Review header */}
            <div className="p-6 pb-4">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-forest-700 flex items-center justify-center text-white font-bold text-lg shrink-0">
                    {(review.name ?? '?').charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-forest-800 leading-tight">{review.name}</p>
                    {review.dog_name && (
                      <p className="text-xs text-amber-warm font-medium uppercase tracking-wide">{review.dog_name}</p>
                    )}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <StarRating />
                  <p className="text-xs text-gray-400 mt-1">{review.date}</p>
                </div>
              </div>
              <div className="text-gray-700 leading-relaxed text-[0.95rem] [&_p]:mb-2 [&_p:last-child]:mb-0">
                <PrismicRichText field={review.text} />
              </div>
            </div>

            {/* Marie-Anne's response */}
            {prismic.isFilled.richText(review.response) && (
              <div className="border-t border-gray-100 bg-forest-50 px-6 py-4">
                <div className="flex gap-3">
                  <Image
                    src={MARIE_ANNE_AVATAR}
                    alt="Marie-Anne Lamellière"
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full object-cover shrink-0"
                  />
                  <div>
                    <p className="text-xs font-semibold text-forest-700 mb-1">Marie-Anne — Éducation Honnête</p>
                    <div className="text-sm text-gray-600 leading-relaxed [&_p]:mb-1 [&_p:last-child]:mb-0">
                      <PrismicRichText field={review.response} />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </article>
        ))}
      </div>

      {/* CTA */}
      <div className="bg-forest-800 py-12 px-4 text-center">
        <h2 className="text-2xl font-serif font-bold text-white mb-3">
          {"Prêt·e à commencer ?"}
        </h2>
        <p className="text-forest-200 mb-6 max-w-sm mx-auto">
          Rejoignez les familles qui ont fait confiance à Marie-Anne pour leur chien.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/reservation"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-amber-warm text-white font-semibold hover:bg-amber-600 transition-colors"
          >
            Réserver une séance
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
          <a
            href={googleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border-2 border-forest-400 text-forest-200 font-semibold hover:bg-forest-700 transition-colors"
          >
            Lire sur Google
          </a>
        </div>
      </div>
    </div>
  )
}
