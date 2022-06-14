import { FunctionComponent } from "react";
import cn from "classnames";
import Image from "next/image";

import { HeroProps } from "./Hero.types";

import { useTranslation } from "@/hooks";
import {
	Button,
	Link,
} from "@/components";

const Hero: FunctionComponent<HeroProps> = ({ className }) => {
	const { t } = useTranslation();

	return (
		<section className={cn(className, "")}>
			<div className='max-w-screen-xl mx-auto flex flex-col items-center gap-x-24 gap-y-12 px-6 sm:px-10 sm:py-16 justify-center min-h-[60vh] my-10  max-w-[100vw] overflow-hidden'>

				<div className="flex">
				<div className="w-[60vw] h-[60vw] md:w-56 md:h-56 rounded-md bg-black bg-cover bg-center bg-no-repeat mx-2" style={{ backgroundImage: `url(/assets/images/1-1.png)` }} />
				<div className="w-[60vw] h-[60vw] md:w-56 md:h-56 rounded-md bg-black bg-cover bg-center bg-no-repeat mx-2" style={{ backgroundImage: `url(/assets/images/1-2.png)` }} />
				<div className="w-[60vw] h-[60vw] md:w-56 md:h-56 rounded-md bg-black bg-cover bg-center bg-no-repeat mx-2" style={{ backgroundImage: `url(/assets/images/1-3.png)` }} />
				<div className="w-[60vw] h-[60vw] md:w-56 md:h-56 rounded-md bg-black bg-cover bg-center bg-no-repeat mx-2" style={{ backgroundImage: `url(/assets/images/1-4.png)` }} />
				<div className="w-[60vw] h-[60vw] md:w-56 md:h-56 rounded-md bg-black bg-cover bg-center bg-no-repeat mx-2" style={{ backgroundImage: `url(/assets/images/1-5.png)` }} />
				</div>

				<div className="flex flex-col items-center mt-5">
					<h1 className="font-serif text-center font-display uppercase text-4xl leading-tight md:text-5xl md:leading-tight xl:text-6xl xl:leading-tight max-w-[80rem]">
						{ t("hero.title.1") }
					</h1>

					<p className="font-text text-center text-xs leading-6 mt-4">
The Kojo project raises awareness about water consumption by developing gamified ways to encourage people to reduce global water consumption.
</p>

					<div className="flex flex-col md:flex-row items-center mt-8 md:mt-10 gap-x-8 gap-y-5">
						<Button
							url={process.env.NEXT_PUBLIC_DOWNLOAD_URL}
							compact
							external
						>
							{ t("navigation.download") }
						</Button>

						<Link
							url={process.env.NEXT_PUBLIC_APP_URL}
						>
							{ t("navigation.browser") }
						</Link>
					</div>
				</div>

				{/* <Image
					src={heroImage}
					priority
					alt="Water management for plants"
				/> */}
			</div>
		</section>
	)
}

export default Hero;
