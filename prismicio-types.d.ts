import type * as prismic from "@prismicio/client";

type Simplify<T> = { [KeyType in keyof T]: T[KeyType] };


type PickContentRelationshipFieldData<
	TRelationship extends prismic.CustomTypeModelFetchCustomTypeLevel1 | prismic.CustomTypeModelFetchCustomTypeLevel2 | prismic.CustomTypeModelFetchGroupLevel1 | prismic.CustomTypeModelFetchGroupLevel2,
	TData extends Record<string, prismic.AnyRegularField | prismic.GroupField | prismic.NestedGroupField | prismic.SliceZone>,
	TLang extends string
> = |
	// Content relationship fields
	{
		[TSubRelationship in Extract<
			TRelationship["fields"][number], prismic.CustomTypeModelFetchContentRelationshipLevel1
		> as TSubRelationship["id"]]:
			ContentRelationshipFieldWithData<TSubRelationship["customtypes"], TLang>;
	} &
	// Group
	{
		[TGroup in Extract<
			TRelationship["fields"][number], prismic.CustomTypeModelFetchGroupLevel1 | prismic.CustomTypeModelFetchGroupLevel2
		> as TGroup["id"]]:
			TData[TGroup["id"]] extends prismic.GroupField<infer TGroupData>
				? prismic.GroupField<PickContentRelationshipFieldData<TGroup, TGroupData, TLang>>
				: never
	} &
	// Other fields
	{
		[TFieldKey in Extract<TRelationship["fields"][number], string>]:
			TFieldKey extends keyof TData ? TData[TFieldKey] : never;
	};

type ContentRelationshipFieldWithData<
	TCustomType extends readonly (prismic.CustomTypeModelFetchCustomTypeLevel1 | string)[] | readonly (prismic.CustomTypeModelFetchCustomTypeLevel2 | string)[],
	TLang extends string = string
> = {
	[ID in Exclude<TCustomType[number], string>["id"]]:
		prismic.ContentRelationshipField<
			ID,
			TLang,
			PickContentRelationshipFieldData<
				Extract<TCustomType[number], { id: ID }>,
				Extract<prismic.Content.AllDocumentTypes, { type: ID }>["data"],
				TLang
			>
		>
}[Exclude<TCustomType[number], string>["id"]];

/**
 * Item in *About → Valeurs (4 principes)*
 */
export interface AboutDocumentDataValeursItem {
	/**
	 * Titre field in *About → Valeurs (4 principes)*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: about.valeurs[].titre
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	titre: prismic.KeyTextField;
	
	/**
	 * Texte field in *About → Valeurs (4 principes)*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: about.valeurs[].texte
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	texte: prismic.KeyTextField;
}

/**
 * Item in *About → Parcours & Formation*
 */
export interface AboutDocumentDataCredentialsItem {
	/**
	 * Titre field in *About → Parcours & Formation*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: about.credentials[].titre
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	titre: prismic.KeyTextField;
	
	/**
	 * Détail field in *About → Parcours & Formation*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: about.credentials[].detail
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	detail: prismic.KeyTextField;
}

/**
 * Content for About documents
 */
interface AboutDocumentData {
	/**
	 * Histoire field in *About*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: about.histoire
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	histoire: prismic.RichTextField;
	
	/**
	 * Citation mise en avant field in *About*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: about.citation
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	citation: prismic.KeyTextField;
	
	/**
	 * Philosophie — Intro (1 ligne) field in *About*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: about.philosophie_intro
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	philosophie_intro: prismic.KeyTextField;
	
	/**
	 * Philosophie — Contenu field in *About*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: about.philosophie_contenu
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	philosophie_contenu: prismic.RichTextField;
	
	/**
	 * Valeurs (4 principes) field in *About*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: about.valeurs[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	valeurs: prismic.GroupField<Simplify<AboutDocumentDataValeursItem>>;
	
	/**
	 * Parcours & Formation field in *About*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: about.credentials[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	credentials: prismic.GroupField<Simplify<AboutDocumentDataCredentialsItem>>;
	
	/**
	 * CTA — Description field in *About*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: about.cta_texte
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	cta_texte: prismic.KeyTextField;/**
	 * Meta Title field in *About*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: about.meta_title
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_title: prismic.KeyTextField;
	
	/**
	 * Meta Description field in *About*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: about.meta_description
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_description: prismic.KeyTextField;
}

/**
 * About document from Prismic
 *
 * - **API ID**: `about`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type AboutDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<Simplify<AboutDocumentData>, "about", Lang>;

type BlogPostDocumentDataSlicesSlice = never

/**
 * Item in *Blog Post → Tags*
 */
export interface BlogPostDocumentDataTagsItem {
	/**
	 * Tag field in *Blog Post → Tags*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: blog_post.tags[].tag
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	tag: prismic.KeyTextField;
}

/**
 * Item in *Blog Post → Related Case Studies*
 */
export interface BlogPostDocumentDataRelatedCaseStudiesItem {
	/**
	 * Case Study field in *Blog Post → Related Case Studies*
	 *
	 * - **Field Type**: Content Relationship
	 * - **Placeholder**: *None*
	 * - **API ID Path**: blog_post.related_case_studies[].case_study
	 * - **Documentation**: https://prismic.io/docs/fields/content-relationship
	 */
	case_study: ContentRelationshipFieldWithData<[{"id":"case_study","fields":["dog_name","location"]}]>;
}

/**
 * Content for Blog Post documents
 */
interface BlogPostDocumentData {
	/**
	 * Slice Zone field in *Blog Post*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: blog_post.slices[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/slices
	 */
	slices: prismic.SliceZone<BlogPostDocumentDataSlicesSlice>;
	
	/**
	 * Title field in *Blog Post*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: blog_post.title
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title: prismic.RichTextField;
	
	/**
	 * Publication Date field in *Blog Post*
	 *
	 * - **Field Type**: Date
	 * - **Placeholder**: *None*
	 * - **API ID Path**: blog_post.publication_date
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/date
	 */
	publication_date: prismic.DateField;
	
	/**
	 * Cover Image field in *Blog Post*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: blog_post.cover_image
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	cover_image: prismic.ImageField<never>;
	
	/**
	 * Excerpt field in *Blog Post*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Short summary of the post
	 * - **API ID Path**: blog_post.excerpt
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	excerpt: prismic.KeyTextField;
	
	/**
	 * Author field in *Blog Post*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: blog_post.author
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	author: prismic.KeyTextField;
	
	/**
	 * Body field in *Blog Post*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: blog_post.body
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	body: prismic.RichTextField;
	
	/**
	 * Tags field in *Blog Post*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: blog_post.tags[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	tags: prismic.GroupField<Simplify<BlogPostDocumentDataTagsItem>>;
	
	/**
	 * Related Case Studies field in *Blog Post*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: blog_post.related_case_studies[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	related_case_studies: prismic.GroupField<Simplify<BlogPostDocumentDataRelatedCaseStudiesItem>>;/**
	 * Meta Title field in *Blog Post*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A title of the page used for social media and search engines
	 * - **API ID Path**: blog_post.meta_title
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_title: prismic.KeyTextField;
	
	/**
	 * Meta Description field in *Blog Post*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A brief summary of the page
	 * - **API ID Path**: blog_post.meta_description
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_description: prismic.KeyTextField;
	
	/**
	 * Meta Image field in *Blog Post*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: blog_post.meta_image
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	meta_image: prismic.ImageField<never>;
}

/**
 * Blog Post document from Prismic
 *
 * - **API ID**: `blog_post`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type BlogPostDocument<Lang extends string = string> = prismic.PrismicDocumentWithUID<Simplify<BlogPostDocumentData>, "blog_post", Lang>;

/**
 * Content for Cas pratiques — Page documents
 */
interface CaseStudiesPageDocumentData {
	/**
	 * Hero — Surtitre field in *Cas pratiques — Page*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: case_studies_page.hero_eyebrow
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	hero_eyebrow: prismic.KeyTextField;
	
	/**
	 * Hero — Titre field in *Cas pratiques — Page*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: case_studies_page.hero_title
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	hero_title: prismic.KeyTextField;
	
	/**
	 * Hero — Description field in *Cas pratiques — Page*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: case_studies_page.hero_description
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	hero_description: prismic.KeyTextField;
	
	/**
	 * Carte — Libellé du lien field in *Cas pratiques — Page*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: case_studies_page.card_cta_label
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	card_cta_label: prismic.KeyTextField;
	
	/**
	 * Message liste vide field in *Cas pratiques — Page*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: case_studies_page.empty_state_text
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	empty_state_text: prismic.KeyTextField;/**
	 * Meta Title field in *Cas pratiques — Page*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: case_studies_page.meta_title
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_title: prismic.KeyTextField;
	
	/**
	 * Meta Description field in *Cas pratiques — Page*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: case_studies_page.meta_description
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_description: prismic.KeyTextField;
}

/**
 * Cas pratiques — Page document from Prismic
 *
 * - **API ID**: `case_studies_page`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type CaseStudiesPageDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<Simplify<CaseStudiesPageDocumentData>, "case_studies_page", Lang>;

/**
 * Item in *Case Study → Photo Carousel*
 */
export interface CaseStudyDocumentDataPhotoCarouselItem {
	/**
	 * Carousel Image field in *Case Study → Photo Carousel*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: case_study.photo_carousel[].carousel_image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	carousel_image: prismic.ImageField<never>;
	
	/**
	 * Image Caption field in *Case Study → Photo Carousel*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Optional caption
	 * - **API ID Path**: case_study.photo_carousel[].image_caption
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	image_caption: prismic.KeyTextField;
}

/**
 * Item in *Case Study → Video Carousel*
 */
export interface CaseStudyDocumentDataVideoCarouselItem {
	/**
	 * Video (MP4) field in *Case Study → Video Carousel*
	 *
	 * - **Field Type**: Link to Media
	 * - **Placeholder**: *None*
	 * - **API ID Path**: case_study.video_carousel[].video_file
	 * - **Documentation**: https://prismic.io/docs/fields/link-to-media
	 */
	video_file: prismic.LinkToMediaField<prismic.FieldState, never>;
	
	/**
	 * Caption field in *Case Study → Video Carousel*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: case_study.video_carousel[].video_caption
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	video_caption: prismic.KeyTextField;
}

/**
 * Content for Case Study documents
 */
interface CaseStudyDocumentData {
	/**
	 * Dog Name field in *Case Study*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: case_study.dog_name
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	dog_name: prismic.KeyTextField;
	
	/**
	 * Race field in *Case Study*
	 *
	 * - **Field Type**: Content Relationship
	 * - **Placeholder**: *None*
	 * - **API ID Path**: case_study.dog_breed
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/content-relationship
	 */
	dog_breed: ContentRelationshipFieldWithData<[{"id":"race","fields":["nom"]}]>;
	
	/**
	 * Dog Portrait field in *Case Study*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: case_study.dog_portrait
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	dog_portrait: prismic.ImageField<never>;
	
	/**
	 * Location field in *Case Study*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: case_study.location
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	location: prismic.KeyTextField;
	
	/**
	 * Training Duration field in *Case Study*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: case_study.training_duration
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	training_duration: prismic.KeyTextField;
	
	/**
	 * Initial Problem - Title field in *Case Study*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: e.g., Problème initial
	 * - **API ID Path**: case_study.initial_problem_title
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	initial_problem_title: prismic.KeyTextField;
	
	/**
	 * Initial Problem - Content field in *Case Study*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: case_study.initial_problem_content
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	initial_problem_content: prismic.RichTextField;
	
	/**
	 * Educator Approach - Title field in *Case Study*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: e.g., Approche de l'éducatrice
	 * - **API ID Path**: case_study.educator_approach_title
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	educator_approach_title: prismic.KeyTextField;
	
	/**
	 * Educator Approach - Content field in *Case Study*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: case_study.educator_approach_content
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	educator_approach_content: prismic.RichTextField;
	
	/**
	 * Photo Carousel field in *Case Study*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: case_study.photo_carousel[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	photo_carousel: prismic.GroupField<Simplify<CaseStudyDocumentDataPhotoCarouselItem>>;
	
	/**
	 * Results - Title field in *Case Study*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: e.g., Résultats
	 * - **API ID Path**: case_study.results_title
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	results_title: prismic.KeyTextField;
	
	/**
	 * Results - Content field in *Case Study*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: case_study.results_content
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	results_content: prismic.RichTextField;
	
	/**
	 * Testimonial - Title field in *Case Study*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: e.g., Témoignage client
	 * - **API ID Path**: case_study.testimonial_title
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	testimonial_title: prismic.KeyTextField;
	
	/**
	 * Testimonial - Owner Name field in *Case Study*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Name of the dog owner
	 * - **API ID Path**: case_study.testimonial_owner_name
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	testimonial_owner_name: prismic.KeyTextField;
	
	/**
	 * Testimonial - Owner Location field in *Case Study*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: City or region
	 * - **API ID Path**: case_study.testimonial_owner_location
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	testimonial_owner_location: prismic.KeyTextField;
	
	/**
	 * Testimonial - Rating field in *Case Study*
	 *
	 * - **Field Type**: Number
	 * - **Placeholder**: Number of stars (1-5)
	 * - **API ID Path**: case_study.testimonial_rating
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/number
	 */
	testimonial_rating: prismic.NumberField;
	
	/**
	 * Testimonial - Content field in *Case Study*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Client review
	 * - **API ID Path**: case_study.testimonial_content
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	testimonial_content: prismic.RichTextField;
	
	/**
	 * Video Carousel field in *Case Study*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: case_study.video_carousel[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	video_carousel: prismic.GroupField<Simplify<CaseStudyDocumentDataVideoCarouselItem>>;/**
	 * Meta Title field in *Case Study*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: case_study.meta_title
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_title: prismic.KeyTextField;
	
	/**
	 * Meta Description field in *Case Study*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: case_study.meta_description
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_description: prismic.KeyTextField;
}

/**
 * Case Study document from Prismic
 *
 * - **API ID**: `case_study`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type CaseStudyDocument<Lang extends string = string> = prismic.PrismicDocumentWithUID<Simplify<CaseStudyDocumentData>, "case_study", Lang>;

type CityPageDocumentDataSlicesSlice = never

/**
 * Content for City Page documents
 */
interface CityPageDocumentData {
	/**
	 * Slice Zone field in *City Page*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: city_page.slices[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/slices
	 */
	slices: prismic.SliceZone<CityPageDocumentDataSlicesSlice>;
	
	/**
	 * City Name field in *City Page*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: city_page.city_name
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	city_name: prismic.KeyTextField;
	
	/**
	 * City Slug field in *City Page*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: city_page.city_slug
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	city_slug: prismic.KeyTextField;
	
	/**
	 * Department field in *City Page*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: city_page.department
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	department: prismic.KeyTextField;
	
	/**
	 * Region field in *City Page*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: city_page.region
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	region: prismic.KeyTextField;
	
	/**
	 * Hero Title field in *City Page*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: city_page.hero_title
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	hero_title: prismic.RichTextField;
	
	/**
	 * Hero Description field in *City Page*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: city_page.hero_description
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	hero_description: prismic.RichTextField;
	
	/**
	 * Local Context field in *City Page*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: city_page.local_context
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	local_context: prismic.RichTextField;
	
	/**
	 * Services Intro field in *City Page*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: city_page.services_intro
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	services_intro: prismic.RichTextField;/**
	 * Meta Title field in *City Page*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A title of the page used for social media and search engines
	 * - **API ID Path**: city_page.meta_title
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_title: prismic.KeyTextField;
	
	/**
	 * Meta Description field in *City Page*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A brief summary of the page
	 * - **API ID Path**: city_page.meta_description
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_description: prismic.KeyTextField;
	
	/**
	 * Meta Image field in *City Page*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: city_page.meta_image
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	meta_image: prismic.ImageField<never>;
}

/**
 * City Page document from Prismic
 *
 * - **API ID**: `city_page`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type CityPageDocument<Lang extends string = string> = prismic.PrismicDocumentWithUID<Simplify<CityPageDocumentData>, "city_page", Lang>;

type HomepageDocumentDataSlicesSlice = HeroSlice | ContentSlice | EducatorPresentationSlice | FeaturedCaseStudiesSlice | CtaSlice | FaqSectionSlice

/**
 * Content for Homepage documents
 */
interface HomepageDocumentData {
	/**
	 * Slice Zone field in *Homepage*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: homepage.slices[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/slices
	 */
	slices: prismic.SliceZone<HomepageDocumentDataSlicesSlice>;/**
	 * Meta Title field in *Homepage*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A title of the page used for social media and search engines
	 * - **API ID Path**: homepage.meta_title
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_title: prismic.KeyTextField;
	
	/**
	 * Meta Description field in *Homepage*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A brief summary of the page
	 * - **API ID Path**: homepage.meta_description
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_description: prismic.KeyTextField;
}

/**
 * Homepage document from Prismic
 *
 * - **API ID**: `homepage`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type HomepageDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<Simplify<HomepageDocumentData>, "homepage", Lang>;

/**
 * Item in *Layout → Navigation Links*
 */
export interface LayoutDocumentDataNavigationLinksItem {
	/**
	 * Label field in *Layout → Navigation Links*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Link text
	 * - **API ID Path**: layout.navigation_links[].label
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	label: prismic.KeyTextField;
	
	/**
	 * Link field in *Layout → Navigation Links*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: layout.navigation_links[].link
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
}

/**
 * Content for Layout documents
 */
interface LayoutDocumentData {
	/**
	 * Logo field in *Layout*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: layout.logo
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	logo: prismic.ImageField<never>;
	
	/**
	 * Site Name field in *Layout*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Éducation Honnête
	 * - **API ID Path**: layout.site_name
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	site_name: prismic.KeyTextField;
	
	/**
	 * Navigation Links field in *Layout*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: layout.navigation_links[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	navigation_links: prismic.GroupField<Simplify<LayoutDocumentDataNavigationLinksItem>>;
	
	/**
	 * CTA Button Label field in *Layout*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Réserver un cours d'essai
	 * - **API ID Path**: layout.cta_button_label
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	cta_button_label: prismic.KeyTextField;
	
	/**
	 * CTA Button Link field in *Layout*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: layout.cta_button_link
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	cta_button_link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;/**
	 * Footer Text field in *Layout*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: layout.footer_text
	 * - **Tab**: Footer
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	footer_text: prismic.RichTextField;
	
	/**
	 * Facebook URL field in *Layout*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: https://facebook.com/your-page
	 * - **API ID Path**: layout.facebook_url
	 * - **Tab**: Footer
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	facebook_url: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
	
	/**
	 * Instagram URL field in *Layout*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: https://instagram.com/your-account
	 * - **API ID Path**: layout.instagram_url
	 * - **Tab**: Footer
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	instagram_url: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
	
	/**
	 * YouTube URL field in *Layout*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: https://youtube.com/your-channel
	 * - **API ID Path**: layout.youtube_url
	 * - **Tab**: Footer
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	youtube_url: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
	
	/**
	 * Copyright field in *Layout*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: © 2024 Éducation Honnête
	 * - **API ID Path**: layout.copyright
	 * - **Tab**: Footer
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	copyright: prismic.KeyTextField;
}

/**
 * Layout document from Prismic
 *
 * - **API ID**: `layout`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type LayoutDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<Simplify<LayoutDocumentData>, "layout", Lang>;

/**
 * Item in *Pricing → Étapes (Comment je travaille)*
 */
export interface PricingDocumentDataEtapesItem {
	/**
	 * Numéro field in *Pricing → Étapes (Comment je travaille)*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: 01
	 * - **API ID Path**: pricing.etapes[].num
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	num: prismic.KeyTextField;
	
	/**
	 * Titre field in *Pricing → Étapes (Comment je travaille)*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: pricing.etapes[].titre
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	titre: prismic.KeyTextField;
	
	/**
	 * Texte field in *Pricing → Étapes (Comment je travaille)*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: pricing.etapes[].texte
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	texte: prismic.KeyTextField;
}

/**
 * Item in *Pricing → Plans tarifaires*
 */
export interface PricingDocumentDataPlansItem {
	/**
	 * Plan Title field in *Pricing → Plans tarifaires*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Cours d'essai
	 * - **API ID Path**: pricing.plans[].plan_title
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	plan_title: prismic.KeyTextField;
	
	/**
	 * Plan Description field in *Pricing → Plans tarifaires*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: pricing.plans[].plan_description
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	plan_description: prismic.RichTextField;
	
	/**
	 * Plan Price field in *Pricing → Plans tarifaires*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: 60€
	 * - **API ID Path**: pricing.plans[].plan_price
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	plan_price: prismic.KeyTextField;
	
	/**
	 * Is Featured field in *Pricing → Plans tarifaires*
	 *
	 * - **Field Type**: Boolean
	 * - **Placeholder**: *None*
	 * - **Default Value**: false
	 * - **API ID Path**: pricing.plans[].is_featured
	 * - **Documentation**: https://prismic.io/docs/fields/boolean
	 */
	is_featured: prismic.BooleanField;
}

/**
 * Item in *Pricing → Questions fréquentes*
 */
export interface PricingDocumentDataFaqItem {
	/**
	 * Question field in *Pricing → Questions fréquentes*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: pricing.faq[].question
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	question: prismic.KeyTextField;
	
	/**
	 * Réponse field in *Pricing → Questions fréquentes*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: pricing.faq[].reponse
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	reponse: prismic.KeyTextField;
}

/**
 * Content for Pricing documents
 */
interface PricingDocumentData {
	/**
	 * Title field in *Pricing*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Nos tarifs
	 * - **API ID Path**: pricing.title
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	title: prismic.KeyTextField;
	
	/**
	 * Description field in *Pricing*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: pricing.description
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	description: prismic.RichTextField;
	
	/**
	 * Méthode — Sous-titre field in *Pricing*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: pricing.methode_intro
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	methode_intro: prismic.KeyTextField;
	
	/**
	 * Étapes (Comment je travaille) field in *Pricing*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: pricing.etapes[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	etapes: prismic.GroupField<Simplify<PricingDocumentDataEtapesItem>>;
	
	/**
	 * Balades collectives — Titre field in *Pricing*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: pricing.balades_titre
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	balades_titre: prismic.KeyTextField;
	
	/**
	 * Balades collectives — Texte field in *Pricing*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: pricing.balades_texte
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	balades_texte: prismic.KeyTextField;
	
	/**
	 * Plans tarifaires field in *Pricing*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: pricing.plans[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	plans: prismic.GroupField<Simplify<PricingDocumentDataPlansItem>>;
	
	/**
	 * Tarifs — Note de bas de page field in *Pricing*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: pricing.tarifs_note
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	tarifs_note: prismic.KeyTextField;
	
	/**
	 * CTA — Titre field in *Pricing*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: pricing.cta_titre
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	cta_titre: prismic.KeyTextField;
	
	/**
	 * CTA — Texte field in *Pricing*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: pricing.cta_texte
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	cta_texte: prismic.KeyTextField;
	
	/**
	 * CTA — Libellé du bouton field in *Pricing*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: pricing.cta_bouton
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	cta_bouton: prismic.KeyTextField;/**
	 * Questions fréquentes field in *Pricing*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: pricing.faq[]
	 * - **Tab**: Q&A
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	faq: prismic.GroupField<Simplify<PricingDocumentDataFaqItem>>;/**
	 * Meta Title field in *Pricing*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: pricing.meta_title
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_title: prismic.KeyTextField;
	
	/**
	 * Meta Description field in *Pricing*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: pricing.meta_description
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_description: prismic.KeyTextField;
}

/**
 * Pricing document from Prismic
 *
 * - **API ID**: `pricing`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type PricingDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<Simplify<PricingDocumentData>, "pricing", Lang>;

/**
 * Item in *Race → FAQ*
 */
export interface RaceDocumentDataFaqItem {
	/**
	 * Question field in *Race → FAQ*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: race.faq[].question
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	question: prismic.KeyTextField;
	
	/**
	 * Réponse field in *Race → FAQ*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: race.faq[].reponse
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	reponse: prismic.RichTextField;
}

/**
 * Content for Race documents
 */
interface RaceDocumentData {
	/**
	 * Nom de la race field in *Race*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: race.nom
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	nom: prismic.KeyTextField;
	
	/**
	 * Photo field in *Race*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: race.photo
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	photo: prismic.ImageField<never>;
	
	/**
	 * Description field in *Race*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: race.description
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	description: prismic.RichTextField;
	
	/**
	 * FAQ field in *Race*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: race.faq[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	faq: prismic.GroupField<Simplify<RaceDocumentDataFaqItem>>;/**
	 * Meta Title field in *Race*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A title of the page used for social media and search engines
	 * - **API ID Path**: race.meta_title
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_title: prismic.KeyTextField;
	
	/**
	 * Meta Description field in *Race*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A brief summary of the page
	 * - **API ID Path**: race.meta_description
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_description: prismic.KeyTextField;
	
	/**
	 * Meta Image field in *Race*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: race.meta_image
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	meta_image: prismic.ImageField<never>;
}

/**
 * Race document from Prismic
 *
 * - **API ID**: `race`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type RaceDocument<Lang extends string = string> = prismic.PrismicDocumentWithUID<Simplify<RaceDocumentData>, "race", Lang>;

/**
 * Item in *Recommandations → Avis clients*
 */
export interface RecommandationsDocumentDataReviewsItem {
	/**
	 * Nom du client field in *Recommandations → Avis clients*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: recommandations.reviews[].name
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	name: prismic.KeyTextField;
	
	/**
	 * Nom du chien (optionnel) field in *Recommandations → Avis clients*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: recommandations.reviews[].dog_name
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	dog_name: prismic.KeyTextField;
	
	/**
	 * Date (affichage) field in *Recommandations → Avis clients*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Mars 2026
	 * - **API ID Path**: recommandations.reviews[].date
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	date: prismic.KeyTextField;
	
	/**
	 * Date (tri AAAA-MM) field in *Recommandations → Avis clients*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: 2026-03
	 * - **API ID Path**: recommandations.reviews[].sort_date
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	sort_date: prismic.KeyTextField;
	
	/**
	 * Texte de l'avis field in *Recommandations → Avis clients*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: recommandations.reviews[].text
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	text: prismic.RichTextField;
	
	/**
	 * Réponse de Marie-Anne (optionnel) field in *Recommandations → Avis clients*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: recommandations.reviews[].response
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	response: prismic.RichTextField;
}

/**
 * Content for Recommandations documents
 */
interface RecommandationsDocumentData {
	/**
	 * Lien Google (bouton Lire sur Google) field in *Recommandations*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: recommandations.google_url
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	google_url: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
	
	/**
	 * Avis clients field in *Recommandations*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: recommandations.reviews[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	reviews: prismic.GroupField<Simplify<RecommandationsDocumentDataReviewsItem>>;/**
	 * Meta Title field in *Recommandations*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: recommandations.meta_title
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_title: prismic.KeyTextField;
	
	/**
	 * Meta Description field in *Recommandations*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: recommandations.meta_description
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_description: prismic.KeyTextField;
}

/**
 * Recommandations document from Prismic
 *
 * - **API ID**: `recommandations`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type RecommandationsDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<Simplify<RecommandationsDocumentData>, "recommandations", Lang>;

/**
 * Content for Reservation documents
 */
interface ReservationDocumentData {
	/**
	 * Page Title field in *Reservation*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Réserver un cours d'essai
	 * - **API ID Path**: reservation.title
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	title: prismic.KeyTextField;
	
	/**
	 * Subtitle field in *Reservation*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Prêt à commencer l'aventure ? Contactez-moi pour réserver votre premier cours.
	 * - **API ID Path**: reservation.subtitle
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	subtitle: prismic.KeyTextField;
	
	/**
	 * Contact Section Title field in *Reservation*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Contactez-moi
	 * - **API ID Path**: reservation.contact_section_title
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	contact_section_title: prismic.KeyTextField;
	
	/**
	 * Contact Section Description field in *Reservation*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Pour réserver votre cours d'essai ou pour toute question, n'hésitez pas à me contacter directement.
	 * - **API ID Path**: reservation.contact_section_description
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	contact_section_description: prismic.KeyTextField;
	
	/**
	 * Email field in *Reservation*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: contact@education-honnete.fr
	 * - **API ID Path**: reservation.email
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	email: prismic.KeyTextField;
	
	/**
	 * Phone field in *Reservation*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: 06 12 34 56 78
	 * - **API ID Path**: reservation.phone
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	phone: prismic.KeyTextField;
	
	/**
	 * Footer Message field in *Reservation*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Je vous répondrai dans les plus brefs délais pour convenir d'un rendez-vous qui vous convient.
	 * - **API ID Path**: reservation.footer_message
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	footer_message: prismic.KeyTextField;/**
	 * Meta Title field in *Reservation*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: reservation.meta_title
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_title: prismic.KeyTextField;
	
	/**
	 * Meta Description field in *Reservation*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: reservation.meta_description
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_description: prismic.KeyTextField;
}

/**
 * Reservation document from Prismic
 *
 * - **API ID**: `reservation`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type ReservationDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<Simplify<ReservationDocumentData>, "reservation", Lang>;

export type AllDocumentTypes = AboutDocument | BlogPostDocument | CaseStudiesPageDocument | CaseStudyDocument | CityPageDocument | HomepageDocument | LayoutDocument | PricingDocument | RaceDocument | RecommandationsDocument | ReservationDocument;

/**
 * Primary content in *Content → Default → Primary*
 */
export interface ContentSliceDefaultPrimary {
	/**
	 * Title field in *Content → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: content.default.primary.title
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	title: prismic.KeyTextField;
	
	/**
	 * Image field in *Content → Default → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: content.default.primary.image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	image: prismic.ImageField<never>;
	
	/**
	 * Body field in *Content → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: content.default.primary.body
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	body: prismic.RichTextField;
}

/**
 * Default variation for Content Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type ContentSliceDefault = prismic.SharedSliceVariation<"default", Simplify<ContentSliceDefaultPrimary>, never>;

/**
 * Slice variation for *Content*
 */
type ContentSliceVariation = ContentSliceDefault

/**
 * Content Shared Slice
 *
 * - **API ID**: `content`
 * - **Description**: Content
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type ContentSlice = prismic.SharedSlice<"content", ContentSliceVariation>;

/**
 * Primary content in *CTA → Default → Primary*
 */
export interface CtaSliceDefaultPrimary {
	/**
	 * Title field in *CTA → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: cta.default.primary.title
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	title: prismic.KeyTextField;
	
	/**
	 * Description field in *CTA → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: cta.default.primary.description
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	description: prismic.RichTextField;
	
	/**
	 * Button Label field in *CTA → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: cta.default.primary.button_label
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	button_label: prismic.KeyTextField;
	
	/**
	 * Button Link field in *CTA → Default → Primary*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: cta.default.primary.button_link
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	button_link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
}

/**
 * Default variation for CTA Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type CtaSliceDefault = prismic.SharedSliceVariation<"default", Simplify<CtaSliceDefaultPrimary>, never>;

/**
 * Slice variation for *CTA*
 */
type CtaSliceVariation = CtaSliceDefault

/**
 * CTA Shared Slice
 *
 * - **API ID**: `cta`
 * - **Description**: Call to Action
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type CtaSlice = prismic.SharedSlice<"cta", CtaSliceVariation>;

/**
 * Primary content in *EducatorPresentation → Default → Primary*
 */
export interface EducatorPresentationSliceDefaultPrimary {
	/**
	 * Educator Image field in *EducatorPresentation → Default → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: educator_presentation.default.primary.educator_image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	educator_image: prismic.ImageField<never>;
	
	/**
	 * Eyebrow field in *EducatorPresentation → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: e.g., Votre Éducatrice
	 * - **API ID Path**: educator_presentation.default.primary.eyebrow
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	eyebrow: prismic.KeyTextField;
	
	/**
	 * Name field in *EducatorPresentation → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: educator_presentation.default.primary.name
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	name: prismic.RichTextField;
	
	/**
	 * Description field in *EducatorPresentation → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: educator_presentation.default.primary.description
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	description: prismic.RichTextField;
	
	/**
	 * Locations field in *EducatorPresentation → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: e.g., Secteur Lavaltrie, Repentigny, L'Assomption...
	 * - **API ID Path**: educator_presentation.default.primary.locations
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	locations: prismic.KeyTextField;
	
	/**
	 * Google Reviews Label field in *EducatorPresentation → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: e.g., Voir mes avis Google
	 * - **API ID Path**: educator_presentation.default.primary.google_reviews_label
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	google_reviews_label: prismic.KeyTextField;
	
	/**
	 * Google Reviews Link field in *EducatorPresentation → Default → Primary*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: educator_presentation.default.primary.google_reviews_link
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	google_reviews_link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
}

/**
 * Primary content in *EducatorPresentation → Items*
 */
export interface EducatorPresentationSliceDefaultItem {
	/**
	 * Figure field in *EducatorPresentation → Items*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: e.g., 100+
	 * - **API ID Path**: educator_presentation.items[].figure
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	figure: prismic.KeyTextField;
	
	/**
	 * Label field in *EducatorPresentation → Items*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: e.g., Chiens accompagnés
	 * - **API ID Path**: educator_presentation.items[].label
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	label: prismic.KeyTextField;
}

/**
 * Default variation for EducatorPresentation Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type EducatorPresentationSliceDefault = prismic.SharedSliceVariation<"default", Simplify<EducatorPresentationSliceDefaultPrimary>, Simplify<EducatorPresentationSliceDefaultItem>>;

/**
 * Slice variation for *EducatorPresentation*
 */
type EducatorPresentationSliceVariation = EducatorPresentationSliceDefault

/**
 * EducatorPresentation Shared Slice
 *
 * - **API ID**: `educator_presentation`
 * - **Description**: EducatorPresentation
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type EducatorPresentationSlice = prismic.SharedSlice<"educator_presentation", EducatorPresentationSliceVariation>;

/**
 * Primary content in *FaqSection → Default → Primary*
 */
export interface FaqSectionSliceDefaultPrimary {
	/**
	 * Titre de la section field in *FaqSection → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Questions fréquentes
	 * - **API ID Path**: faq_section.default.primary.titre
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	titre: prismic.KeyTextField;
}

/**
 * Primary content in *FaqSection → Items*
 */
export interface FaqSectionSliceDefaultItem {
	/**
	 * Question field in *FaqSection → Items*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: faq_section.items[].question
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	question: prismic.KeyTextField;
	
	/**
	 * Réponse field in *FaqSection → Items*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: faq_section.items[].reponse
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	reponse: prismic.KeyTextField;
}

/**
 * Default variation for FaqSection Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type FaqSectionSliceDefault = prismic.SharedSliceVariation<"default", Simplify<FaqSectionSliceDefaultPrimary>, Simplify<FaqSectionSliceDefaultItem>>;

/**
 * Slice variation for *FaqSection*
 */
type FaqSectionSliceVariation = FaqSectionSliceDefault

/**
 * FaqSection Shared Slice
 *
 * - **API ID**: `faq_section`
 * - **Description**: Section de questions fréquentes avec accordéon
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type FaqSectionSlice = prismic.SharedSlice<"faq_section", FaqSectionSliceVariation>;

/**
 * Primary content in *Featured Case Studies → Default → Primary*
 */
export interface FeaturedCaseStudiesSliceDefaultPrimary {
	/**
	 * Section Title field in *Featured Case Studies → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Featured Case Studies
	 * - **API ID Path**: featured_case_studies.default.primary.title
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	title: prismic.KeyTextField;
}

/**
 * Primary content in *Featured Case Studies → Items*
 */
export interface FeaturedCaseStudiesSliceDefaultItem {
	/**
	 * Case Study field in *Featured Case Studies → Items*
	 *
	 * - **Field Type**: Content Relationship
	 * - **Placeholder**: *None*
	 * - **API ID Path**: featured_case_studies.items[].case_study
	 * - **Documentation**: https://prismic.io/docs/fields/content-relationship
	 */
	case_study: prismic.ContentRelationshipField<"case_study">;
}

/**
 * Default variation for Featured Case Studies Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type FeaturedCaseStudiesSliceDefault = prismic.SharedSliceVariation<"default", Simplify<FeaturedCaseStudiesSliceDefaultPrimary>, Simplify<FeaturedCaseStudiesSliceDefaultItem>>;

/**
 * Slice variation for *Featured Case Studies*
 */
type FeaturedCaseStudiesSliceVariation = FeaturedCaseStudiesSliceDefault

/**
 * Featured Case Studies Shared Slice
 *
 * - **API ID**: `featured_case_studies`
 * - **Description**: Showcase featured case studies
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type FeaturedCaseStudiesSlice = prismic.SharedSlice<"featured_case_studies", FeaturedCaseStudiesSliceVariation>;

/**
 * Primary content in *Hero → Default → Primary*
 */
export interface HeroSliceDefaultPrimary {
	/**
	 * Title field in *Hero → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hero.default.primary.title
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	title: prismic.RichTextField;
	
	/**
	 * Description field in *Hero → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hero.default.primary.description
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	description: prismic.RichTextField;
	
	/**
	 * Primary CTA Label field in *Hero → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hero.default.primary.primary_cta_label
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	primary_cta_label: prismic.KeyTextField;
	
	/**
	 * Primary CTA Link field in *Hero → Default → Primary*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hero.default.primary.primary_cta_link
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	primary_cta_link: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
	
	/**
	 * Background Image field in *Hero → Default → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: hero.default.primary.background_image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	background_image: prismic.ImageField<never>;
}

/**
 * Default variation for Hero Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type HeroSliceDefault = prismic.SharedSliceVariation<"default", Simplify<HeroSliceDefaultPrimary>, never>;

/**
 * Slice variation for *Hero*
 */
type HeroSliceVariation = HeroSliceDefault

/**
 * Hero Shared Slice
 *
 * - **API ID**: `hero`
 * - **Description**: Hero
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type HeroSlice = prismic.SharedSlice<"hero", HeroSliceVariation>;

/**
 * Primary content in *Image Text → Default → Primary*
 */
export interface ImageTextSliceDefaultPrimary {
	/**
	 * Image field in *Image Text → Default → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: image_text.default.primary.image
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	image: prismic.ImageField<never>;
	
	/**
	 * Text field in *Image Text → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: *None*
	 * - **API ID Path**: image_text.default.primary.text
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	text: prismic.RichTextField;
}

/**
 * Default variation for Image Text Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type ImageTextSliceDefault = prismic.SharedSliceVariation<"default", Simplify<ImageTextSliceDefaultPrimary>, never>;

/**
 * Slice variation for *Image Text*
 */
type ImageTextSliceVariation = ImageTextSliceDefault

/**
 * Image Text Shared Slice
 *
 * - **API ID**: `image_text`
 * - **Description**: Image with Text
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type ImageTextSlice = prismic.SharedSlice<"image_text", ImageTextSliceVariation>;

/**
 * Primary content in *Video Embed → Default → Primary*
 */
export interface VideoEmbedSliceDefaultPrimary {
	/**
	 * Embed field in *Video Embed → Default → Primary*
	 *
	 * - **Field Type**: Embed
	 * - **Placeholder**: *None*
	 * - **API ID Path**: video_embed.default.primary.embed
	 * - **Documentation**: https://prismic.io/docs/fields/embed
	 */
	embed: prismic.EmbedField
}

/**
 * Default variation for Video Embed Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type VideoEmbedSliceDefault = prismic.SharedSliceVariation<"default", Simplify<VideoEmbedSliceDefaultPrimary>, never>;

/**
 * Slice variation for *Video Embed*
 */
type VideoEmbedSliceVariation = VideoEmbedSliceDefault

/**
 * Video Embed Shared Slice
 *
 * - **API ID**: `video_embed`
 * - **Description**: Video Embed
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type VideoEmbedSlice = prismic.SharedSlice<"video_embed", VideoEmbedSliceVariation>;

declare module "@prismicio/client" {
	interface CreateClient {
		(repositoryNameOrEndpoint: string, options?: prismic.ClientConfig): prismic.Client<AllDocumentTypes>;
	}
	
	interface CreateWriteClient {
		(repositoryNameOrEndpoint: string, options: prismic.WriteClientConfig): prismic.WriteClient<AllDocumentTypes>;
	}
	
	interface CreateMigration {
		(): prismic.Migration<AllDocumentTypes>;
	}
	
	namespace Content {
		export type {
			AboutDocument,
			AboutDocumentData,
			AboutDocumentDataValeursItem,
			AboutDocumentDataCredentialsItem,
			BlogPostDocument,
			BlogPostDocumentData,
			BlogPostDocumentDataSlicesSlice,
			BlogPostDocumentDataTagsItem,
			BlogPostDocumentDataRelatedCaseStudiesItem,
			CaseStudiesPageDocument,
			CaseStudiesPageDocumentData,
			CaseStudyDocument,
			CaseStudyDocumentData,
			CaseStudyDocumentDataPhotoCarouselItem,
			CaseStudyDocumentDataVideoCarouselItem,
			CityPageDocument,
			CityPageDocumentData,
			CityPageDocumentDataSlicesSlice,
			HomepageDocument,
			HomepageDocumentData,
			HomepageDocumentDataSlicesSlice,
			LayoutDocument,
			LayoutDocumentData,
			LayoutDocumentDataNavigationLinksItem,
			PricingDocument,
			PricingDocumentData,
			PricingDocumentDataEtapesItem,
			PricingDocumentDataPlansItem,
			PricingDocumentDataFaqItem,
			RaceDocument,
			RaceDocumentData,
			RaceDocumentDataFaqItem,
			RecommandationsDocument,
			RecommandationsDocumentData,
			RecommandationsDocumentDataReviewsItem,
			ReservationDocument,
			ReservationDocumentData,
			AllDocumentTypes,
			ContentSlice,
			ContentSliceDefaultPrimary,
			ContentSliceVariation,
			ContentSliceDefault,
			CtaSlice,
			CtaSliceDefaultPrimary,
			CtaSliceVariation,
			CtaSliceDefault,
			EducatorPresentationSlice,
			EducatorPresentationSliceDefaultPrimary,
			EducatorPresentationSliceDefaultItem,
			EducatorPresentationSliceVariation,
			EducatorPresentationSliceDefault,
			FaqSectionSlice,
			FaqSectionSliceDefaultPrimary,
			FaqSectionSliceDefaultItem,
			FaqSectionSliceVariation,
			FaqSectionSliceDefault,
			FeaturedCaseStudiesSlice,
			FeaturedCaseStudiesSliceDefaultPrimary,
			FeaturedCaseStudiesSliceDefaultItem,
			FeaturedCaseStudiesSliceVariation,
			FeaturedCaseStudiesSliceDefault,
			HeroSlice,
			HeroSliceDefaultPrimary,
			HeroSliceVariation,
			HeroSliceDefault,
			ImageTextSlice,
			ImageTextSliceDefaultPrimary,
			ImageTextSliceVariation,
			ImageTextSliceDefault,
			VideoEmbedSlice,
			VideoEmbedSliceDefaultPrimary,
			VideoEmbedSliceVariation,
			VideoEmbedSliceDefault
		}
	}
}