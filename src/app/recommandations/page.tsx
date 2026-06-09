import { Metadata } from 'next'
import Link from 'next/link'
import { siteUrl } from '@/prismicio'

export const metadata: Metadata = {
  title: 'Recommandations clients | Éducation Honnête',
  description:
    "Découvrez les avis de nos clients sur l'éducation canine avec Marie-Anne Lamellière à Granville et Coutances. 28 recommandations, note moyenne 5/5.",
  alternates: { canonical: `${siteUrl}/recommandations` },
}

type Review = {
  name: string
  date: string
  sortKey: string
  text: string
  response?: string
  dogName?: string
}

const REVIEWS: Review[] = [
  {
    name: 'Stéphane et Sandrine Flambard',
    date: 'Mars 2026',
    sortKey: '2026-03',
    dogName: 'Arran',
    text: "Marie Anne nous a aidés dans l'éducation de notre petite chienne qui avait beaucoup de mal à gérer ces émotions. Ses conseils ont été profitables et en moins d'un mois, elle a fait d'énormes progrès. N'hésitez pas à demander son aide, elle est vraiment bienveillante et à l'écoute !",
    response: "Merci Stéphane et Sandrine pour votre avis. Ce fut un plaisir de vous aider avec Arran. Je reste à disposition si vous avez toutes autres questions concernant son éducation. Je suis également ravie de recevoir des nouvelles de son évolution par message et je vous en remercie 🤗",
  },
  {
    name: 'Isabelle Lassagne',
    date: 'Février 2026',
    sortKey: '2026-02',
    dogName: 'Pearl & Nami',
    text: "J'ai fait appel aux services de Marie-Anne, j'avais 2 chiots avec 2 mois d'écart et avec une grosse différence de taille (14 kg pour l'une et 3,9 kg pour l'autre). Elle a su m'apporter tous les conseils nécessaires pour gérer les jeux entre les deux et aider Pearl à mieux gérer ses émotions.",
    response: "Merci Isabelle pour ton avis. Ce fut un plaisir de vous donner les outils pour aider Pearl à mieux gérer ses émotions (débordantes !). Je suis ravie de lire que le quotidien entre les deux louloutes s'est adouci et que Pearl soit plus respectueuse de la petite Nami. C'est toujours un plaisir de te croiser en balade, et je reste à disposition si besoin.",
  },
  {
    name: 'Valérie Bayle',
    date: 'Janvier 2026',
    sortKey: '2026-01',
    dogName: 'Aloha',
    text: "Marie-Anne : une belle rencontre pour Aloha, notre jeune border collie et pour nous, ses maîtres ! Une approche de l'éducation canine bienveillante et tellement efficace ! Une relation authentique tant avec notre chienne qu'avec les maîtres : il est bon de s'entendre dire les points à améliorer aussi dans nos comportements sans aucun jugement ! Un professionnalisme appréciable. Nous ne pouvons que recommander Marie-Anne que nous remercions vivement. Valérie et Bernard et Aloha.",
    response: "Merci, Valérie et Bernard, pour votre confiance. Aloha est une chienne très sensible et affectueuse qui, comme tous les chiens, a besoin d'être comprise et guidée avec douceur. Je suis très heureuse d'avoir pu vous apporter conseils et outils pour l'aider à mieux gérer ses émotions et être plus attentive à vous.",
  },
  {
    name: 'Mathilde Lebailly',
    date: 'Novembre 2025',
    sortKey: '2025-11',
    dogName: 'Java',
    text: "Je recommande vivement Marie-Anne, elle a une approche constructive et réfléchie qui respecte vraiment les besoins de l'animal, elle sait lire les comportements et donne les outils pour obtenir des résultats ! J'apprécie particulièrement sa façon de voir l'éducation, elle est douce mais ferme à la fois, toujours dans le respect. Je recommande les yeux fermés, elle est vraiment pro, toujours de bon conseil et en plus super sympa !",
    response: "Merci Mathilde pour ton avis. Au plaisir de partager une balade avec nos louloutes. J'ai été ravie de garder Java sur une partie de tes vacances, un vrai plaisir de voir évoluer nos deux chiennes ensemble.",
  },
  {
    name: 'ambroise karine',
    date: 'Août 2025',
    sortKey: '2025-08',
    dogName: 'Arcus',
    text: "Marie Anne est top. Je recommande les yeux fermés ;) Dans la douceur mais avec toute la rigueur et la fermeté nécessaire !",
    response: "Merci Karine pour ton retour. Au plaisir d'avoir des nouvelles de Arcus la fripouille — et quelle fripouille ;) !",
  },
  {
    name: 'Sophie Chardon',
    date: 'Juillet 2025',
    sortKey: '2025-07',
    dogName: 'Vénus',
    text: "Marie anne Super nana, elle a un abord avec les chiens incomparable je recommande fortement.",
    response: "Merci Sophie pour ton implication avec Vénus, vous formez un joli duo ! Heureuse que les balades soient de plus en plus fluides et moins stressantes pour vous deux.",
  },
  {
    name: 'Yvanna Riant',
    date: 'Juin 2025',
    sortKey: '2025-06',
    dogName: 'Shadow',
    text: "Nous recommandons les yeux fermés Marie-Anne ! Notre petit Shadow peut maintenant rester à la maison tout seul sans faire de dégâts, ne tire plus en laisse et commence à s'adapter de plus en plus facilement à ses congénères. À ses neuf mois, nous avons décidé de faire appel à cette Éducatrice et tout a changé au moment où nous avons appliqué ses conseils. Elle a su nous écouter, et apprendre à connaître notre chien et son mode de vie pour adapter ses conseils à notre situation. Sa patience et son optimisme font sa force, mais son empathie et son non-jugement renforcent ses compétences dans ce domaine. Merci pour tout ✨",
    response: "Merci pour votre retour, bravo à vous d'avoir bien appliqué les conseils. Mission réussie avec votre petit monstre débordant d'énergie !",
  },
  {
    name: 'Jacqueline Bigot',
    date: 'Février 2025',
    sortKey: '2025-02',
    dogName: 'Tommy',
    text: "Cela fait plus de 18 mois que Marie Anne est entrée dans notre vie. Ses conseils m'ont été très précieux pour mieux vivre avec mon adorable golden débordant d'énergie et un peu envahissant... Grâce à ses conseils pertinents, le juste équilibre entre amour partagé et fermeté, sans excès ni dans l'un ni dans l'autre, nous coulons des jours heureux. Marie Anne est une jeune femme très professionnelle et d'un contact très agréable. Aujourd'hui, je continue de lui faire appel pour quelques sorties par mois, autant pour me dégager du temps que pour offrir à mon compagnon à 4 pattes, le bonheur de gambader en compagnie d'autres chiens bien socialisés. D'ailleurs, dès que je dis à mon chien : \"Aujourd'hui, Marie Anne viendra te chercher pour te promener\" il dresse l'oreille, le regard pétillant, prêt à passer un super moment.",
    response: "Merci à toi Jacqueline pour ta confiance. Je suis tellement contente que vous ayez trouvé votre équilibre avec Tommy grâce à l'application au quotidien des conseils que je vous ai transmis. Un plaisir pour moi de balader ton loulou avec d'autres copains bien dans leurs pattes toutes les deux semaines !",
  },
  {
    name: 'Julia Pajonk',
    date: 'Octobre 2024',
    sortKey: '2024-10',
    text: "J'ai contacté Marie-Anne pour mon chien de moins de 2 ans car j'avais des difficultés en longe et face aux autres mâles. Marie-Anne a été très réactive et à l'écoute, elle m'a proposé une première séance pour que l'on se rencontre et nous avons fait quelques cours ensemble. À chaque fois, elle m'a rassurée et m'a donné des conseils que je pouvais reproduire seule. Je vois vraiment les effets à la longue et le travail paye ! Marie-Anne promène aussi mon chien de temps en temps quand mes horaires sont compliqués, j'ai une confiance aveugle en elle.",
  },
  {
    name: 'Yann Hebert',
    date: 'Septembre 2024',
    sortKey: '2024-09',
    text: "Je recommande Marie-Anne pour son professionnalisme et tous les super conseils d'éducation.",
  },
  {
    name: 'Julitte Stien',
    date: 'Juin 2024',
    sortKey: '2024-06',
    text: "Marie-Anne est une superbe éducatrice très pédagogue et à l'écoute ! Je recommande à 100% aussi bien pour la qualité des cours que pour les promenades sur la plage.",
  },
  {
    name: 'Christian Guilloux',
    date: 'Mai 2024',
    sortKey: '2024-05',
    text: "Super attitude vis-à-vis des chiens comme des maîtres… résultats garantis…",
  },
  {
    name: 'Claude LALIMAN',
    date: 'Mai 2024',
    sortKey: '2024-05',
    text: "Nous recommandons à 100% Mme Lamellière comme éducatrice. Très à l'écoute, observatrice, adore son métier et donne des conseils très constructifs. Au bout de 5 min le « ne tire plus en laisse » est posé, à partir de là les progrès n'ont fait que s'enchaîner avec le rappel, la marche au pied, focus sur moi, rester sur le trottoir... Cela nous a permis de voir une transformation très rapide pour notre (fougueux) whippet de 11 mois. Nous sommes vraiment très satisfaits des bons conseils donnés, cela nous aide énormément, c'est une éducatrice à l'écoute du chien et des maîtres, de plus cela nous fait passer d'agréables moments à Hauteville. Merci beaucoup Mme Lamellière.",
  },
  {
    name: 'Carla Brentel',
    date: 'Mai 2024',
    sortKey: '2024-05',
    text: "Marie-Anne nous a énormément aidées et nous aide toujours actuellement pour des problèmes de réactivité, de contrôle des émotions. Elle parvient à nous accompagner en s'adaptant à ma chienne, à ses limites et ses besoins. Mais plus encore, elle m'apprend à avoir les bons automatismes pour l'aider. Parce que beaucoup de choses partent de l'humain ! Ma chienne est toujours ravie de la voir, Marie-Anne est un réel point de repère pour elle, grâce à son calme et à son écoute, toujours sans violence. Sa lecture du chien me permet de savoir quand intervenir, quand parler ou ne pas parler. Tout est travail d'équilibre afin de parvenir à davantage de confort pour la chienne comme pour moi dans la vie de tous les jours. Et les progrès sont notables ! Je ne peux que conseiller de faire appel à elle. Merci 🙏",
  },
  {
    name: 'Inaya Suares',
    date: 'Mai 2024',
    sortKey: '2024-05',
    text: "Une personne hyper agréable et gentille. Je ne fais pas de cours d'éducation avec elle mais je promène mon chien et c'est toujours un plaisir d'être en balade avec elle ❤️",
  },
  {
    name: 'lyne-claude lefevre',
    date: 'Avril 2024',
    sortKey: '2024-04',
    text: "Marie-Anne a su s'adapter aussi bien à nos choix (ce que l'on souhaitait faire dans notre quotidien avec notre chien) et au caractère de notre chien, et cela en travaillant le lien de confiance chien/maître, tout au naturel, de manière professionnelle. On a beaucoup appris et on continue d'apprendre, merci beaucoup. Lyne",
  },
  {
    name: 'FOURNIER AUBIN',
    date: 'Avril 2024',
    sortKey: '2024-04',
    text: "Un bon duo efficace, à l'écoute, et des conseils qui fonctionnent au quotidien. De la sérénité pour chacun — humains et chien. Merci Marie Anne et Pipelette.",
  },
  {
    name: 'Sylvie Fourey',
    date: 'Janvier 2024',
    sortKey: '2024-01',
    text: "Mon chien est très heureux lorsqu'il voit son éducatrice pour la balade, il lui fait la fête. Je trouve qu'il obéit mieux et il est plus calme. Je recommande cette personne pour son travail, son sérieux, et son bon feeling avec les animaux.",
  },
  {
    name: 'Louise Lrg',
    date: 'Janvier 2024',
    sortKey: '2024-01',
    text: "Très bonne expérience avec Marie Anne ! Notre chienne a fait beaucoup de progrès depuis que l'on travaille ensemble ! Gentille, patiente et à l'écoute :)",
  },
  {
    name: 'Oestereich Aurelie',
    date: 'Septembre 2023',
    sortKey: '2023-09',
    dogName: 'Uby',
    text: "Je ne peux que conseiller de vous faire accompagner par Marie-Anne. Elle a su guider notre famille avec beaucoup de patience, de pédagogie et de bienveillance, et tout cela en nous amenant à poser un cadre ferme et rassurant pour notre chiot. Mention spéciale à Pipelette qui a offert à Uby une belle leçon de savoir-vivre entre chiens. J'ai hâte de pouvoir retrouver ce duo pour des balades éducatives dès que l'occasion se présentera.",
  },
  {
    name: 'William Renault',
    date: 'Septembre 2023',
    sortKey: '2023-09',
    dogName: 'Urban',
    text: "Nous avons fait appel à Marie Anne car la condition avant d'adopter un chien Malinois était de prendre des cours d'éducation. Elle a suivi notre petite Urban de ses 2 mois jusqu'à maintenant, et l'on continue de faire appel à elle car depuis le premier cours d'éducation, nous ne sommes qu'heureux de l'évolution qu'on voit après chaque séance. On a appris à connaître les émotions et le comportement de notre chien, à gérer ses petites pulsions grâce à elle. Nous avons désormais un chien qui répond à ce que l'on lui demande, qui a du rappel, qui n'a plus peur de ce qui l'entoure et qui nous fait confiance à 100%. Nous conseillons fortement Marie Anne pour son professionnalisme, sa grande patience et bien évidemment son chien Pipelette.",
  },
  {
    name: 'Charlotte Flambard',
    date: 'Juin 2023',
    sortKey: '2023-06',
    dogName: 'Sirius',
    text: "Marie-Anne est la seule professionnelle qui a su comprendre mon chien. Grâce à elle, j'ai pu renforcer mon lien avec mon chien tout en le comprenant enfin. Sirius, mon berger australien de 1 an, multipliait les petites problématiques : destruction d'objets, refus complet de monter dans le coffre, mordillage de laisse, marche en laisse compliquée, sauts, peur de la ville... tous ces petits problèmes sont désormais loin derrière nous ! Les conseils précieux de Marie-Anne, avec l'aide de sa chienne Pipelette, ont réussi à apaiser notre vie à la maison et nos balades quotidiennes. Je recommande vivement Marie-Anne, qui saura vous écouter et apporter son aide pour de nombreuses problématiques. Les balades collectives proposées sont également très qualitatives.",
  },
  {
    name: 'pauline heslouin',
    date: 'Février 2023',
    sortKey: '2023-02',
    text: "Je recommande Marie Anne, elle est à l'écoute du chien. Les cours et les conseils ont bien fonctionné sur mon labrador.",
  },
  {
    name: 'clémence houet',
    date: 'Janvier 2023',
    sortKey: '2023-01',
    dogName: 'Dana',
    text: "Je recommande vivement Marie Anne, et sa chienne Pipelette également ! Marie-Anne a pris le temps d'évaluer ma chienne et de se rendre compte de la problématique rencontrée — un instinct de chasseuse qui devient parfois difficile à gérer — afin de me donner de précieux conseils pour ME rééduquer, et ainsi évoluer positivement, trouver les boutons pour renforcer un bon rappel... Marie Anne a su me faire rendre compte dans la bienveillance la plus totale que je ne pouvais pas faire disparaître l'instinct de chasse de ma Dana mais que je pouvais changer ma façon de faire pour avoir de meilleurs résultats ! Marie Anne et Pipelette sont un vrai binôme de travail !",
  },
  {
    name: 'Claude D ANDIGNE',
    date: 'Janvier 2023',
    sortKey: '2023-01',
    text: "Éducation honnête effectivement sans le subterfuge de la friandise. Mise en situation sur le terrain : la meilleure école. Marie Anne est très attentive et l'aide de Pipelette est un atout. Les chiens apprennent à se gérer eux-mêmes. Je recommande vivement.",
  },
  {
    name: 'Karine Hinet',
    date: '2024',
    sortKey: '2024-00',
    dogName: 'Thalia',
    text: "Une aide précieuse et indispensable pour toute notre famille mais aussi pour Thalia, notre berger australien. Nous avons profité en particulier de cours à domicile qui ont beaucoup amélioré notre quotidien car il faut bien se l'avouer, on ne peut pas s'improviser éducateur canin. Finis les tensions et le découragement avec Thalia. Des techniques simples à mettre en œuvre mais qui ont changé notre vie. Je recommande aussi les balades en groupe, sous l'œil affûté de Pipelette, un vrai bonheur pour les chiens mais aussi un bon moment d'échanges d'expériences avec leurs maîtres.",
  },
  {
    name: 'eleonore Martinelli',
    date: 'Juin 2022',
    sortKey: '2022-06',
    dogName: 'Siam',
    text: "Je recommande vivement Marie-Anne, grâce à elle, notre petite Siam fait d'énormes progrès à chaque rencontre. Elle s'adapte au caractère de notre chien, à nous et à ce que nous souhaitons travailler. Elle nous donne confiance et les résultats sont plus que visibles. Marie-Anne propose aussi des balades avec Pipelette ou de la garde ponctuelle. Une très belle rencontre !",
  },
  {
    name: 'jean-philippe Robin',
    date: 'Mars 2022',
    sortKey: '2022-03',
    dogName: 'Espoir',
    text: "Patiente, sérénité et pédagogie sont les maîtres mots qui caractérisent incontestablement l'activité de Mme Lamellière. Ses conseils avertis vous permettront de constater rapidement des progrès significatifs chez votre chien.",
    response: "Merci Jean-Phi pour avoir participé au cours de désensibilisation d'Espoir — travail pour une remise en confiance progressive du chien par rapport à un homme inconnu.",
  },
]

function StarRating() {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} className="w-5 h-5 text-amber-warm fill-current" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function RecommandationsPage() {
  const sorted = [...REVIEWS].sort((a, b) => b.sortKey.localeCompare(a.sortKey))

  return (
    <div className="bg-cream min-h-screen">

      {/* Hero */}
      <div className="bg-forest-800 py-16 px-4 text-center">
        <p className="text-amber-warm font-semibold text-sm uppercase tracking-widest mb-3">Avis clients</p>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white mb-6">Recommandations</h1>

        {/* Rating summary */}
        <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-forest-700/50 rounded-2xl px-8 py-4 mb-6">
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <svg key={i} className="w-7 h-7 text-amber-warm fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <div className="text-white text-center sm:text-left">
            <span className="text-2xl font-serif font-bold">5,0</span>
            <span className="text-forest-300 ml-2 text-sm">{REVIEWS.length} avis · Moyenne 5 étoiles</span>
          </div>
        </div>

        <div>
          <a
            href="https://share.google/pz9ZOYebRKQzZYNid"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-forest-800 font-semibold text-sm hover:bg-gray-50 transition-colors shadow"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Lire sur Google
          </a>
        </div>
      </div>

      {/* Reviews list */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 space-y-6">
        {sorted.map((review, i) => (
          <article key={i} className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {/* Review header */}
            <div className="p-6 pb-4">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-forest-700 flex items-center justify-center text-white font-bold text-lg shrink-0">
                    {review.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-forest-800 leading-tight">{review.name}</p>
                    {review.dogName && (
                      <p className="text-xs text-amber-warm font-medium uppercase tracking-wide">{review.dogName}</p>
                    )}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <StarRating />
                  <p className="text-xs text-gray-400 mt-1">{review.date}</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed text-[0.95rem]">{review.text}</p>
            </div>

            {/* Marie-Anne's response */}
            {review.response && (
              <div className="border-t border-gray-100 bg-forest-50 px-6 py-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-forest-700 flex items-center justify-center shrink-0">
                    <span className="text-white text-xs font-bold">🐾</span>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-forest-700 mb-1">Marie-Anne — Éducation Honnête</p>
                    <p className="text-sm text-gray-600 leading-relaxed">{review.response}</p>
                  </div>
                </div>
              </div>
            )}
          </article>
        ))}
      </div>

      {/* CTA */}
      <div className="bg-forest-800 py-12 px-4 text-center">
        <h2 className="text-2xl font-serif font-bold text-white mb-3">
          Prêt·e à commencer ?
        </h2>
        <p className="text-forest-200 mb-6 max-w-sm mx-auto">
          Rejoignez les familles qui ont fait confiance à Marie-Anne pour leur chien.
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
          <a
            href="https://share.google/pz9ZOYebRKQzZYNid"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border-2 border-forest-400 text-forest-200 font-semibold hover:bg-forest-700 transition-colors"
          >
            Lire sur Google
          </a>
        </div>
      </div>
    </div>
  )
}
