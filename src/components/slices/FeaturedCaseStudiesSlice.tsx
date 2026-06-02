import Image from 'next/image'
import Link from 'next/link'
import * as prismic from '@prismicio/client'

type CaseStudyData = {
  dog_name: prismic.KeyTextField
  dog_breed: prismic.KeyTextField
  dog_portrait: prismic.ImageField
  location: prismic.KeyTextField
}

type CaseStudyLink = prismic.FilledContentRelationshipField<'case_study', 'en-us', CaseStudyData>

type FeaturedCaseStudiesSlice = {
  slice_type: 'featured_case_studies'
  variation: 'default'
  primary: {
    title: prismic.KeyTextField
  }
  items: { case_study: prismic.LinkField }[]
}

export default function FeaturedCaseStudiesSlice({ slice }: { slice: FeaturedCaseStudiesSlice }) {
  const { title } = slice.primary
  const caseStudies = slice.items
    .map((item) => item.case_study as prismic.ContentRelationshipField)
    .filter((cs): cs is CaseStudyLink => prismic.isFilled.contentRelationship(cs))

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {title && (
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-forest-800">{title}</h2>
            <div className="mt-3 w-16 h-1 bg-amber-warm mx-auto rounded-full" />
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {caseStudies.map((cs) => {
            const data = cs.data
            const imgUrl = data?.dog_portrait && prismic.isFilled.image(data.dog_portrait)
              ? data.dog_portrait.url
              : null

            return (
              <Link
                key={cs.uid}
                href={`/cas-pratiques-education-canine/${cs.uid}`}
                className="group block bg-cream rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-forest-100">
                  {imgUrl ? (
                    <Image
                      src={imgUrl}
                      alt={data?.dog_name ?? ''}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-6xl">🐕</div>
                  )}
                </div>
                <div className="p-5">
                  <p className="text-xs font-semibold text-amber-warm uppercase tracking-wider mb-1">
                    {data?.dog_breed}
                  </p>
                  <h3 className="text-xl font-serif font-bold text-forest-800 group-hover:text-forest-600 transition-colors">
                    {data?.dog_name}
                  </h3>
                  {data?.location && (
                    <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                      <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      {data.location}
                    </p>
                  )}
                  <div className="mt-4 text-sm font-semibold text-forest-700 flex items-center gap-1">
                    Voir le cas pratique
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/cas-pratiques-education-canine"
            className="inline-flex items-center gap-2 text-forest-700 font-semibold hover:text-forest-900 transition-colors"
          >
            Voir tous les cas pratiques
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
