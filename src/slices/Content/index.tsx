import { FC } from "react";
import type { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Content`.
 */
export type ContentProps = SliceComponentProps<Content.ContentSlice>;

/**
 * Component for "Content" Slices.
 */
const Content: FC<ContentProps> = ({ slice }) => {
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

export default Content