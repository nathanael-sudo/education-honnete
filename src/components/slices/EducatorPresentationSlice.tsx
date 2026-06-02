import Image from 'next/image'
import Link from 'next/link'
import * as prismic from '@prismicio/client'
import { PrismicRichText } from '@prismicio/react'

type StatItem = {
  figure: prismic.KeyTextField
  label: prismic.KeyTextField
}

type EducatorSlice = {
  slice_type: 'educator_presentation'
  variation: 'default'
  primary: {
    educator_image: prismic.ImageField
    eyebrow: prismic.KeyTextField
    name: prismic.RichTextField
    description: prismic.RichTextField
    locations: prismic.KeyTextField
    google_reviews_label: prismic.KeyTextField
    google_reviews_link: prismic.LinkField
  }
  items: StatItem[]
}

export default function EducatorPresentationSlice({ slice }: { slice: EducatorSlice }) {
  const { educator_image, eyebrow, name, description, locations, google_reviews_label, google_reviews_link } = slice.primary
  const imgUrl = prismic.isFilled.image(educator_image) ? educator_image.url : null
  const reviewsHref = prismic.isFilled.link(google_reviews_link)
    ? (google_reviews_link as prismic.FilledLinkToWebField).url
    : null

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          {imgUrl && (
            <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3]">
              <Image
                src={imgUrl}
                alt={educator_image.alt ?? 'Éducatrice canine'}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          )}

          {/* Bio */}
          <div>
            {eyebrow && (
              <p className="text-amber-warm font-semibold text-sm uppercase tracking-wider mb-2">{eyebrow}</p>
            )}

            {prismic.isFilled.richText(name) && (
              <div className="mb-6 [&_h2]:text-3xl [&_h2]:sm:text-4xl [&_h2]:font-serif [&_h2]:font-bold [&_h2]:text-forest-800">
                <PrismicRichText field={name} />
              </div>
            )}

            {prismic.isFilled.richText(description) && (
              <div className="prose-custom mb-6">
                <PrismicRichText field={description} />
              </div>
            )}

            {/* Stats */}
            {slice.items.length > 0 && (
              <div className="flex gap-8 mb-6">
                {slice.items.map((item, i) => (
                  <div key={i} className="text-center">
                    <p className="text-3xl font-bold font-serif text-forest-700">{item.figure}</p>
                    <p className="text-xs text-gray-500 mt-1 max-w-[100px]">{item.label}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Location */}
            {locations && (
              <div className="flex items-start gap-2 mb-6 text-sm text-gray-600">
                <svg className="w-4 h-4 mt-0.5 shrink-0 text-forest-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{locations}</span>
              </div>
            )}

            {/* Google reviews */}
            {reviewsHref && google_reviews_label && (
              <Link
                href={reviewsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-forest-700 text-forest-700 text-sm font-semibold hover:bg-forest-700 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                {google_reviews_label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
