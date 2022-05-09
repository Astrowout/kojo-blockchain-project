import { FunctionComponent, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import cn from "classnames";
import debounce from "lodash/debounce";

import { HowProps } from "./How.types";

import { useTranslation } from "@/hooks";
import {
	Image,
} from "@/components";

import how1Image from "@/assets/img/how1.jpg";
import how2Image from "@/assets/img/how2.jpg";
import how3Image from "@/assets/img/how3.jpg";
import how4Image from "@/assets/img/how4.jpg";

gsap.registerPlugin(ScrollTrigger);

const How: FunctionComponent<HowProps> = ({ className }) => {
	const { t } = useTranslation();

	let tl: any = null;

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
		{
			title: t("how.4.title"),
			description: t("how.4.description"),
			image: how4Image,
		},
	];

	useEffect(() => {
		if (tl) {
			tl.kill();
		}

		ScrollTrigger.matchMedia({
			"(min-width: 960px)": function() {
				tl = gsap.timeline({
					ease: "none",
					scrollTrigger: {
						trigger: ".js-container",
						pin: true,
						pinSpacing: true,
						start: "top top",
						end: "+=1200px",
						scrub: 0.5,
						invalidateOnRefresh: true,
						toggleActions: "play complete reverse reset",
					}
				});

				tl
					.set(".js-content:not(.js-content--0)", {
						autoAlpha: 0,
					})
					.set(".js-image:not(.js-image--0)", {
						autoAlpha: 0,
					})

					for (let i = 0; i < CONTENT.length; i++) {
						tl
							.to("js-image", {

							}, "+=0.5")
							.to(`.js-content--${i}`, {
								autoAlpha: 0,
								y: 30
							})
							.to(`.js-image--${i}`, {
								autoAlpha: 0,
							})
							.fromTo(`.js-content--${i + 1}`, {
								y: 30
							}, {
								autoAlpha: 1,
								y: 0
							})
							.to(`.js-image--${i + 1}`, {
								autoAlpha: 1,
							})
					}
			},
		});

		const debounceResize = debounce(() => {
			ScrollTrigger.refresh(true);
		}, 300)

		window.addEventListener("resize", debounceResize);

		return () => {
			if (tl) {
				tl.kill();
			}

			window.removeEventListener("resize", debounceResize);
		}
	}, []);


	return (
		<section className={cn(className, "js-container lg:mb-[1200px] bg-emerald-50 flex flex-col")}>
			<div className='w-full h-full max-w-screen-xl mx-auto grid lg:grid-cols-2 items-center lg:h-screen gap-x-24 gap-y-12 px-6 sm:px-10 py-10 sm:py-16'>
				<div className="relative flex h-64 lg:h-4/5">
					{CONTENT.map((step, index) => (
						<div
							key={index}
							className={cn(`js-image--${index}`, "js-image rounded-2xl overflow-hidden shadow-2xl lg:absolute inset-0")}
						>
							<Image
								src={step.image}
								layout="fill"
								alt="Water management for plants"
								className="object-cover"
							/>
						</div>
					))}
				</div>

				<div className="h-full flex flex-col justify-center">
					<h1 className="font-sans font-semibold text-emerald-600 uppercase tracking-wider">
						{ t("how.title") }
					</h1>
					<div className="relative">
						{CONTENT.map((step, index) => (
							<div
								key={index}
								className={cn(`js-content--${index}`, "js-content lg:absolute inset-0 space-y-4")}
							>
								<h2 className="mt-8 font-serif text-emerald-900 text-3xl leading-tight md:text-4xl md:leading-tight xl:text-5xl xl:leading-tight">
									{ step.title }
								</h2>
								<p className="font-sans text-gray-400">
									{ step.description }
								</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	)
}

export default How;
