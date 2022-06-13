import { FC } from "react";
import { motion } from "framer-motion";

import { FullscreenImageProps } from "./FullscreenImage.types";
import { useHistory } from "react-router";

const FullscreenImage: FC<FullscreenImageProps> = ({
	image = "",
	alt = "",
}) => {
	const history = useHistory();

	return (
		<div
			className="fixed inset-0 overflow-hidden z-50 cursor-zoom-out flex items-center justify-center"
			onClick={() => history.goBack()}
		>
			<motion.div
				transition={{
					type: "tween",
					duration: 0.3,
					ease: "easeOut",
				}}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				className="absolute inset-0 bg-black/90"
			></motion.div>

			<motion.div
				transition={{
					type: "tween",
					duration: 0.4,
					ease: "easeOut",
				}}
				initial={{
					opacity: 0,
					scale: 0.8,
				}}
				animate={{
					opacity: 1,
					scale: 1,
				}}
				exit={{
					opacity: 0,
				}}
				className="relative max-h-screen max-w-screen aspect-square shadow-2xl"
			>
				<img
					src={image}
					alt={alt}
					className="w-full h-full object-cover bg-white"
				/>
			</motion.div>
		</div>
	);
}

export default FullscreenImage;
