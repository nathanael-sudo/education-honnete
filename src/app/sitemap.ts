import { MetadataRoute } from 'next'
import { createClient, siteUrl } from '@/prismicio'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const client = createClient()

  const staticPages: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${siteUrl}/cas-pratiques-education-canine`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${siteUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${siteUrl}/prix`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/reservation`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ]

  let caseStudyPages: MetadataRoute.Sitemap = []
  try {
    const caseStudies = await client.getAllByType('case_study')
    caseStudyPages = caseStudies.map((doc) => ({
      url: `${siteUrl}/cas-pratiques-education-canine/${doc.uid}`,
      lastModified: new Date(doc.last_publication_date),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  } catch { /* ignore */ }

  let blogPages: MetadataRoute.Sitemap = []
  try {
    const posts = await client.getAllByType('blog_post')
    blogPages = posts.map((doc) => ({
      url: `${siteUrl}/blog/${doc.uid}`,
      lastModified: new Date(doc.last_publication_date),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  } catch { /* ignore */ }

  let cityPages: MetadataRoute.Sitemap = []
  try {
    const cities = await client.getAllByType('city_page')
    cityPages = cities.map((doc) => ({
      url: `${siteUrl}/educatrice-canine/${doc.uid}`,
      lastModified: new Date(doc.last_publication_date),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))
  } catch { /* ignore */ }

  return [...staticPages, ...caseStudyPages, ...blogPages, ...cityPages]
}
