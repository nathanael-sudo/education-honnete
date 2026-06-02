import Image from 'next/image'
import * as prismic from '@prismicio/client'
import { PrismicRichText } from '@prismicio/react'

type ImageTextSlice = {
  slice_type: 'image_text'
  variation: 'default'
  primary: {
    image: prismic.ImageField
    text: prismic.RichTextField
  }
  items: Record<string, never>[]
}

export default function ImageTextSlice({ slice }: { slice: ImageTextSlice }) {
  const { image, text } = slice.primary
  const imgUrl = prismic.isFilled.image(image) ? image.url : null

  return (
    <section className="py-20 bg-cream">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {imgUrl && (
            <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-[4/3]">
              <Image
                src={imgUrl}
                alt={image.alt ?? ''}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          )}
          {prismic.isFilled.richText(text) && (
            <div className="prose-custom">
              <PrismicRichText field={text} />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
