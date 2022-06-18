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
		<div className={cn(className, "bg-background px-4 py-8 sm:py-20 sm:px-6 rounded-2xl overflow-hidden border border-border flex items-center justify-center")}>
			<div className="max-w-prose mx-auto flex flex-col items-center">
				<h2 className="text-4xl font-bold font-display text-border-darkest flex items-center">
					<Logo
						w={120}
						blank
						className="text-border-dark"
					/>
				</h2>

				<p className="text-border-darkest font-text text-center text-xs mt-6">
					{ t("about.description") }
				</p>

				<Link
					className="text-border-darkest font-bold font-text text-center text-xs mt-6"
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
