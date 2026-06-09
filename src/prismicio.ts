import * as prismic from '@prismicio/client'

export const repositoryName = 'education-honnete'
export const siteUrl = 'https://education-honnete.vercel.app'

export function createClient() {
  return prismic.createClient(repositoryName, {
    fetchOptions: {
      // @ts-expect-error next is a Next.js extension on RequestInit
      next: { revalidate: 60 },
    },
  })
}

export function linkResolver(doc: prismic.PrismicDocument): string {
  if (doc.type === 'case_study') return `/cas-pratiques-education-canine/${doc.uid}`
  if (doc.type === 'homepage') return '/'
  if (doc.type === 'pricing') return '/prix'
  if (doc.type === 'reservation') return '/reservation'
  if (doc.type === 'blog_post') return `/blog/${doc.uid}`
  if (doc.type === 'city_page') return `/educatrice-canine/${doc.uid}`
  if (doc.type === 'race') return `/races/${doc.uid}`
  if (doc.type === 'about') return '/a-propos'
  return '/'
}
