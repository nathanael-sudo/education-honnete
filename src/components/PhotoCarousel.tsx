'use client'

import Image from 'next/image'
import { useState } from 'react'

type CarouselImage = {
  url: string
  alt: string | null
  caption: string | null
  width: number
  height: number
}

const FIXED_HEIGHT = 420
const MAX_WIDTH = 720

export default function PhotoCarousel({ images }: { images: CarouselImage[] }) {
  const [current, setCurrent] = useState(0)
  if (images.length === 0) return null

  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length)
  const next = () => setCurrent((c) => (c + 1) % images.length)

  const img = images[current]
  const displayWidth = Math.min(MAX_WIDTH, Math.round(FIXED_HEIGHT * (img.width / img.height)))

  return (
    <div className="flex flex-col items-center">
      {/* Image frame — fixed height, natural-ratio width */}
      <div
        className="relative rounded-2xl overflow-hidden bg-forest-100 shadow-lg"
        style={{ height: FIXED_HEIGHT, width: displayWidth }}
      >
        <Image
          key={img.url}
          src={img.url}
          alt={img.alt ?? img.caption ?? ''}
          fill
          className="object-cover transition-opacity duration-300"
          sizes="(max-width: 768px) 100vw, 720px"
        />

        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors"
              aria-label="Précédent"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors"
              aria-label="Suivant"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>

      {img.caption && (
        <p className="text-center text-sm text-gray-500 mt-3 italic">{img.caption}</p>
      )}

      {images.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${i === current ? 'bg-forest-700 scale-125' : 'bg-gray-300 hover:bg-gray-400'}`}
              aria-label={`Image ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
