import { FunctionComponent, useState } from "react";
import cn from "classnames";
import { motion } from "framer-motion";
import Image from "next/image";

import { HowProps } from "./How.types";

import { useTranslation } from "@/hooks";

const How: FunctionComponent<HowProps> = ({ className }) => {
	const { t } = useTranslation();
	const [activeIndex, setActiveIndex] = useState(0);

	const CONTENT = [
		{
			title: 'Track your water consumption',
			description: `Connect your crypto wallet and water meter to the Kojo Network and start receiving rewards. Using IoT and blockchain technology you can allow Kojo to track your water consumption in a transparent and self sovereign fashion. By comparing your usage against the local average at your neighbourhood, Kojo calculates a monthly claimable reward of $KOJO's that you can spend on growing various digital plants.`,
			image: '/assets/images/1-1.png',
		},
		{
			title: 'Harvest the benefits',
			description: `By reducing your personal water usage, not only will the fee on your monthy water bill be reduced, Kojo also rewards you with $KOJO's which can be staked, spend or traded. In case you choose to spend your $KOJO, you can grow seeds into plants to raise your monthly rewards even more!`,
			image: '/assets/images/1-3.png',
		},
		{
			title: 'Care for the planet',
			description: 'By aiming to use less water than the people in your neighbourhood, you lower the regional average which results in a chain reaction of less water use throughout the neighbourhood. Start growing your virtual garden, while caring for a real planet!',
			image: '/assets/images/1-5.png',
		},
	];

	return (
		<section className={cn(className, "bg-background flex flex-col")}>
			<div className='w-full max-w-screen-xl mx-auto grid md:grid-cols-2 gap-x-16 xl:gap-x-24 gap-y-12 px-6 sm:px-10 py-10 sm:py-16'>
				<div className="h-64 hidden md:flex md:h-screen md:sticky md:top-36">
					{CONTENT.map((step, index) => (
						<motion.div
							animate={{
								opacity: index === activeIndex ? 1 : 0,
								y: index === activeIndex ? 0 : 30,
							}}
							transition={{
								y: {
									type: 'spring',
									// bounce: 0.8,
									duration: 1
								}
							}}
							key={index}
							className="rounded-md overflow-hidden absolute inset-x-0 inset-y-36"
						>
							<div className="md:w-[30vw] bg-black md:h-[30vw] max-w-[34rem] rounded-md bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${step.image})` }}></div>
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
								<div className="md:hidden relative rounded-md overflow-hidden">
									<div className="w-[90vw] bg-black h-[90vw] rounded-md bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${step.image})` }}></div>

								</div>

								<h1 className="hidden md:block mt-4 font-title uppercase tracking-widest">
									{ `${t("how.title")} - Step ${index + 1}` }
								</h1>

								<h2 className="font-display uppercase mt-10 text-3xl leading-tight md:text-4xl md:leading-tight xl:text-5xl xl:leading-tight">
									{ step.title }
								</h2>

								<p className="font-text leading-8  mt-6 text-sm">
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
