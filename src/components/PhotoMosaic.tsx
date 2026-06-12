import Image from 'next/image'

type MosaicPhoto = {
  url: string
  alt: string | null
  caption: string | null
  width: number
  height: number
}

export default function PhotoMosaic({ photos }: { photos: MosaicPhoto[] }) {
  if (photos.length === 0) return null

  return (
    <section className="py-16 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="columns-2 sm:columns-3 gap-3 sm:gap-4">
          {photos.map((photo, i) => (
            <div key={i} className="break-inside-avoid mb-3 sm:mb-4 group">
              <div className="overflow-hidden rounded-xl shadow-sm">
                <Image
                  src={photo.url}
                  alt={photo.alt ?? photo.caption ?? ''}
                  width={photo.width}
                  height={photo.height}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
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
