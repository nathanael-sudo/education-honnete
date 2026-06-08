'use client'

import { useState } from 'react'
import { PrismicRichText } from '@prismicio/react'
import * as prismic from '@prismicio/client'

type FaqItem = {
  question: prismic.KeyTextField
  reponse: prismic.RichTextField
}

function BreedFaqItem({ item, index }: { item: FaqItem; index: number }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        className="w-full text-left py-5 flex items-start justify-between gap-4 group"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="font-serif font-semibold text-forest-800 text-lg leading-snug group-hover:text-forest-600 transition-colors">
          {item.question}
        </span>
        <span className={`shrink-0 mt-0.5 w-6 h-6 rounded-full bg-forest-100 flex items-center justify-center text-forest-700 transition-transform ${open ? 'rotate-180' : ''}`}>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      {open && (
        <div className="pb-5 text-gray-600 leading-relaxed text-[0.95rem] prose-custom" key={index}>
          <PrismicRichText field={item.reponse} />
        </div>
      )}
    </div>
  )
}

export default function BreedFaq({ items }: { items: FaqItem[] }) {
  if (!items.length) return null
  return (
    <div className="bg-white rounded-2xl shadow-sm px-6 divide-y divide-gray-100">
      {items.map((item, i) => (
        <BreedFaqItem key={i} item={item} index={i} />
      ))}
    </div>
  )
}
