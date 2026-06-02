import Link from 'next/link'
import * as prismic from '@prismicio/client'
import { PrismicRichText } from '@prismicio/react'

type LayoutDoc = prismic.PrismicDocument<{
  site_name: prismic.KeyTextField
  footer_text: prismic.RichTextField
  facebook_url: prismic.LinkField
  instagram_url: prismic.LinkField
  youtube_url: prismic.LinkField
  copyright: prismic.KeyTextField
}>

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-forest-700/20 hover:bg-forest-600 text-forest-200 hover:text-white transition-colors"
    >
      {children}
    </a>
  )
}

export default function Footer({ layout }: { layout: LayoutDoc }) {
  const { site_name, footer_text, facebook_url, instagram_url, youtube_url, copyright } = layout.data

  const fbUrl = prismic.isFilled.link(facebook_url) ? (facebook_url as prismic.FilledLinkToWebField).url : null
  const igUrl = prismic.isFilled.link(instagram_url) ? (instagram_url as prismic.FilledLinkToWebField).url : null
  const ytUrl = prismic.isFilled.link(youtube_url) ? (youtube_url as prismic.FilledLinkToWebField).url : null

  return (
    <footer className="bg-forest-900 text-forest-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🐾</span>
              <span className="font-serif text-lg font-semibold text-white">
                {site_name ?? 'Éducation Honnête'}
              </span>
            </div>
            <div className="flex gap-3">
              {fbUrl && (
                <SocialLink href={fbUrl} label="Facebook">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </SocialLink>
              )}
              {igUrl && (
                <SocialLink href={igUrl} label="Instagram">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                  </svg>
                </SocialLink>
              )}
              {ytUrl && (
                <SocialLink href={ytUrl} label="YouTube">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
                    <polygon fill="white" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
                  </svg>
                </SocialLink>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm">
              {[
                ['Accueil', '/'],
                ['Cas pratiques', '/cas-pratiques-education-canine'],
                ['Tarifs', '/prix'],
                ['Réservation', '/reservation'],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-forest-300 hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Footer text */}
          {prismic.isFilled.richText(footer_text) && (
            <div className="text-sm text-forest-300 leading-relaxed">
              <PrismicRichText field={footer_text} />
            </div>
          )}
        </div>

        <div className="mt-10 pt-6 border-t border-forest-700 text-center text-xs text-forest-400">
          {copyright ?? `© ${new Date().getFullYear()} Éducation Honnête. Tous droits réservés.`}
        </div>
      </div>
    </footer>
  )
}
