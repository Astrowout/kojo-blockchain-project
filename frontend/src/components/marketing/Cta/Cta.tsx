import { FunctionComponent } from "react";
import cn from "classnames";

import { CtaProps } from "./Cta.types";

import { useTranslation } from "@/hooks";
import {
	Button,
} from "@/components";

const Token: FunctionComponent<CtaProps> = ({ className }) => {
	const { t } = useTranslation();

	return (
		<section className={cn(className, "relative z-10 px-6 sm:px-10")}>
			<div className='relative max-w-screen-lg bg-gradient-to-tl from-emerald-800 to-emerald-600 shadow-2xl shadow-emerald-600/50 mx-auto px-6 sm:px-20 py-10 sm:py-16 rounded-2xl'>
				<svg className="absolute left-0 bottom-0 w-1/5 z-0 opacity-30" viewBox="0 0 165 229" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M52.9431 145.096C-15.8787 143.584 -22.9886 91.0983 -36.0879 60.5144C41.1739 53.9486 53.4268 123.073 52.9431 145.096Z" stroke="#DFECE6" strokeWidth="16.3714"/>
					<path d="M53.6912 135.068C53.6912 53.2884 115.844 43.4748 151.827 27.1189C161.64 118.712 79.8606 135.068 53.6912 135.068Z" stroke="#DFECE6" strokeWidth="16.3714"/>
					<path d="M58.3628 138.339C138.815 153.014 137.316 215.918 146.949 254.252C55.0819 247.47 53.6667 164.083 58.3628 138.339Z" stroke="#DFECE6" strokeWidth="16.3714"/>
				</svg>

				<div className="mt-6 space-y-8 flex flex-col items-center relative z-10">
					<h2 className="font-serif text-center text-white text-3xl leading-tight md:text-4xl md:leading-tight lg:text-5xl lg:leading-tight">
						{ t("cta.title") }
					</h2>

					<Button
						icon="ArrowRight"
						iconAfter
						url="#"
						alt
					>
						{ t("cta.label") }
					</Button>
				</div>
			</div>
		</section>
	)
}

export default Token;
