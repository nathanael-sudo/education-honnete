import { Metadata } from 'next'
import Link from 'next/link'
import { siteUrl } from '@/prismicio'

export const metadata: Metadata = {
  title: 'À propos – Marie-Anne Lamellière, éducatrice canine',
  description:
    "Découvrez le parcours et la philosophie de Marie-Anne Lamellière, éducatrice canine à Granville et Coutances (Manche). Une approche honnête, bienveillante et ancrée dans la réalité du terrain.",
  alternates: { canonical: `${siteUrl}/a-propos` },
}

const VALUES = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    titre: "Observer avant d'intervenir",
    texte: "Chaque chien est unique. Avant toute chose, je prends le temps de l'observer dans son environnement réel, de comprendre son fonctionnement et ses déclencheurs.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    titre: "Travailler avec le maître, pas juste le chien",
    texte: "L'éducation canine commence par la compréhension du binôme. Je transmets les bons réflexes pour que les progrès durent au-delà des séances.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    titre: "Par le jeu et l'enthousiasme",
    texte: "Je privilégie la stimulation, les félicitations et la bienveillance. Un chien qui s'amuse apprend vite et garde confiance. L'éducation n'est pas une contrainte — c'est un jeu.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    titre: "Honnête, pas juste positive",
    texte: "Parfois il faut faire comprendre à son chien que son comportement ne convient pas. Tout est dans le ton, la gestuelle et le respect. Pas de violence — juste de la clarté.",
  },
]

const CREDENTIALS = [
  ["Titulaire de l'ACACED", "Attestation de Connaissances pour les Animaux de Compagnie d'Espèces Domestiques"],
  ["Formation en éthologie canine", "Approche comportementaliste du chien dans son environnement"],
  ["5 ans d'expérience terrain", "Accompagnement de chiens de toutes races, chiots et adultes"],
  ["Secteur d'intervention", "Granville, Coutances, Hauteville-sur-Mer et tout le secteur Manche"],
] as const

export default function AProposPage() {
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
        <section>
          <h2 className="text-2xl font-serif font-bold text-forest-800 mb-6">
            Comment tout a commencé
          </h2>
          <div className="bg-white rounded-2xl p-8 shadow-sm space-y-4 text-gray-700 leading-relaxed">
            <p>
              {"C'est lors d'une réorientation professionnelle que Pipelette est entrée dans ma vie — une croisée berger allemand et malinois qui m'a ouvert les portes d'un métier que je n'aurais jamais imaginé exercer. Et pourtant, dès les premières séances de formation, j'ai su que c'était exactement là où j'étais à ma place."}
            </p>
            <p>
              {"J'ai toujours été attirée par la nature et les animaux. Avoir une vraie relation avec son chien — le comprendre, l'écouter, partager des moments du quotidien — c'est ce qui me tient le plus à cœur. Pour moi, un chien n'est pas une contrainte. C'est un bonheur. Et ce bonheur se construit, séance après séance, avec du temps et de l'honnêteté."}
            </p>
            <p className="font-medium text-forest-800 border-l-4 border-amber-warm pl-4 italic">
              {"« Avec un chien, tout est réalisable — si on prend le temps de le comprendre et d'échanger vraiment avec lui. »"}
            </p>
          </div>
        </section>

        {/* Philosophy */}
        <section>
          <h2 className="text-2xl font-serif font-bold text-forest-800 mb-3">
            {"L'éducation honnête"}
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            {"Je n'aime pas vraiment l'étiquette "}
            <strong className="text-forest-800">{"« éducation positive »"}</strong>
            {", même si ça s'en rapproche. Je préfère parler d'"}
            <strong className="text-forest-800">éducation honnête</strong>.
          </p>
          <div className="bg-forest-50 border border-forest-200 rounded-2xl p-8 space-y-4 text-gray-700 leading-relaxed">
            <p>
              {"Un chien observe tous vos faits et gestes. Il comprend parfaitement les signaux cohérents et honnêtes — bien mieux qu'on ne l'imagine souvent. Ce qu'il attend, c'est qu'on soit à la hauteur de cette relation."}
            </p>
            <p>
              {"Oui, parfois il faut lui faire comprendre que son comportement ne convient pas. Mais tout est dans le ton, la gestuelle, et le respect de l'animal. Pas de domination, pas de brutalité — juste de la clarté et de la bienveillance."}
            </p>
            <p>
              {"Soyez franc avec votre animal, donnez-lui du temps et de l'amour. Il vous le rendra. Et même si vous faites des erreurs — l'essentiel, c'est de faire de votre mieux."}
            </p>
          </div>
        </section>

        {/* Values grid */}
        <section>
          <h2 className="text-2xl font-serif font-bold text-forest-800 mb-8 text-center">
            Mon approche en 4 principes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {VALUES.map((v) => (
              <div key={v.titre} className="bg-white rounded-xl p-6 shadow-sm flex gap-4">
                <div className="w-10 h-10 rounded-full bg-forest-100 flex items-center justify-center text-forest-700 shrink-0">
                  {v.icon}
                </div>
                <div>
                  <h3 className="font-serif font-bold text-forest-800 mb-1">{v.titre}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{v.texte}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Credentials */}
        <section>
          <h2 className="text-2xl font-serif font-bold text-forest-800 mb-6">
            Parcours & formation
          </h2>
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <ul className="space-y-4 text-gray-700">
              {CREDENTIALS.map(([titre, detail]) => (
                <li key={titre} className="flex gap-4 items-start">
                  <svg className="w-5 h-5 text-amber-warm shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <span className="font-semibold text-forest-800">{titre}</span>
                    <span className="text-gray-500"> — {detail}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

      </div>

      {/* CTA */}
      <div className="bg-forest-800 py-14 px-4 text-center">
        <h2 className="text-2xl font-serif font-bold text-white mb-3">
          Rencontrons-nous
        </h2>
        <p className="text-forest-200 mb-8 max-w-sm mx-auto leading-relaxed">
          {"La première séance commence toujours par une rencontre — vous, votre chien, et moi — pour comprendre votre situation et poser les bases d'un vrai travail ensemble."}
        </p>
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
