import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import * as prismic from '@prismicio/client'
import { createClient, siteUrl } from '@/prismicio'

export const metadata: Metadata = {
  title: 'Conseils éducation canine – Blog',
  description:
    'Articles et conseils pratiques sur l\'éducation canine par Marie-Anne Lamellière, éducatrice canine en Normandie. Renforcement positif, réactivité, rappel, chiot.',
  alternates: { canonical: `${siteUrl}/blog` },
  openGraph: {
    title: 'Conseils éducation canine – Blog | Éducation Honnête',
    description: 'Articles pratiques sur l\'éducation canine bienveillante par Marie-Anne Lamellière.',
    url: `${siteUrl}/blog`,
    type: 'website',
  },
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default async function BlogPage() {
  const client = createClient()
  let posts: prismic.PrismicDocument[] = []
  try {
    posts = await client.getAllByType('blog_post', {
      orderings: [{ field: 'my.blog_post.publication_date', direction: 'desc' }],
    })
  } catch {
    // no posts yet
  }

  return (
    <div className="bg-cream min-h-screen">
      <div className="bg-forest-800 py-16 px-4 text-center">
        <p className="text-amber-warm font-semibold text-sm uppercase tracking-widest mb-3">Ressources</p>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white">Blog & Conseils</h1>
        <p className="mt-4 text-forest-200 text-lg max-w-xl mx-auto">
          Comprendre et accompagner votre chien au quotidien.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {posts.length === 0 ? (
          <p className="text-center text-gray-500 py-20">
            Aucun article publié pour le moment. Revenez bientôt !
          </p>
        ) : (
          <div className="space-y-10">
            {posts.map((post) => {
              const imgUrl = prismic.isFilled.image(post.data.cover_image)
                ? post.data.cover_image.url
                : null
              const firstNode = post.data.title?.[0] as { text?: string } | undefined
              const titleText = firstNode?.text ?? (post.data.title as unknown as string) ?? ''
              const tags: { tag: string | null }[] = post.data.tags ?? []

              return (
                <Link
                  key={post.uid}
                  href={`/blog/${post.uid}`}
                  className="group flex flex-col sm:flex-row gap-6 bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                >
                  {imgUrl && (
                    <div className="relative sm:w-64 aspect-[16/9] sm:aspect-auto shrink-0 overflow-hidden bg-forest-100">
                      <Image
                        src={imgUrl}
                        alt={titleText}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, 256px"
                      />
                    </div>
                  )}
                  <div className="p-6 flex flex-col justify-center">
                    {post.data.publication_date && (
                      <p className="text-xs text-gray-400 mb-2">
                        {formatDate(post.data.publication_date)}
                      </p>
                    )}
                    <h2 className="text-xl font-serif font-bold text-forest-800 group-hover:text-forest-600 transition-colors leading-snug mb-2">
                      {titleText}
                    </h2>
                    {post.data.excerpt && (
                      <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 mb-4">
                        {post.data.excerpt}
                      </p>
                    )}
                    {tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {tags.slice(0, 4).map((t, i) => (
                          <span key={i} className="text-xs px-2.5 py-1 rounded-full bg-forest-50 text-forest-700 font-medium">
                            {t.tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <span className="text-sm font-semibold text-forest-700 flex items-center gap-1">
                      Lire l'article
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
