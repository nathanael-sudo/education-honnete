'use client'

import { useRef, useState, useEffect, useCallback } from 'react'

type CarouselVideo = {
  url: string
  caption: string | null
}

export default function VideoCarousel({ videos }: { videos: CarouselVideo[] }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const checkScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 4)
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4)
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    checkScroll()
    el.addEventListener('scroll', checkScroll, { passive: true })
    const ro = new ResizeObserver(checkScroll)
    ro.observe(el)
    return () => {
      el.removeEventListener('scroll', checkScroll)
      ro.disconnect()
    }
  }, [checkScroll])

  const scrollBy = (dir: 'left' | 'right') => {
    const el = scrollRef.current
    if (!el) return
    const card = el.querySelector<HTMLElement>('[data-card]')
    const step = card ? card.offsetWidth + 12 : 200
    el.scrollBy({ left: dir === 'left' ? -step : step, behavior: 'smooth' })
  }

  if (videos.length === 0) return null

  return (
    <div className="relative">
      {/* Scroll track */}
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none' }}
      >
        {videos.map((v, i) => (
          <div key={i} data-card className="flex-none w-40 sm:w-48 snap-start">
            <div className="aspect-[9/16] rounded-xl overflow-hidden bg-forest-900 shadow-md">
              <video
                src={v.url}
                controls
                playsInline
                className="w-full h-full object-contain"
              />
            </div>
            {v.caption && (
              <p className="text-sm text-gray-500 mt-2 italic">{v.caption}</p>
            )}
          </div>
        ))}
      </div>

      {/* Desktop arrows — rendered only when scroll is possible in that direction */}
      {canScrollLeft && (
        <button
          onClick={() => scrollBy('left')}
          className="hidden md:flex absolute left-0 top-[45%] -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white shadow-lg border border-gray-100 items-center justify-center text-forest-700 hover:text-forest-900 transition-colors z-10"
          aria-label="Précédent"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}
      {canScrollRight && (
        <button
          onClick={() => scrollBy('right')}
          className="hidden md:flex absolute right-0 top-[45%] -translate-y-1/2 translate-x-1/2 w-9 h-9 rounded-full bg-white shadow-lg border border-gray-100 items-center justify-center text-forest-700 hover:text-forest-900 transition-colors z-10"
          aria-label="Suivant"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}
    </div>
  )
}
