import { Metadata } from 'next'
import Link from 'next/link'
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

  return (
    <>
      <SliceZone slices={page.data.slices} />

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
