import { FC } from "react";
import type { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `EducatorPresentation`.
 */
export type EducatorPresentationProps = SliceComponentProps<Content.EducatorPresentationSlice>;

/**
 * Component for "EducatorPresentation" Slices.
 */
const EducatorPresentation: FC<EducatorPresentationProps> = ({ slice }) => {
	return (
		<section
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
		>
			Placeholder component for {slice.slice_type} (variation: {slice.variation}) slices.
			<br />
			<strong>You can edit this slice directly in your code editor.</strong>
		</section>
	)
};

export default EducatorPresentation