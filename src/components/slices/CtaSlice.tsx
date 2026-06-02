import Link from 'next/link'
import * as prismic from '@prismicio/client'
import { PrismicRichText } from '@prismicio/react'

type CtaSlice = {
  slice_type: 'cta'
  variation: 'default'
  primary: {
    title: prismic.KeyTextField
    description: prismic.RichTextField
    button_label: prismic.KeyTextField
    button_link: prismic.LinkField
  }
  items: Record<string, never>[]
}

function resolveHref(link: prismic.LinkField): string {
  if (!prismic.isFilled.link(link)) return '/reservation'
  if (link.link_type === 'Web') return (link as prismic.FilledLinkToWebField).url
  return '/reservation'
}

export default function CtaSlice({ slice }: { slice: CtaSlice }) {
  const { title, description, button_label, button_link } = slice.primary

  return (
    <section className="py-20 bg-forest-800">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {title && (
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-4">{title}</h2>
        )}

        {prismic.isFilled.richText(description) && (
          <div className="text-forest-200 text-lg mb-10 [&_p]:leading-relaxed">
            <PrismicRichText field={description} />
          </div>
        )}

        {prismic.isFilled.link(button_link) && button_label && (
          <Link
            href={resolveHref(button_link)}
            className="inline-flex items-center px-8 py-4 rounded-full bg-amber-warm text-white text-lg font-semibold hover:bg-amber-600 transition-colors shadow-lg"
          >
            {button_label}
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        )}
      </div>
    </section>
  )
}
