import { FC, memo } from "react";
import cn from "classnames";

import { Icon } from "../../components";

import { LinkProps } from "./Link.types";
import { Link as RouterLink } from "react-router-dom";

const Link: FC<LinkProps> = ({
	children,
	className,
	url = "",
	external = false,
	light = false,
	loading = false,
	icon = null,
	onClick,
}) => {
	const classes = cn(className, "inline-flex whitespace-nowrap items-center sm:text-lg hover:underline", {
		"underline": !icon,
		"text-emerald-900": !light,
		"text-emerald-900 md:text-emerald-100": light,
		"pointer-events-none opacity-80": loading,
	});

	const renderContent = () => (
		<>
			{children}

			{icon && !loading && <Icon name={icon} className="ml-2" />}

			{loading && <Icon name="Spinner" className="ml-2 animate-spin" />}
		</>
	)

	if (url) {
		return !external ? (
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

	return (
		<button
			type="button"
			className={classes}
			onClick={onClick}
			disabled={loading}
		>
			{ renderContent() }
		</button>
	)
}

export default memo(Link);
