import Image from 'next/image'
import * as prismic from '@prismicio/client'
import { PrismicRichText } from '@prismicio/react'

type ContentSlice = {
  slice_type: 'content'
  variation: 'default'
  primary: {
    title: prismic.KeyTextField
    image: prismic.ImageField
    body: prismic.RichTextField
  }
  items: Record<string, never>[]
}

export default function ContentSlice({ slice }: { slice: ContentSlice }) {
  const { title, image, body } = slice.primary
  const imgUrl = prismic.isFilled.image(image) ? image.url : null

  return (
    <section className="py-20 bg-cream">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            {title && (
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-forest-800 mb-6">{title}</h2>
            )}
            {prismic.isFilled.richText(body) && (
              <div className="prose-custom">
                <PrismicRichText field={body} />
              </div>
            )}
          </div>

          {imgUrl && (
            <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-video">
              <Image
                src={imgUrl}
                alt={image.alt ?? ''}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
