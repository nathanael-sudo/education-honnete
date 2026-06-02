import { Metadata } from 'next'
import { createClient } from '@/prismicio'
import SliceZone from '@/components/SliceZone'

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient()
  const page = await client.getSingle('homepage')
  return {
    title: page.data.meta_title ?? 'Éducation Honnête',
    description: page.data.meta_description ?? undefined,
  }
}

export default async function HomePage() {
  const client = createClient()
  const page = await client.getSingle('homepage')

  return <SliceZone slices={page.data.slices} />
}
