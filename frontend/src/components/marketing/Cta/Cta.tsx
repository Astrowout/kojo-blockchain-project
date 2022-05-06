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
			<div className='max-w-screen-lg bg-gradient-to-tl from-emerald-800 to-emerald-600 shadow-2xl shadow-emerald-600/50 mx-auto px-6 sm:px-20 py-10 sm:py-16 flex flex-col space-y-8 rounded-2xl items-center'>
				<h2 className="font-serif mt-6 text-center text-white text-3xl leading-tight md:text-4xl md:leading-tight lg:text-5xl lg:leading-tight">
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
		</section>
	)
}

export default Token;
