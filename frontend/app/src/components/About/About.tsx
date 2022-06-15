import { FunctionComponent, memo } from "react";
import cn from "classnames";

import { AboutProps } from "./About.types";
import { useTranslation } from "../../hooks";
import Link from "../Link/Link";
import Icon from "../Icon/Icon";

const About: FunctionComponent<AboutProps> = ({
	className,
}) => {
	const { t } = useTranslation();

	return (
		<div className={cn(className, "bg-background px-4 py-8 md:py-16 sm:px-6 rounded-2xl overflow-hidden border border-border min-h-[30rem] flex items-center justify-center")}>
			<div className="max-w-prose mx-auto flex flex-col items-center">


				<h2 className="text-4xl font-bold font-display text-border-dark flex items-center">
				<Icon
							name="Token"
							className='text-border-dark mr-3'
							size={48}
						/>	{ t("about.title") }
				</h2>

				<p className="text-border-dark font-text text-center text-xs mt-6">
					{ t("about.description.1") }
				</p>

				<p className="text-border-dark font-text text-center text-xs mt-6">
					{ t("about.description.2") }
				</p>

				<Link
					className="text-border-dark font-bold font-text text-center text-xs mt-6"
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
