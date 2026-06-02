import * as prismic from '@prismicio/client'

type VideoEmbedSlice = {
  slice_type: 'video_embed'
  variation: 'default'
  primary: {
    embed: prismic.EmbedField
  }
  items: Record<string, never>[]
}

export default function VideoEmbedSlice({ slice }: { slice: VideoEmbedSlice }) {
  const { embed } = slice.primary
  if (!prismic.isFilled.embed(embed)) return null

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="aspect-video rounded-xl overflow-hidden shadow-xl [&_iframe]:w-full [&_iframe]:h-full"
          dangerouslySetInnerHTML={{ __html: embed.html ?? '' }}
        />
        {embed.title && (
          <p className="text-center text-sm text-gray-500 mt-3">{embed.title}</p>
        )}
      </div>
    </section>
  )
}
