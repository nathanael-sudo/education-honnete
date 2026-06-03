export const SITE_URL = 'https://education-honnete.vercel.app'
export const BUSINESS_ID = `${SITE_URL}/#business`

export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': BUSINESS_ID,
  name: 'Éducation Honnête',
  description:
    'Éducatrice canine bienveillante en Normandie. Accompagnement personnalisé basé sur le renforcement positif pour chiots et chiens adultes. Secteur Granville, Coutances, Manche.',
  url: SITE_URL,
  telephone: '+33660932025',
  priceRange: '€€',
  image: `${SITE_URL}/og-image.jpg`,
  founder: {
    '@type': 'Person',
    name: 'Marie-Anne Lamellière',
    jobTitle: 'Éducatrice canine',
    knowsAbout: [
      'éducation canine',
      'comportement animal',
      'renforcement positif',
      'réactivité canine',
    ],
  },
  areaServed: [
    { '@type': 'City', name: 'Granville' },
    { '@type': 'City', name: 'Coutances' },
    { '@type': 'City', name: 'Bréhal' },
    { '@type': 'City', name: 'Hauteville-sur-Mer' },
    { '@type': 'City', name: 'Montmartin-sur-Mer' },
    { '@type': 'AdministrativeArea', name: 'Manche' },
    { '@type': 'AdministrativeArea', name: 'Normandie' },
  ],
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 48.836,
    longitude: -1.597,
  },
  address: {
    '@type': 'PostalAddress',
    addressRegion: 'Normandie',
    addressCountry: 'FR',
    postalCode: '50400',
  },
  sameAs: [
    'https://www.facebook.com/pipelette.lemalinois',
    'https://www.instagram.com/education_honnete_pipelette/',
    'https://www.youtube.com/channel/UCyEyavOUVpsGd9IH4_8wIBA',
  ],
}

export const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Éducation canine',
  provider: { '@id': BUSINESS_ID },
  offers: [
    {
      '@type': 'Offer',
      name: 'Cours particulier',
      price: '40',
      priceCurrency: 'EUR',
      description: 'Séance individuelle adaptée à votre chien et à vos objectifs',
    },
    {
      '@type': 'Offer',
      name: 'Forfait 5 séances',
      price: '190',
      priceCurrency: 'EUR',
    },
    {
      '@type': 'Offer',
      name: 'Forfait 10 séances',
      price: '370',
      priceCurrency: 'EUR',
    },
  ],
}

export function articleSchema({
  headline,
  datePublished,
  url,
}: {
  headline: string
  datePublished?: string
  url: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    datePublished: datePublished ?? undefined,
    url,
    author: { '@type': 'Person', name: 'Marie-Anne Lamellière' },
    publisher: {
      '@type': 'Organization',
      name: 'Éducation Honnête',
      '@id': BUSINESS_ID,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` },
    },
    about: { '@type': 'Thing', name: 'Éducation canine bienveillante' },
  }
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }
}
