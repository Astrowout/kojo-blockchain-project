import { FC } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

import { FullscreenImageProps } from "./FullscreenImage.types";

const FullscreenImage: FC<FullscreenImageProps> = ({
	image = "",
	alt = "",
	close = () => null,
}) => {
	return createPortal((
		<div
			className="fixed inset-0 overflow-hidden z-50 cursor-zoom-out flex items-center justify-center"
			onClick={close}
		>
			<motion.div
				transition={{
					type: "tween",
					duration: 0.4,
					ease: "easeOut",
				}}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				className="absolute inset-0 bg-black/90 backdrop-blur"
			></motion.div>

			<motion.div
				transition={{
					type: "tween",
					duration: 0.4,
					ease: "anticipate",
				}}
				layoutId="fullscreen-image"
				className="relative max-h-screen max-w-screen aspect-square shadow-2xl"
			>
				<img
					src={image}
					alt={alt}
					className="w-full h-full object-cover bg-white"
				/>
			</motion.div>
		</div>
	), document.body);
}

export default FullscreenImage;
