import { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import * as prismic from '@prismicio/client'
import { PrismicRichText } from '@prismicio/react'
import { createClient, siteUrl } from '@/prismicio'
import { serviceSchema } from '@/lib/structured-data'
import FaqSection from '@/components/FaqSection'

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient()
  const page = await client.getSingle('pricing')
  const pageUrl = `${siteUrl}/prix`
  return {
    title: page.data.meta_title ?? 'Déroulement des séances & Tarifs | Éducation Honnête',
    description:
      page.data.meta_description ??
      "Comment se déroulent les séances avec Marie-Anne Lamellière, éducatrice canine en Manche ? Première rencontre, méthode de travail, tarifs et forfaits à domicile.",
    alternates: { canonical: pageUrl },
    openGraph: {
      title: page.data.meta_title ?? 'Déroulement des séances & Tarifs | Éducation Honnête',
      url: pageUrl,
    },
  }
}

function CheckIcon() {
  return (
    <svg className="w-5 h-5 text-forest-600 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  )
}

const DEFAULT_STEPS = [
  { num: '01', titre: 'La première rencontre', texte: "La première séance est un bilan : vous me parlez des problèmes rencontrés, de vos questions sur l'éducation et les besoins de votre chien. Cela se passe chez vous ou lors d'une balade — je m'adapte. À partir de cette rencontre, j'établis un plan de travail concret et personnalisé." },
  { num: '02', titre: "Observer avant d'intervenir", texte: "Chaque chien est unique. Je passe toujours par une phase d'observation pour bien comprendre le chien, son fonctionnement, et le contexte familial. Je m'occupe de toutes les races, chiots et adultes confondus." },
  { num: '03', titre: "Par le jeu et l'enthousiasme", texte: "Je privilégie la stimulation, les félicitations et la bienveillance. J'utilise rarement la friandise sauf dans des cas spécifiques — le chien doit se connecter à vous, pas à la nourriture. Un chien qui joue et qui s'amuse apprend vite." },
  { num: '04', titre: 'Travailler le binôme', texte: "L'éducation canine, c'est aussi transmettre au maître les bons réflexes pour le quotidien. Je vous accompagne sur la posture, la cohérence et la communication pour que les progrès durent bien au-delà des séances." },
]

const DEFAULT_FAQ = [
  { q: 'Les frais de déplacement sont-ils inclus ?', a: "Oui, les frais de déplacement sont inclus pour tout le secteur de Coutançais et Granvillais. Pour les zones plus éloignées, contactez-moi pour un devis personnalisé." },
  { q: "Les séances d'un forfait sont-elles valables combien de temps ?", a: "Les séances d'un forfait sont valables 6 mois à partir de la date d'achat, pour vous laisser le temps de progresser à votre rythme." },
  { q: 'Comment se déroule la première séance ?', a: "La première séance commence par un bilan complet : histoire du chien, comportements problématiques, attentes. On travaille ensuite directement avec le chien pour observer ses réactions. Vous repartez avec un plan d'action concret." },
  { q: "Proposez-vous des cours d'essai ?", a: "Oui, vous pouvez réserver une séance individuelle pour voir si l'approche vous convient avant de vous engager dans un forfait." },
  { q: 'Proposez-vous des balades collectives ?', a: "Oui ! La socialisation est essentielle pour l'équilibre du chien. Je propose des balades collectives encadrées, avec une attention particulière au caractère de chaque chien pour que la meute soit harmonieuse." },
  { q: 'Intervenez-vous uniquement en cours particuliers ?', a: "Oui, les séances individuelles me permettent d'être 100 % disponible pour observer et conseiller le maître et son chien. Les balades collectives viennent en complément pour la socialisation." },
]

export default async function PrixPage() {
  const client = createClient()
  const page = await client.getSingle('pricing')
  const { title, description, methode_intro, etapes, balades_titre, balades_texte, plans, tarifs_note, cta_titre, cta_texte, cta_bouton, faq } = page.data

  const steps = (etapes ?? []).filter((e: { num: string | null; titre: string | null; texte: string | null }) => e.titre)
  const stepsToShow = steps.length > 0 ? steps : DEFAULT_STEPS

  const baladeTitre = balades_titre ?? 'Balades collectives encadrées'
  const baladeTexte = balades_texte ?? "Un chien heureux est un chien qui rencontre ses congénères régulièrement. Je propose des balades collectives encadrées pour travailler la socialisation en groupe, avec une attention particulière au caractère de chaque chien pour que la meute soit harmonieuse."

  const prismicFaq: { q: string; a: string }[] = (faq ?? [])
    .filter((item: { question: string | null; reponse: string | null }) => item.question && item.reponse)
    .map((item: { question: string | null; reponse: string | null }) => ({ q: item.question as string, a: item.reponse as string }))
  const faqItems = prismicFaq.length > 0 ? prismicFaq : DEFAULT_FAQ

  return (
    <div className="bg-cream min-h-screen">
      <Script id="schema-service" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      {/* Hero */}
      <div className="bg-forest-800 py-16 px-4 text-center">
        <p className="text-amber-warm font-semibold text-sm uppercase tracking-widest mb-3">Méthode & Tarifs</p>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white">
          {title ?? 'Déroulement des séances & Tarifs'}
        </h1>
        {prismic.isFilled.richText(description) && (
          <div className="mt-4 text-forest-200 text-lg max-w-xl mx-auto [&_p]:leading-relaxed">
            <PrismicRichText field={description} />
          </div>
        )}
      </div>

      {/* How I work */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-12">
          <p className="text-amber-warm font-semibold text-sm uppercase tracking-widest mb-2">Ma méthode</p>
          <h2 className="text-3xl font-serif font-bold text-forest-800">Comment je travaille</h2>
          {methode_intro && (
            <p className="mt-3 text-gray-600 max-w-xl mx-auto">{methode_intro}</p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {stepsToShow.map((step: { num: string | null; titre: string | null; texte: string | null }) => (
            <div key={step.num} className="bg-white rounded-2xl p-6 shadow-sm flex gap-5">
              <div className="text-3xl font-serif font-bold text-forest-100 leading-none shrink-0 select-none">
                {step.num}
              </div>
              <div>
                <h3 className="font-serif font-bold text-forest-800 mb-2">{step.titre}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{step.texte}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Group walks callout */}
        <div className="mt-8 bg-forest-800 rounded-2xl p-8 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
          <div className="w-12 h-12 rounded-full bg-forest-700 flex items-center justify-center shrink-0 text-2xl">
            🐾
          </div>
          <div className="flex-1">
            <h3 className="font-serif font-bold text-white mb-1">{baladeTitre}</h3>
            <p className="text-forest-200 text-sm leading-relaxed">{baladeTexte}</p>
          </div>
          <Link href="/reservation" className="shrink-0 px-5 py-2.5 rounded-full bg-amber-warm text-white text-sm font-semibold hover:bg-amber-600 transition-colors">
            Se renseigner
          </Link>
        </div>
      </div>

      {/* Divider */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="border-t border-gray-200" />
      </div>

      {/* Pricing plans */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <p className="text-amber-warm font-semibold text-sm uppercase tracking-widest mb-2">Investissement</p>
          <h2 className="text-3xl font-serif font-bold text-forest-800">Nos tarifs</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(plans ?? []).map((plan: {
            plan_title: prismic.KeyTextField
            plan_description: prismic.RichTextField
            plan_price: prismic.KeyTextField
            is_featured: boolean
          }, i: number) => {
            const featured = plan.is_featured
            return (
              <div key={i} className={`relative rounded-2xl p-8 flex flex-col ${featured ? 'bg-forest-800 text-white shadow-2xl scale-105 ring-4 ring-amber-warm' : 'bg-white shadow-sm hover:shadow-md transition-shadow'}`}>
                {featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-amber-warm text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wide shadow">Populaire</span>
                  </div>
                )}
                <h3 className={`text-xl font-serif font-bold mb-2 ${featured ? 'text-white' : 'text-forest-800'}`}>{plan.plan_title}</h3>
                <p className={`text-4xl font-bold font-serif mb-6 ${featured ? 'text-amber-warm' : 'text-forest-700'}`}>{plan.plan_price}</p>
                {prismic.isFilled.richText(plan.plan_description) && (
                  <div className={`flex-1 text-sm leading-relaxed space-y-2 mb-8 ${featured ? '[&_p]:text-forest-200 [&_li]:text-forest-200' : '[&_p]:text-gray-600 [&_li]:text-gray-600'}`}>
                    <PrismicRichText
                      field={plan.plan_description}
                      components={{ listItem: ({ children }) => <li className="flex items-start gap-2"><CheckIcon /><span>{children}</span></li> }}
                    />
                  </div>
                )}
                <Link href="/reservation" className={`mt-auto text-center px-6 py-3 rounded-full font-semibold text-sm transition-colors ${featured ? 'bg-amber-warm text-white hover:bg-amber-600' : 'bg-forest-700 text-white hover:bg-forest-800'}`}>
                  Réserver
                </Link>
              </div>
            )
          })}
        </div>

        {(tarifs_note ?? 'Tous les cours se déroulent à domicile ou dans un lieu adapté près de chez vous. Frais de déplacement inclus dans le secteur de Coutançais et Granvillais.') && (
          <p className="text-center text-sm text-gray-500 mt-10">
            {tarifs_note ?? 'Tous les cours se déroulent à domicile ou dans un lieu adapté près de chez vous. Frais de déplacement inclus dans le secteur de Coutançais et Granvillais.'}
          </p>
        )}
      </div>

      {/* CTA strip */}
      <div className="bg-amber-light py-12 px-4 text-center">
        <h2 className="text-2xl font-serif font-bold text-forest-800 mb-2">
          {cta_titre ?? 'Une question sur les tarifs ou la méthode ?'}
        </h2>
        <p className="text-gray-600 mb-6">
          {cta_texte ?? "N'hésitez pas à me contacter directement — je réponds à toutes les questions avant de prendre rendez-vous."}
        </p>
        <Link href="/reservation" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-forest-700 text-white font-semibold hover:bg-forest-800 transition-colors">
          {cta_bouton ?? 'Me contacter'}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      <FaqSection title="Questions fréquentes" items={faqItems} schemaId="schema-faq-prix" />
    </div>
  )
}
