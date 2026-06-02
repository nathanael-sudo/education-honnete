import { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '@/prismicio'

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient()
  const page = await client.getSingle('reservation')
  return {
    title: page.data.meta_title ?? 'Réservation – Éducation Honnête',
    description: page.data.meta_description ?? undefined,
  }
}

export default async function ReservationPage() {
  const client = createClient()
  const page = await client.getSingle('reservation')
  const {
    title, subtitle,
    contact_section_title, contact_section_description,
    email, phone, footer_message,
  } = page.data

  return (
    <div className="bg-cream min-h-screen">
      {/* Header */}
      <div className="bg-forest-800 py-16 px-4 text-center">
        <p className="text-amber-warm font-semibold text-sm uppercase tracking-widest mb-3">Premier pas</p>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white mb-4">
          {title ?? 'Réserver un cours'}
        </h1>
        {subtitle && (
          <p className="text-forest-200 text-lg max-w-xl mx-auto leading-relaxed">{subtitle}</p>
        )}
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact info */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-serif font-bold text-forest-800 mb-3">
              {contact_section_title ?? 'Contactez-moi'}
            </h2>
            {contact_section_description && (
              <p className="text-gray-600 leading-relaxed mb-8">{contact_section_description}</p>
            )}

            <div className="space-y-5">
              {phone && (
                <a
                  href={`tel:${phone.replace(/\s|\./g, '')}`}
                  className="flex items-center gap-4 p-4 rounded-xl bg-forest-50 hover:bg-forest-100 transition-colors group"
                >
                  <div className="w-11 h-11 rounded-full bg-forest-700 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Téléphone</p>
                    <p className="font-semibold text-forest-800 group-hover:text-forest-600 transition-colors">{phone}</p>
                  </div>
                </a>
              )}

              {email && (
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-4 p-4 rounded-xl bg-forest-50 hover:bg-forest-100 transition-colors group"
                >
                  <div className="w-11 h-11 rounded-full bg-forest-700 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Email</p>
                    <p className="font-semibold text-forest-800 group-hover:text-forest-600 transition-colors break-all">{email}</p>
                  </div>
                </a>
              )}
            </div>

            {footer_message && (
              <p className="mt-8 text-sm text-gray-500 italic leading-relaxed">{footer_message}</p>
            )}
          </div>

          {/* What to expect */}
          <div className="space-y-5">
            <div className="bg-amber-light rounded-2xl p-6">
              <div className="text-3xl mb-3">🐾</div>
              <h3 className="font-serif font-bold text-forest-800 text-lg mb-2">Cours à domicile</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Je me déplace chez vous pour travailler dans votre environnement réel, là où votre chien évolue au quotidien.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="text-3xl mb-3">📍</div>
              <h3 className="font-serif font-bold text-forest-800 text-lg mb-2">Zone d'intervention</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Coutançais et Granvillais : Hauteville-sur-Mer, Bréhal, Lingreville, Montmartin-sur-Mer et environs.
              </p>
            </div>

            <div className="bg-forest-800 rounded-2xl p-6">
              <div className="text-3xl mb-3">💰</div>
              <h3 className="font-serif font-bold text-white text-lg mb-2">Tarifs</h3>
              <p className="text-sm text-forest-200 leading-relaxed mb-4">
                À partir de 40€ le cours particulier. Forfaits disponibles.
              </p>
              <Link
                href="/prix"
                className="inline-flex items-center gap-1.5 text-amber-warm font-semibold text-sm hover:text-amber-400 transition-colors"
              >
                Voir tous les tarifs
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
