import { FC, memo } from "react";
import cn from "classnames";

import { Icon } from "../../components";

import { LinkProps } from "./Link.types";
import { Link as RouterLink } from "react-router-dom";

const Link: FC<LinkProps> = ({
	children,
	className,
	url = "/",
	external = false,
	icon = null,
	onClick,
}) => {
	const classes = cn(className, "inline-flex whitespace-nowrap items-center text-emerald-900 sm:text-lg hover:underline", {
		"underline": !icon,
	});

	const renderContent = () => (
		<>
			{children}

			{icon && <Icon name={icon} className="ml-2" />}
		</>
	)

	return url && !external ? (
		<RouterLink
			to={url}
			className={classes}
		>
			{ renderContent() }
		</RouterLink>
	) : (
		<a
			href={url}
			className={classes}
			target="_blank" rel="noreferrer"
		>
			{ renderContent() }
		</a>
	)
}

export default memo(Link);
