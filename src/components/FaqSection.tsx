'use client'

import { useState } from 'react'
import Script from 'next/script'
import { faqSchema } from '@/lib/structured-data'

type FaqItem = { q: string; a: string }

function FaqAccordionItem({ item, index }: { item: FaqItem; index: number }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        className="w-full text-left py-5 flex items-start justify-between gap-4 group"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="font-serif font-semibold text-forest-800 text-lg leading-snug group-hover:text-forest-600 transition-colors">
          {item.q}
        </span>
        <span className={`shrink-0 mt-0.5 w-6 h-6 rounded-full bg-forest-100 flex items-center justify-center text-forest-700 transition-transform ${open ? 'rotate-180' : ''}`}>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      {open && (
        <div className="pb-5 text-gray-600 leading-relaxed text-[0.95rem] whitespace-pre-line" key={index}>
          {item.a}
        </div>
      )}
    </div>
  )
}

export default function FaqSection({
  title = 'Questions fréquentes',
  items,
  schemaId,
}: {
  title?: string
  items: FaqItem[]
  schemaId: string
}) {
  return (
    <section className="py-16 px-4 bg-cream">
      <Script
        id={schemaId}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(items)) }}
      />
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-serif font-bold text-forest-800 mb-10 text-center">{title}</h2>
        <div className="bg-white rounded-2xl shadow-sm px-6 divide-y divide-gray-100">
          {items.map((item, i) => (
            <FaqAccordionItem key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
