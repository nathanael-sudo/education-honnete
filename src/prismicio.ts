import * as prismic from '@prismicio/client'

export const repositoryName = 'education-honnete'

export function createClient() {
  return prismic.createClient(repositoryName, {
    fetchOptions: {
      // @ts-expect-error next is a Next.js extension on RequestInit
      next: { revalidate: 3600 },
    },
  })
}

// Resolve internal Prismic document links to URLs
export function linkResolver(doc: prismic.PrismicDocument): string {
  if (doc.type === 'case_study') return `/cas-pratiques-education-canine/${doc.uid}`
  if (doc.type === 'homepage') return '/'
  if (doc.type === 'pricing') return '/prix'
  if (doc.type === 'reservation') return '/reservation'
  return '/'
}
