import HeroSlice from './slices/HeroSlice'
import ContentSlice from './slices/ContentSlice'
import CtaSlice from './slices/CtaSlice'
import EducatorPresentationSlice from './slices/EducatorPresentationSlice'
import FeaturedCaseStudiesSlice from './slices/FeaturedCaseStudiesSlice'
import ImageTextSlice from './slices/ImageTextSlice'
import VideoEmbedSlice from './slices/VideoEmbedSlice'
import FaqSectionSlice from './slices/FaqSectionSlice'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function SliceZone({ slices }: { slices: any[] }) {
  return (
    <>
      {slices.map((slice, i) => {
        switch (slice.slice_type) {
          case 'hero':                   return <HeroSlice key={i} slice={slice} />
          case 'content':                return <ContentSlice key={i} slice={slice} />
          case 'cta':                    return <CtaSlice key={i} slice={slice} />
          case 'educator_presentation':  return <EducatorPresentationSlice key={i} slice={slice} />
          case 'featured_case_studies':  return <FeaturedCaseStudiesSlice key={i} slice={slice} />
          case 'image_text':             return <ImageTextSlice key={i} slice={slice} />
          case 'video_embed':            return <VideoEmbedSlice key={i} slice={slice} />
          case 'faq_section':            return <FaqSectionSlice key={i} slice={slice} />
          default:                       return null
        }
      })}
    </>
  )
}
