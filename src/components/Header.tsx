'use client'

import Link from 'next/link'
import { useState } from 'react'
import * as prismic from '@prismicio/client'

type LayoutDoc = prismic.PrismicDocument<{
  site_name: prismic.KeyTextField
  navigation_links: prismic.GroupField<{
    label: prismic.KeyTextField
    link: prismic.LinkField
  }>
  cta_button_label: prismic.KeyTextField
  cta_button_link: prismic.LinkField
}>

function resolveLink(link: prismic.LinkField): string {
  if (prismic.isFilled.link(link)) {
    if (link.link_type === 'Web') return (link as prismic.FilledLinkToWebField).url
    if (link.link_type === 'Document') {
      const doc = link as prismic.FilledContentRelationshipField
      if (doc.type === 'case_study') return `/cas-pratiques-education-canine/${doc.uid}`
      if (doc.type === 'pricing') return '/prix'
      if (doc.type === 'reservation') return '/reservation'
    }
  }
  return '/'
}

export default function Header({ layout }: { layout: LayoutDoc }) {
  const [open, setOpen] = useState(false)
  const { site_name, navigation_links, cta_button_label, cta_button_link } = layout.data

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="text-2xl">🐾</span>
            <span className="font-serif text-lg font-semibold text-forest-800">
              {site_name ?? 'Éducation Honnête'}
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navigation_links.map((item) => {
              const href = resolveLink(item.link)
              return (
                <Link
                  key={href}
                  href={href}
                  className="text-sm font-medium text-gray-600 hover:text-forest-700 transition-colors"
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* CTA */}
          <div className="hidden md:block">
            {prismic.isFilled.link(cta_button_link) && (
              <Link
                href={resolveLink(cta_button_link)}
                className="inline-flex items-center px-4 py-2 rounded-full bg-forest-700 text-white text-sm font-medium hover:bg-forest-800 transition-colors"
              >
                {cta_button_label ?? 'Réserver'}
              </Link>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-forest-700"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            <div className="w-5 flex flex-col gap-1">
              <span className={`block h-0.5 bg-current transition-all ${open ? 'rotate-45 translate-y-1.5' : ''}`} />
              <span className={`block h-0.5 bg-current transition-all ${open ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 bg-current transition-all ${open ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 pb-4">
          <nav className="flex flex-col gap-1 pt-3">
            {navigation_links.map((item) => {
              const href = resolveLink(item.link)
              return (
                <Link
                  key={href}
                  href={href}
                  className="py-2 text-sm font-medium text-gray-700 hover:text-forest-700"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              )
            })}
            {prismic.isFilled.link(cta_button_link) && (
              <Link
                href={resolveLink(cta_button_link)}
                className="mt-3 text-center px-4 py-2 rounded-full bg-forest-700 text-white text-sm font-medium"
                onClick={() => setOpen(false)}
              >
                {cta_button_label ?? 'Réserver'}
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
