import { FunctionComponent } from "react";
import cn from "classnames";
import Image from "next/image";

import { FooterProps } from "./Footer.types";
import { useTranslation } from "@/hooks";
import {
	Button,
	BottomBar,
} from "@/components";

import footerImage from "@/assets/img/footer.png"

const Footer: FunctionComponent<FooterProps> = ({
	className = "",
}) => {
	const { t } = useTranslation();

	return (
		<footer className={cn(className, "px-6 sm:px-10 bg-gray-100")}>
			<div className='max-w-screen-xl mx-auto flex flex-col md:flex-row items-center gap-x-24 gap-y-12 py-10 sm:py-16'>
				<div className="flex flex-col items-center md:items-start">
					<h1 className="font-serif text-center md:text-left text-emerald-900 text-3xl leading-tight md:text-4xl md:leading-tight xl:text-5xl xl:leading-tight">
						{ t("footer.title.1", <span className="font-bold">{t("footer.title.2")}</span>) }
					</h1>

					<Button
						url={process.env.NEXT_PUBLIC_DOWNLOAD_URL}
						compact
						external
						className="mt-6 md:mt-8"
					>
						{ t("navigation.download") }
					</Button>
				</div>

				<div className="hidden md:block">
					<Image
						src={footerImage}
						alt="Water management for plants"
					/>
				</div>
			</div>

			<BottomBar
				className="max-w-screen-2xl mx-auto"
			/>
		</footer>
	)
}

export default Footer;
