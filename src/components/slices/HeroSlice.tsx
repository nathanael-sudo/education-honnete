import Image from 'next/image'
import Link from 'next/link'
import * as prismic from '@prismicio/client'
import { PrismicRichText } from '@prismicio/react'

type HeroSlice = {
  slice_type: 'hero'
  variation: 'default'
  primary: {
    title: prismic.RichTextField
    description: prismic.RichTextField
    primary_cta_label: prismic.KeyTextField
    primary_cta_link: prismic.LinkField
    background_image: prismic.ImageField
  }
  items: Record<string, never>[]
}

function resolveHref(link: prismic.LinkField): string {
  if (!prismic.isFilled.link(link)) return '/'
  if (link.link_type === 'Web') return (link as prismic.FilledLinkToWebField).url
  return '/'
}

export default function HeroSlice({ slice }: { slice: HeroSlice }) {
  const { title, description, primary_cta_label, primary_cta_link, background_image } = slice.primary
  const imgUrl = prismic.isFilled.image(background_image) ? background_image.url : null

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Background image */}
      {imgUrl && (
        <div className="absolute inset-0">
          <Image
            src={imgUrl}
            alt={background_image.alt ?? ''}
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-forest-900/80 via-forest-900/60 to-transparent" />
        </div>
      )}

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-2xl">
          {prismic.isFilled.richText(title) && (
            <div className="text-white mb-6 [&_h1]:text-4xl [&_h1]:sm:text-5xl [&_h1]:lg:text-6xl [&_h1]:font-serif [&_h1]:font-bold [&_h1]:leading-tight">
              <PrismicRichText field={title} />
            </div>
          )}

          {prismic.isFilled.richText(description) && (
            <div className="text-forest-100 text-lg leading-relaxed mb-10 [&_p]:mb-2">
              <PrismicRichText field={description} />
            </div>
          )}

          <div className="flex flex-wrap gap-4">
            {prismic.isFilled.link(primary_cta_link) && primary_cta_label && (
              <Link
                href={resolveHref(primary_cta_link)}
                className="inline-flex items-center px-6 py-3 rounded-full bg-amber-warm text-white font-semibold hover:bg-amber-600 transition-colors shadow-lg"
              >
                {primary_cta_label}
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 animate-bounce">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  )
}
