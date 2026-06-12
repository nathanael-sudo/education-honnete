import { Metadata } from 'next'
import Link from 'next/link'
import * as prismic from '@prismicio/client'
import { PrismicRichText } from '@prismicio/react'
import { createClient, siteUrl } from '@/prismicio'
import PhotoMosaic from '@/components/PhotoMosaic'

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient()
  try {
    const page = await client.getSingle('about')
    const pageUrl = `${siteUrl}/a-propos`
    const title = page.data.meta_title ?? 'À propos – Marie-Anne Lamellière, éducatrice canine'
    const description = page.data.meta_description ?? "Découvrez le parcours et la philosophie de Marie-Anne Lamellière, éducatrice canine à Granville et Coutances (Manche)."
    return {
      title,
      description,
      alternates: { canonical: pageUrl },
    }
  } catch {
    return { title: 'À propos – Éducation Honnête' }
  }
}

// Four icons matched by index to the valeurs group from Prismic
const VALEUR_ICONS = [
  <svg key="eye" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>,
  <svg key="chat" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>,
  <svg key="smile" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>,
  <svg key="check" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>,
]

export default async function AProposPage() {
  const client = createClient()
  const page = await client.getSingle('about')
  const { histoire, citation, philosophie_intro, philosophie_contenu, valeurs, credentials, mosaic, cta_texte } = page.data

  const mosaicPhotos = (mosaic ?? [])
    .filter((item: { mosaic_image: prismic.ImageField }) => prismic.isFilled.image(item.mosaic_image))
    .map((item: { mosaic_image: prismic.ImageField; mosaic_caption: prismic.KeyTextField }) => ({
      url: item.mosaic_image.url!,
      alt: item.mosaic_image.alt ?? null,
      caption: item.mosaic_caption ?? null,
    }))

  return (
    <div className="bg-cream min-h-screen">

      {/* Hero */}
      <div className="bg-forest-800 py-20 px-4 text-center">
        <p className="text-amber-warm font-semibold text-sm uppercase tracking-widest mb-3">À propos</p>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white mb-4">
          Marie-Anne Lamellière
        </h1>
        <p className="text-forest-200 text-lg max-w-lg mx-auto">
          Éducatrice canine à Granville et Coutances, Manche — Normandie
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 space-y-16">

        {/* Story */}
        {prismic.isFilled.richText(histoire) && (
          <section>
            <h2 className="text-2xl font-serif font-bold text-forest-800 mb-6">
              Comment tout a commencé
            </h2>
            <div className="bg-white rounded-2xl p-8 shadow-sm space-y-4 text-gray-700 leading-relaxed prose-custom">
              <PrismicRichText field={histoire} />
            </div>
          </section>
        )}

        {/* Citation */}
        {citation && (
          <blockquote className="font-medium text-forest-800 border-l-4 border-amber-warm pl-6 italic text-lg leading-relaxed">
            {citation}
          </blockquote>
        )}

        {/* Philosophy */}
        {prismic.isFilled.richText(philosophie_contenu) && (
          <section>
            <h2 className="text-2xl font-serif font-bold text-forest-800 mb-3">
              {"L'éducation honnête"}
            </h2>
            {philosophie_intro && (
              <p className="text-gray-600 mb-6 leading-relaxed">{philosophie_intro}</p>
            )}
            <div className="bg-forest-50 border border-forest-200 rounded-2xl p-8 text-gray-700 leading-relaxed prose-custom">
              <PrismicRichText field={philosophie_contenu} />
            </div>
          </section>
        )}

        {/* Values grid */}
        {valeurs && valeurs.length > 0 && (
          <section>
            <h2 className="text-2xl font-serif font-bold text-forest-800 mb-8 text-center">
              Mon approche en quelques principes
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {valeurs.map((v: { titre: string | null; texte: string | null }, i: number) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-sm flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-forest-100 flex items-center justify-center text-forest-700 shrink-0">
                    {VALEUR_ICONS[i % VALEUR_ICONS.length]}
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-forest-800 mb-1">{v.titre}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{v.texte}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Credentials */}
        {credentials && credentials.length > 0 && (
          <section>
            <h2 className="text-2xl font-serif font-bold text-forest-800 mb-6">
              Parcours & formation
            </h2>
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <ul className="space-y-4 text-gray-700">
                {credentials.map((c: { titre: string | null; detail: string | null }, i: number) => (
                  <li key={i} className="flex gap-4 items-start">
                    <svg className="w-5 h-5 text-amber-warm shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <span className="font-semibold text-forest-800">{c.titre}</span>
                      {c.detail && <span className="text-gray-500"> — {c.detail}</span>}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

      </div>

      <PhotoMosaic photos={mosaicPhotos} />

      {/* CTA */}
      <div className="bg-forest-800 py-14 px-4 text-center">
        <h2 className="text-2xl font-serif font-bold text-white mb-3">
          Rencontrons-nous
        </h2>
        {cta_texte && (
          <p className="text-forest-200 mb-8 max-w-sm mx-auto leading-relaxed">{cta_texte}</p>
        )}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/reservation"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-amber-warm text-white font-semibold hover:bg-amber-600 transition-colors"
          >
            Réserver une séance
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
          <Link
            href="/prix"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border-2 border-forest-400 text-forest-200 font-semibold hover:bg-forest-700 transition-colors"
          >
            Voir les tarifs
          </Link>
        </div>
      </div>

    </div>
  )
}
