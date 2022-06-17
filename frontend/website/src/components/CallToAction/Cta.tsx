import { FunctionComponent } from "react";
import cn from "classnames";

import { useTranslation } from "@/hooks";
import {
	Button,
	Link,
} from "@/components";

import heroImage from "@/assets/img/hero.png";

const CTA: FunctionComponent = ({ className }: any) => {
	const { t } = useTranslation();

	return (
		<section className={cn(className, "bg-kojo")}>
			<div className='max-w-screen-xl mx-auto flex flex-row items-center gap-x-24 gap-y-12 px-6 sm:px-10 sm:py-16 justify-center min-h-[60vh]'>


				<div className="hidden md:block md:w-[60rem] bg-black md:h-[30rem] rounded-md bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(/assets/images/1-5.png)` }}></div>


				<div className="flex flex-col items-center mt-5">
					<h1 className="font-serif text-center font-display uppercase leading-tight md:text-5xl md:leading-tight text-5xl mb-3 xl:leading-tight text-white">
						Start growing
					</h1>

					<p className="text-white font-text text-xs text-center leading-6">Thrilled to grow your first virtual plant?! Go ahead and buy your very first seed in our in-browser dApp. The mobile dApp version is on its way, sit tight!</p>

					<div className="flex flex-col md:flex-row items-center mt-8 md:mt-10 gap-x-8 gap-y-5">
						<Button
							url={process.env.NEXT_PUBLIC_APP_URL}
							compact
							className="bg-[#0A845C]"
						>
							{ t("navigation.download") }
						</Button>

						<Link
							url={process.env.NEXT_PUBLIC_DOWNLOAD_URL}
							external
							className='text-white'
						>
							{ t("navigation.browser") }
						</Link>
					</div>
				</div>


			</div>
		</section>
	)
}

export default CTA;
