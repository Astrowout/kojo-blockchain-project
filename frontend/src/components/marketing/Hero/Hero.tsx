import { FunctionComponent } from "react";
import cn from "classnames";

import { HeroProps } from "./Hero.types";

import { useTranslation } from "@/hooks";
import {
	Button,
	Link,
	Image,
} from "@/components";

import heroImage from "@/assets/img/hero.png";

const Hero: FunctionComponent<HeroProps> = ({ className }) => {
	const { t } = useTranslation();

	return (
		<section className={cn(className, "")}>
			<div className='max-w-screen-xl mx-auto flex flex-col md:flex-row items-center gap-x-24 gap-y-12 px-6 sm:px-10 py-10 sm:py-16'>
				<div>
					<h1 className="font-serif text-center md:text-left text-emerald-900 text-4xl leading-tight md:text-5xl md:leading-tight xl:text-6xl xl:leading-tight">
						{ t("hero.title.1", <span className="bg-emerald-100 px-1.5">{t("hero.title.2")}</span>) }
					</h1>

					<div className="flex flex-col md:flex-row items-center mt-8 md:mt-10 gap-x-8 gap-y-5">
						<Button
							url="#"
							compact
						>
							{ t("navigation.download") }
						</Button>

						<Link
							url="/"
						>
							{ t("navigation.browser") }
						</Link>
					</div>
				</div>

				<Image
					src={heroImage}
					priority
					alt="Water management for plants"
				/>
			</div>
		</section>
	)
}

export default Hero;
