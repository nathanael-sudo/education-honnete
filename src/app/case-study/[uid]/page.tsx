import { notFound } from 'next/navigation'
import { createClient } from '@/prismicio'

type Props = { params: { uid: string } }

export default async function Page({ params }: Props) {
  const client = createClient()
  try {
    await client.getByUID('case_study', params.uid)
  } catch {
    notFound()
  }
  // This route is superseded by /cas-pratiques-education-canine/[uid]
  notFound()
}
