import { FunctionComponent, useState } from "react";
import cn from "classnames";
import { motion } from "framer-motion";
import Image from "next/image";

import { HowProps } from "./How.types";

import { useTranslation } from "@/hooks";

import how1Image from "@/assets/img/how1.jpg";
import how2Image from "@/assets/img/how2.jpg";
import how3Image from "@/assets/img/how3.jpg";

const How: FunctionComponent<HowProps> = ({ className }) => {
	const { t } = useTranslation();
	const [activeIndex, setActiveIndex] = useState(0);

	const CONTENT = [
		{
			title: t("how.1.title"),
			description: t("how.1.description"),
			image: how1Image,
		},
		{
			title: t("how.2.title"),
			description: t("how.2.description"),
			image: how2Image,
		},
		{
			title: t("how.3.title"),
			description: t("how.3.description"),
			image: how3Image,
		},
	];

	return (
		<section className={cn(className, "bg-emerald-50 flex flex-col")}>
			<div className='w-full max-w-screen-xl mx-auto grid md:grid-cols-2 gap-x-16 xl:gap-x-24 gap-y-12 px-6 sm:px-10 py-10 sm:py-16'>
				<div className="h-64 hidden md:flex md:h-screen md:sticky md:top-0">
					{CONTENT.map((step, index) => (
						<motion.div
							animate={{
								opacity: index === activeIndex ? 1 : 0,
								y: index === activeIndex ? 0 : 30,
							}}
							transition={{
								y: {
									type: 'spring',
									bounce: 0.8,
									duration: 1
								}
							}}
							key={index}
							className="rounded-2xl overflow-hidden shadow-2xl absolute inset-x-0 inset-y-36"
						>
							<Image
								src={step.image}
								layout="fill"
								priority={index === 0}
								alt="Water management for plants"
								className="object-cover hidden md:block"
							/>
						</motion.div>
					))}
				</div>


				<div className="flex flex-col space-y-12 md:space-y-0">
					{CONTENT.map((step, index) => (
						<div
							key={index}
							className="md:h-screen flex flex-col justify-center"
						>
							<motion.div
								onViewportEnter={() => setActiveIndex(index)}
								whileInView={{
									opacity: 1,
								}}
								viewport={{
									amount: 0.6,
								}}
								key={index}
							>
								<div className="md:hidden relative rounded-2xl overflow-hidden shadow-2xl h-56">
									<Image
										src={step.image}
										layout="fill"
										alt="Water management for plants"
										className="object-cover"
									/>
								</div>

								<h1 className="hidden md:block font-sans mt-4 font-semibold text-emerald-600 uppercase tracking-wider">
									{ t("how.title") }
								</h1>

								<h2 className="font-serif mt-10 text-emerald-900 text-3xl leading-tight md:text-4xl md:leading-tight xl:text-5xl xl:leading-tight">
									{ step.title }
								</h2>

								<p className="font-sans mt-4 text-gray-400">
									{ step.description }
								</p>
							</motion.div>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}

export default How;
