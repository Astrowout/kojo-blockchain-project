import { FunctionComponent } from "react";
import cn from "classnames";
import Image from "next/image";

import { PartnersProps } from "./Partners.types";

import { useTranslation } from "@/hooks";

import farysLogo from "@/assets/img/farys.png";
import polygonLogo from "@/assets/img/polygon.png";
import howestLogo from "@/assets/img/howest.png";

const Partners: FunctionComponent<PartnersProps> = ({ className }) => {
	const { t } = useTranslation();

	return (
		<section className={cn(className, "")}>
			<div className='max-w-screen-md mx-auto px-6 sm:px-10 py-10 sm:py-16 flex flex-col items-center'>
				<p className="font-sans font-bold text-gray-400 uppercase tracking-widest">
					{ t("partners.title") }
				</p>

				<div className="flex gap-x-4 sm:gap-x-12 gap-y-8 mt-6">
					<Image
						src={farysLogo}
						alt="Farys logo"
					/>
					<Image
						src={polygonLogo}
						alt="Polygon network logo"
					/>
					<Image
						src={howestLogo}
						alt="Howest hogeschool logo"
					/>
				</div>

			</div>
		</section>
	)
}

export default Partners;
