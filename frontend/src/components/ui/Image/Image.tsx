import NextImage, { ImageProps } from "next/image";
import { FunctionComponent } from "react";

const customLoader = ({ src }: { src: string }) => {
 	return src;
}

const Image: FunctionComponent<ImageProps> = (props) => {
	return (
		<NextImage
			{...props}
			unoptimized
			loader={customLoader}
		/>
	);
}

export default Image;
