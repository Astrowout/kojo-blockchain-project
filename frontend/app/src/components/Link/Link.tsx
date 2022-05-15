import { FC, memo } from "react";
import cn from "classnames";

import { Icon } from "../../components";

import { LinkProps } from "./Link.types";
import { Link as RouterLink } from "react-router-dom";

const Link: FC<LinkProps> = ({ className, children, url = "/", icon = null }) => {
	const classes = cn(className, "inline-flex whitespace-nowrap items-center text-emerald-900 text-lg hover:underline", {
		"underline": !icon,
	});

	const renderContent = () => (
		<>
			{children}

			{icon && <Icon name={icon} className="ml-2" />}
		</>
	)

	return url ? (
		<RouterLink
			to={url}
			className={classes}
		>
			{ renderContent() }
		</RouterLink>
	) : (
		<button
			type="button"
			className={classes}
		>
			{ renderContent() }
		</button>
	)
}

export default memo(Link);
