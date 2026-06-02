import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import * as prismic from '@prismicio/client'
import { PrismicRichText } from '@prismicio/react'
import { createClient } from '@/prismicio'
import PhotoCarousel from '@/components/PhotoCarousel'

type Props = { params: { uid: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const client = createClient()
  try {
    const doc = await client.getByUID('case_study', params.uid)
    return {
      title: doc.data.meta_title ?? `${doc.data.dog_name} – Éducation Honnête`,
      description: doc.data.meta_description ?? undefined,
    }
  } catch {
    return { title: 'Cas pratique – Éducation Honnête' }
  }
}

export async function generateStaticParams() {
  const client = createClient()
  const docs = await client.getAllByType('case_study')
  return docs.map((doc) => ({ uid: doc.uid }))
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${i < rating ? 'text-amber-warm fill-current' : 'text-gray-300 fill-current'}`}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default async function CaseStudyPage({ params }: Props) {
  const client = createClient()
  let doc
  try {
    doc = await client.getByUID('case_study', params.uid)
  } catch {
    notFound()
  }

  const {
    dog_name, dog_breed, dog_portrait, location, training_duration,
    initial_problem_title, initial_problem_content,
    educator_approach_title, educator_approach_content,
    photo_carousel,
    results_title, results_content,
    testimonial_title, testimonial_owner_name, testimonial_owner_location,
    testimonial_rating, testimonial_content,
  } = doc.data

  const portraitUrl = prismic.isFilled.image(dog_portrait) ? dog_portrait.url : null

  const carouselImages = (photo_carousel ?? [])
    .filter((item: { carousel_image: prismic.ImageField }) => prismic.isFilled.image(item.carousel_image))
    .map((item: { carousel_image: prismic.ImageField; image_caption: prismic.KeyTextField }) => ({
      url: item.carousel_image.url!,
      alt: item.carousel_image.alt ?? null,
      caption: item.image_caption ?? null,
    }))

  return (
    <article className="bg-cream min-h-screen">
      {/* Hero */}
      <div className="bg-forest-800 pt-16 pb-20 px-4 relative overflow-hidden">
        {portraitUrl && (
          <div className="absolute inset-0 opacity-20">
            <Image src={portraitUrl} alt="" fill className="object-cover" priority />
          </div>
        )}
        <div className="relative max-w-4xl mx-auto text-center">
          <Link
            href="/cas-pratiques-education-canine"
            className="inline-flex items-center gap-1.5 text-forest-300 hover:text-white text-sm mb-6 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Tous les cas pratiques
          </Link>
          <p className="text-amber-warm font-semibold text-sm uppercase tracking-widest mb-2">{dog_breed}</p>
          <h1 className="text-5xl sm:text-6xl font-serif font-bold text-white mb-4">{dog_name}</h1>
          <div className="flex items-center justify-center flex-wrap gap-4 text-forest-200 text-sm">
            {location && (
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
                </svg>
                {location}
              </span>
            )}
            {training_duration && (
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" /><path strokeLinecap="round" d="M12 6v6l4 2" />
                </svg>
                {training_duration}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Portrait card */}
      {portraitUrl && (
        <div className="max-w-2xl mx-auto px-4 -mt-10 mb-12">
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src={portraitUrl}
              alt={dog_portrait.alt ?? dog_name ?? ''}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 672px"
            />
          </div>
        </div>
      )}

      <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-20 space-y-14">
        {/* Problem */}
        {prismic.isFilled.richText(initial_problem_content) && (
          <section>
            <h2 className="text-2xl font-serif font-bold text-forest-800 mb-4">
              {initial_problem_title ?? 'Problème initial'}
            </h2>
            <div className="prose-custom bg-white rounded-xl p-6 shadow-sm">
              <PrismicRichText field={initial_problem_content} />
            </div>
          </section>
        )}

        {/* Approach */}
        {prismic.isFilled.richText(educator_approach_content) && (
          <section>
            <h2 className="text-2xl font-serif font-bold text-forest-800 mb-4">
              {educator_approach_title ?? "Approche de l'éducatrice"}
            </h2>
            <div className="prose-custom bg-white rounded-xl p-6 shadow-sm">
              <PrismicRichText field={educator_approach_content} />
            </div>
          </section>
        )}

        {/* Photo carousel */}
        {carouselImages.length > 0 && (
          <section>
            <h2 className="text-2xl font-serif font-bold text-forest-800 mb-6">Photos</h2>
            <PhotoCarousel images={carouselImages} />
          </section>
        )}

        {/* Results */}
        {prismic.isFilled.richText(results_content) && (
          <section>
            <h2 className="text-2xl font-serif font-bold text-forest-800 mb-4">
              {results_title ?? 'Résultats'}
            </h2>
            <div className="prose-custom bg-forest-50 border border-forest-200 rounded-xl p-6">
              <PrismicRichText field={results_content} />
            </div>
          </section>
        )}

        {/* Testimonial */}
        {prismic.isFilled.richText(testimonial_content) && (
          <section>
            <h2 className="text-2xl font-serif font-bold text-forest-800 mb-6">
              {testimonial_title ?? 'Témoignage'}
            </h2>
            <blockquote className="bg-white rounded-2xl p-8 shadow-md border-l-4 border-amber-warm">
              {testimonial_rating && (
                <div className="mb-4">
                  <StarRating rating={Number(testimonial_rating)} />
                </div>
              )}
              <div className="text-gray-700 text-lg leading-relaxed italic [&_p]:mb-2">
                <PrismicRichText field={testimonial_content} />
              </div>
              <footer className="mt-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-forest-100 flex items-center justify-center text-forest-700 font-bold text-lg">
                  {testimonial_owner_name?.charAt(0) ?? '?'}
                </div>
                <div>
                  <p className="font-semibold text-forest-800">{testimonial_owner_name}</p>
                  {testimonial_owner_location && (
                    <p className="text-sm text-gray-500">{testimonial_owner_location}</p>
                  )}
                </div>
              </footer>
            </blockquote>
          </section>
        )}

        {/* Back link */}
        <div className="text-center pt-4">
          <Link
            href="/cas-pratiques-education-canine"
            className="inline-flex items-center gap-2 text-forest-700 font-semibold hover:text-forest-900 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Tous les cas pratiques
          </Link>
        </div>
      </div>
    </article>
  )
}
