import { FunctionComponent, memo } from "react";
import cn from "classnames";

import { AboutProps } from "./About.types";
import { useTranslation } from "../../hooks";
import Link from "../Link/Link";
import Logo from "../Logo/Logo";

const About: FunctionComponent<AboutProps> = ({
	className,
}) => {
	const { t } = useTranslation();

	return (
		<div className={cn(className, "bg-white px-4 py-8 md:py-16 sm:px-6 rounded-2xl overflow-hidden shadow-2xl shadow-emerald-900/20")}>
			<div className="max-w-prose mx-auto">
				<Logo
					w={120}
					className="mx-auto"
				/>

				<h2 className="text-lg font-semibold mt-12">
					{ t("about.title") }
				</h2>

				<p className="text-gray-400 mt-2">
					{ t("about.description.1") }
				</p>

				<p className="text-gray-400 mt-2">
					{ t("about.description.2") }
				</p>

				<Link
					className="mt-12"
					url={process.env.REACT_APP_WEB_URL}
					icon="ArrowRight"
					external
				>
					{ t("about.website") }
				</Link>
			</div>
		</div>
	)
}

export default memo(About);
