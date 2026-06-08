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

type CityPage = prismic.PrismicDocument<{ city_name: prismic.KeyTextField }>

function resolveLink(link: prismic.LinkField): string {
  if (prismic.isFilled.link(link)) {
    if (link.link_type === 'Web') return (link as prismic.FilledLinkToWebField).url
    if (link.link_type === 'Document') {
      const doc = link as prismic.FilledContentRelationshipField
      if (doc.type === 'case_study') return `/cas-pratiques-education-canine/${doc.uid}`
      if (doc.type === 'city_page') return `/educatrice-canine/${doc.uid}`
      if (doc.type === 'pricing') return '/prix'
      if (doc.type === 'reservation') return '/reservation'
    }
  }
  return '/'
}

export default function Header({ layout, cityPages = [] }: { layout: LayoutDoc; cityPages?: CityPage[] }) {
  const [open, setOpen] = useState(false)
  const [zonesOpen, setZonesOpen] = useState(false)
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

            {/* Zones d'intervention dropdown */}
            {cityPages.length > 0 && (
              <div className="relative group">
                <button className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-forest-700 transition-colors">
                  Zones
                  <svg className="w-3.5 h-3.5 mt-px" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 py-1.5 min-w-52 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150">
                  {cityPages.map((city) => (
                    <Link
                      key={city.uid}
                      href={`/educatrice-canine/${city.uid}`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-forest-50 hover:text-forest-700 transition-colors"
                    >
                      {city.data.city_name ?? city.uid}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <Link href="/races" className="text-sm font-medium text-gray-600 hover:text-forest-700 transition-colors">
              Races
            </Link>

            <Link href="/blog" className="text-sm font-medium text-gray-600 hover:text-forest-700 transition-colors">
              Blog
            </Link>
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

            {/* Zones collapsible */}
            {cityPages.length > 0 && (
              <div>
                <button
                  className="w-full flex items-center justify-between py-2 text-sm font-medium text-gray-700 hover:text-forest-700"
                  onClick={() => setZonesOpen(!zonesOpen)}
                >
                  Zones d&apos;intervention
                  <svg className={`w-3.5 h-3.5 transition-transform ${zonesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {zonesOpen && (
                  <div className="pl-3 flex flex-col gap-1 mb-1">
                    {cityPages.map((city) => (
                      <Link
                        key={city.uid}
                        href={`/educatrice-canine/${city.uid}`}
                        className="py-1.5 text-sm text-gray-600 hover:text-forest-700"
                        onClick={() => setOpen(false)}
                      >
                        {city.data.city_name ?? city.uid}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}

            <Link href="/races" className="py-2 text-sm font-medium text-gray-700 hover:text-forest-700" onClick={() => setOpen(false)}>
              Races
            </Link>

            <Link href="/blog" className="py-2 text-sm font-medium text-gray-700 hover:text-forest-700" onClick={() => setOpen(false)}>
              Blog
            </Link>

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
