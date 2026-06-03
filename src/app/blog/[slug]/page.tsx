import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import { notFound } from 'next/navigation'
import * as prismic from '@prismicio/client'
import { PrismicRichText } from '@prismicio/react'
import { createClient, siteUrl } from '@/prismicio'
import { articleSchema } from '@/lib/structured-data'

type Props = { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const client = createClient()
  try {
    const post = await client.getByUID('blog_post', params.slug)
    const firstNode = post.data.title?.[0] as { text?: string } | undefined
    const titleText = firstNode?.text ?? (post.data.title as unknown as string) ?? ''
    const description = post.data.meta_description ?? post.data.excerpt ?? undefined
    const pageUrl = `${siteUrl}/blog/${params.slug}`
    return {
      title: titleText,
      description,
      alternates: { canonical: pageUrl },
      openGraph: {
        title: titleText,
        description,
        url: pageUrl,
        type: 'article',
        publishedTime: post.data.publication_date ?? undefined,
        images: prismic.isFilled.image(post.data.cover_image)
          ? [{ url: post.data.cover_image.url! }]
          : undefined,
      },
    }
  } catch {
    return { title: 'Article – Éducation Honnête' }
  }
}

export async function generateStaticParams() {
  const client = createClient()
  try {
    const posts = await client.getAllByType('blog_post')
    return posts.map((p) => ({ slug: p.uid }))
  } catch {
    return []
  }
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default async function BlogPostPage({ params }: Props) {
  const client = createClient()
  let post
  try {
    post = await client.getByUID('blog_post', params.slug)
  } catch {
    notFound()
  }

  const bodyFirstNode = post.data.title?.[0] as { text?: string } | undefined
  const titleText = bodyFirstNode?.text ?? (post.data.title as unknown as string) ?? ''
  const imgUrl = prismic.isFilled.image(post.data.cover_image) ? post.data.cover_image.url : null
  const tags: { tag: string | null }[] = post.data.tags ?? []
  const pageUrl = `${siteUrl}/blog/${params.slug}`

  return (
    <article className="bg-cream min-h-screen">
      <Script
        id={`schema-article-blog-${params.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleSchema({
              headline: titleText,
              datePublished: post.data.publication_date ?? undefined,
              url: pageUrl,
            })
          ),
        }}
      />

      {/* Hero */}
      <div className="bg-forest-800 py-14 px-4 relative overflow-hidden">
        {imgUrl && (
          <div className="absolute inset-0 opacity-15">
            <Image src={imgUrl} alt="" fill className="object-cover" priority />
          </div>
        )}
        <div className="relative max-w-3xl mx-auto text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-forest-300 hover:text-white text-sm mb-6 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Blog
          </Link>
          {tags.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {tags.slice(0, 4).map((t, i) => (
                <span key={i} className="text-xs px-3 py-1 rounded-full bg-forest-700 text-forest-200 font-medium">
                  {t.tag}
                </span>
              ))}
            </div>
          )}
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white leading-tight">
            {titleText}
          </h1>
          {post.data.publication_date && (
            <p className="mt-4 text-forest-300 text-sm">
              {formatDate(post.data.publication_date)} · Marie-Anne Lamellière
            </p>
          )}
        </div>
      </div>

      {/* Cover image */}
      {imgUrl && (
        <div className="max-w-3xl mx-auto px-4 -mt-8 mb-10">
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src={imgUrl}
              alt={titleText}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
        </div>
      )}

      {/* Excerpt */}
      {post.data.excerpt && (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 mb-8">
          <p className="text-lg text-gray-600 leading-relaxed italic border-l-4 border-amber-warm pl-4">
            {post.data.excerpt}
          </p>
        </div>
      )}

      {/* Body */}
      {prismic.isFilled.richText(post.data.body) && (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-16">
          <div className="prose-custom bg-white rounded-2xl p-6 sm:p-10 shadow-sm">
            <PrismicRichText field={post.data.body} />
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="bg-forest-800 py-12 px-4 text-center">
        <h2 className="text-2xl font-serif font-bold text-white mb-3">
          Besoin d'un accompagnement personnalisé ?
        </h2>
        <p className="text-forest-200 mb-6 max-w-md mx-auto">
          Marie-Anne intervient à domicile sur Granville, Coutances et tout le secteur Manche.
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
      </div>

      {/* Back to blog */}
      <div className="text-center py-8 px-4">
        <Link href="/blog" className="inline-flex items-center gap-2 text-forest-700 font-semibold hover:text-forest-900 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Retour au blog
        </Link>
      </div>
    </article>
  )
}
