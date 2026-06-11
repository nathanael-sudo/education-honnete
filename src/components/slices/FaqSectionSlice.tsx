'use client'

import { useState } from 'react'
import Script from 'next/script'
import * as prismic from '@prismicio/client'
import { faqSchema } from '@/lib/structured-data'

type FaqSectionSlice = {
  slice_type: 'faq_section'
  variation: 'default'
  primary: {
    titre: prismic.KeyTextField
  }
  items: {
    question: prismic.KeyTextField
    reponse: prismic.KeyTextField
  }[]
}

function FaqItem({ question, reponse, index }: { question: string; reponse: string; index: number }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        className="w-full text-left py-5 flex items-start justify-between gap-4 group"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="font-serif font-semibold text-forest-800 text-lg leading-snug group-hover:text-forest-600 transition-colors">
          {question}
        </span>
        <span className={`shrink-0 mt-0.5 w-6 h-6 rounded-full bg-forest-100 flex items-center justify-center text-forest-700 transition-transform ${open ? 'rotate-180' : ''}`}>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      {open && (
        <div key={index} className="pb-5 text-gray-600 leading-relaxed text-[0.95rem]">
          {reponse}
        </div>
      )}
    </div>
  )
}

export default function FaqSectionSlice({ slice }: { slice: FaqSectionSlice }) {
  const items = (slice.items ?? []).filter((item) => item.question && item.reponse)
  if (items.length === 0) return null

  const schemaItems = items.map((item) => ({ q: item.question as string, a: item.reponse as string }))

  return (
    <section className="py-16 px-4 bg-cream">
      <Script
        id="schema-faq-homepage"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(schemaItems)) }}
      />
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-serif font-bold text-forest-800 mb-10 text-center">
          {slice.primary.titre ?? 'Questions fréquentes'}
        </h2>
        <div className="bg-white rounded-2xl shadow-sm px-6 divide-y divide-gray-100">
          {items.map((item, i) => (
            <FaqItem
              key={i}
              index={i}
              question={item.question as string}
              reponse={item.reponse as string}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
