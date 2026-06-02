import { Metadata } from 'next'
import Link from 'next/link'
import * as prismic from '@prismicio/client'
import { PrismicRichText } from '@prismicio/react'
import { createClient } from '@/prismicio'

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient()
  const page = await client.getSingle('pricing')
  return {
    title: page.data.meta_title ?? 'Tarifs – Éducation Honnête',
    description: page.data.meta_description ?? undefined,
  }
}

function CheckIcon() {
  return (
    <svg className="w-5 h-5 text-forest-600 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  )
}

export default async function PrixPage() {
  const client = createClient()
  const page = await client.getSingle('pricing')
  const { title, description, plans } = page.data

  return (
    <div className="bg-cream min-h-screen">
      {/* Header */}
      <div className="bg-forest-800 py-16 px-4 text-center">
        <p className="text-amber-warm font-semibold text-sm uppercase tracking-widest mb-3">Investissement</p>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white">
          {title ?? 'Nos tarifs'}
        </h1>
        {prismic.isFilled.richText(description) && (
          <div className="mt-4 text-forest-200 text-lg max-w-xl mx-auto [&_p]:leading-relaxed">
            <PrismicRichText field={description} />
          </div>
        )}
      </div>

      {/* Plans */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(plans ?? []).map((plan: {
            plan_title: prismic.KeyTextField
            plan_description: prismic.RichTextField
            plan_price: prismic.KeyTextField
            is_featured: boolean
          }, i: number) => {
            const featured = plan.is_featured
            return (
              <div
                key={i}
                className={`relative rounded-2xl p-8 flex flex-col ${
                  featured
                    ? 'bg-forest-800 text-white shadow-2xl scale-105 ring-4 ring-amber-warm'
                    : 'bg-white shadow-sm hover:shadow-md transition-shadow'
                }`}
              >
                {featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-amber-warm text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wide shadow">
                      Populaire
                    </span>
                  </div>
                )}

                <h2 className={`text-xl font-serif font-bold mb-2 ${featured ? 'text-white' : 'text-forest-800'}`}>
                  {plan.plan_title}
                </h2>

                <p className={`text-4xl font-bold font-serif mb-6 ${featured ? 'text-amber-warm' : 'text-forest-700'}`}>
                  {plan.plan_price}
                </p>

                {prismic.isFilled.richText(plan.plan_description) && (
                  <div className={`flex-1 text-sm leading-relaxed space-y-2 mb-8 ${featured ? '[&_p]:text-forest-200 [&_li]:text-forest-200' : '[&_p]:text-gray-600 [&_li]:text-gray-600'} [&_li]:flex [&_li]:items-center [&_li]:gap-2`}>
                    <PrismicRichText
                      field={plan.plan_description}
                      components={{
                        listItem: ({ children }) => (
                          <li className="flex items-start gap-2">
                            <CheckIcon />
                            <span>{children}</span>
                          </li>
                        ),
                      }}
                    />
                  </div>
                )}

                <Link
                  href="/reservation"
                  className={`mt-auto text-center px-6 py-3 rounded-full font-semibold text-sm transition-colors ${
                    featured
                      ? 'bg-amber-warm text-white hover:bg-amber-600'
                      : 'bg-forest-700 text-white hover:bg-forest-800'
                  }`}
                >
                  Réserver
                </Link>
              </div>
            )
          })}
        </div>

        {/* Note */}
        <p className="text-center text-sm text-gray-500 mt-10">
          Tous les cours se déroulent à domicile ou dans un lieu adapté près de chez vous.
          Frais de déplacement inclus dans le secteur de Coutançais et Granvillais.
        </p>
      </div>

      {/* CTA strip */}
      <div className="bg-amber-light py-12 px-4 text-center">
        <h2 className="text-2xl font-serif font-bold text-forest-800 mb-2">
          Une question sur les tarifs ?
        </h2>
        <p className="text-gray-600 mb-6">N'hésitez pas à me contacter directement.</p>
        <Link
          href="/reservation"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-forest-700 text-white font-semibold hover:bg-forest-800 transition-colors"
        >
          Me contacter
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  )
}
