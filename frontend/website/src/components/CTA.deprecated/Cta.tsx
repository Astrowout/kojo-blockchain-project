import { FunctionComponent } from "react";
import cn from "classnames";

import { CtaProps } from "./Cta.types";

import { useTranslation } from "@/hooks";
import {
	Icon,
	Button,
} from "@/components";

const Token: FunctionComponent<CtaProps> = ({ className }) => {
	const { t } = useTranslation();

	return (
		<section className={cn(className, "relative z-10 px-6 sm:px-10")}>
			<div className='relative overflow-hidden max-w-screen-lg bg-gradient-to-tl from-emerald-800 to-emerald-600 shadow-2xl shadow-emerald-600/50 mx-auto px-6 sm:px-20 py-10 sm:py-16 rounded-2xl'>
				<Icon
					className="absolute text-emerald-600 left-0 bottom-0 w-2/4 h-auto -translate-x-1/4 translate-y-1/4 z-0"
					name="KojoToken"
				/>

				<div className="mt-6 space-y-8 flex flex-col items-center relative z-10">
					<h2 className="font-serif text-center text-white text-3xl leading-tight md:text-4xl md:leading-tight lg:text-5xl lg:leading-tight">
						{ t("cta.title") }
					</h2>

					<Button
						icon="ArrowRight"
						iconAfter
						url={process.env.NEXT_PUBLIC_APP_URL}
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
