import Image from 'next/image'

type MosaicPhoto = {
  url: string
  alt: string | null
  caption: string | null
}

export default function PhotoMosaic({ photos }: { photos: MosaicPhoto[] }) {
  if (photos.length === 0) return null

  return (
    <section className="py-16 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {photos.map((photo, i) => (
            <div key={i} className="group">
              <div className="relative aspect-square overflow-hidden rounded-xl shadow-sm">
                <Image
                  src={photo.url}
                  alt={photo.alt ?? photo.caption ?? ''}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, 33vw"
                />
              </div>
              {photo.caption && (
                <p className="text-xs text-gray-500 mt-1.5 px-0.5 italic">{photo.caption}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
