import { FunctionComponent } from "react";
import cn from "classnames";

import { useTranslation } from "@/hooks";
import { BannerProps } from "./Banner.types";

const Banner: FunctionComponent<BannerProps> = ({
	className = "",
}) => {
	const { t } = useTranslation();

	return (
		<div
			role="status"
			className={cn(className, "px-6 sm:px-10 py-3 bg-black text-white text-center font-text text-sm leading-6")}
		>
			{ t("banner.shutdown") }
		</div>
	);
}

export default Banner;
