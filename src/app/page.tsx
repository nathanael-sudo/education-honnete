import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import * as prismic from '@prismicio/client'
import { createClient, siteUrl } from '@/prismicio'
import SliceZone from '@/components/SliceZone'
import FaqSection from '@/components/FaqSection'

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient()
  const page = await client.getSingle('homepage')
  return {
    title: 'Éducatrice canine Granville & Coutances | Éducation Honnête',
    description:
      page.data.meta_description ??
      'Marie-Anne Lamellière, éducatrice canine bienveillante à Granville et Coutances (Manche). Renforcement positif, cours à domicile.',
    alternates: { canonical: siteUrl },
    openGraph: {
      title: 'Éducatrice canine Granville & Coutances | Éducation Honnête',
      description:
        'Éducatrice canine bienveillante à Granville et Coutances. Renforcement positif, cours à domicile.',
      url: siteUrl,
      type: 'website',
    },
  }
}

const HOMEPAGE_FAQ = [
  {
    q: "Qu'est-ce que l'éducation canine positive ?",
    a: "L'éducation canine positive, ou par renforcement positif, consiste à récompenser les comportements souhaités plutôt que punir les indésirables. Cette approche, validée par les sciences du comportement animal, crée une relation de confiance durable entre le chien et son maître et donne des résultats plus stables dans le temps.",
  },
  {
    q: 'Dans quelles villes intervenez-vous ?',
    a: 'Marie-Anne Lamellière intervient sur tout le secteur Coutançais et Granvillais : Granville, Coutances, Bréhal, Hauteville-sur-Mer, Montmartin-sur-Mer, Lingreville et les communes environnantes. Les frais de déplacement sont inclus dans ce secteur.',
  },
  {
    q: "Combien de séances faut-il pour éduquer un chien ?",
    a: "Cela dépend du chien et des objectifs. Pour un chiot sans problème particulier, 3 à 5 séances suffisent souvent pour poser de bonnes bases. Pour une rééducation comportementale (réactivité, anxiété, agressivité), il faut généralement compter entre 5 et 10 séances pour des résultats durables.",
  },
  {
    q: 'Intervenez-vous à domicile ?',
    a: "Oui, tous les cours se déroulent à domicile ou dans un lieu adapté près de chez vous (parc, forêt, environnement du chien). Travailler dans le quotidien du chien est essentiel pour obtenir des résultats concrets.",
  },
  {
    q: "Quelle est la différence entre un éducateur canin et un comportementaliste ?",
    a: "Un éducateur canin apprend des comportements nouveaux au chien (assis, rappel, marche en laisse). Un comportementaliste traite des troubles comportementaux plus profonds (peurs, phobies, réactivité, anxiété). Marie-Anne pratique les deux : elle accompagne aussi bien l'éducation du chiot que la rééducation de chiens adultes présentant des comportements difficiles.",
  },
  {
    q: "Mon chien est adulte, est-il trop tard pour l'éduquer ?",
    a: "Non, un chien peut apprendre à tout âge. Si les automatismes d'un chiot sont plus faciles à construire, un chien adulte est tout à fait capable d'apprendre de nouveaux comportements et de se débarrasser de mauvaises habitudes avec la bonne méthode et de la régularité.",
  },
]

const COVERED_CITIES = [
  { name: 'Granville', slug: 'granville' },
  { name: 'Coutances', slug: 'coutances' },
  { name: 'Bréhal', slug: 'brehal' },
  { name: 'Hauteville-sur-Mer', slug: null },
  { name: 'Montmartin-sur-Mer', slug: null },
  { name: 'Lingreville', slug: null },
  { name: 'Cerisy-la-Salle', slug: null },
]

export default async function HomePage() {
  const client = createClient()
  const page = await client.getSingle('homepage')

  let recentPosts: prismic.PrismicDocument[] = []
  try {
    recentPosts = await client.getAllByType('blog_post', {
      orderings: [{ field: 'my.blog_post.publication_date', direction: 'desc' }],
      limit: 3,
    })
  } catch {
    // no blog posts yet
  }

  return (
    <>
      <SliceZone slices={page.data.slices} />

      {/* Blog preview section */}
      {recentPosts.length > 0 && (
        <section className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-amber-warm font-semibold text-sm uppercase tracking-widest mb-2">Ressources</p>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-forest-800">
                Conseils d'éducation canine
              </h2>
              <p className="mt-3 text-gray-600 max-w-xl mx-auto">
                Ressources gratuites pour comprendre et accompagner votre chien au quotidien.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentPosts.map((post) => {
                const imgUrl = prismic.isFilled.image(post.data.cover_image)
                  ? post.data.cover_image.url
                  : null
                const firstNode = post.data.title?.[0] as { text?: string } | undefined
                const titleText = firstNode?.text ?? (post.data.title as unknown as string) ?? ''
                const date = post.data.publication_date
                  ? new Date(post.data.publication_date).toLocaleDateString('fr-FR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })
                  : null
                return (
                  <Link
                    key={post.uid}
                    href={`/blog/${post.uid}`}
                    className="group bg-cream rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 flex flex-col"
                  >
                    {imgUrl && (
                      <div className="relative aspect-[16/9] overflow-hidden bg-forest-100">
                        <Image
                          src={imgUrl}
                          alt={titleText}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                    )}
                    <div className="p-5 flex flex-col flex-1">
                      {date && <p className="text-xs text-gray-400 mb-2">{date}</p>}
                      <h3 className="font-serif font-bold text-forest-800 text-lg leading-snug group-hover:text-forest-600 transition-colors mb-2">
                        {titleText}
                      </h3>
                      {post.data.excerpt && (
                        <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 flex-1">
                          {post.data.excerpt}
                        </p>
                      )}
                      <span className="mt-4 text-sm font-semibold text-forest-700 flex items-center gap-1">
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
            <div className="text-center mt-10">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-forest-700 text-forest-700 font-semibold hover:bg-forest-700 hover:text-white transition-colors text-sm"
              >
                Voir tous les articles
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Zone d'intervention */}
      <section className="py-16 px-4 bg-forest-50">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-amber-warm font-semibold text-sm uppercase tracking-widest mb-2">Secteur</p>
          <h2 className="text-3xl font-serif font-bold text-forest-800 mb-4">Zone d'intervention</h2>
          <p className="text-gray-600 leading-relaxed mb-8 max-w-2xl mx-auto">
            Marie-Anne intervient dans un rayon de 30 km autour de Granville et Coutances.
            Les frais de déplacement sont inclus dans ce secteur.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {COVERED_CITIES.map((city) =>
              city.slug ? (
                <Link
                  key={city.name}
                  href={`/educatrice-canine/${city.slug}`}
                  className="px-4 py-2 rounded-full bg-white border border-forest-200 text-forest-700 font-medium text-sm hover:bg-forest-700 hover:text-white hover:border-forest-700 transition-colors shadow-sm"
                >
                  {city.name}
                </Link>
              ) : (
                <span
                  key={city.name}
                  className="px-4 py-2 rounded-full bg-white border border-forest-200 text-forest-700 font-medium text-sm shadow-sm"
                >
                  {city.name}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FaqSection
        title="Questions fréquentes"
        items={HOMEPAGE_FAQ}
        schemaId="schema-faq-homepage"
      />
    </>
  )
}
