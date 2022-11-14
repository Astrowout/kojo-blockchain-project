import { FunctionComponent } from "react";
import NextLink from "next/link";
import cn from "classnames";

import { Icon } from "@/components";

import { LinkProps } from "./Link.types";

const Link: FunctionComponent<LinkProps> = ({
	children,
	className = "",
	external = false,
	url = "/",
	icon = null
}) => {
	const classes = cn(className, "inline-flex whitespace-nowrap items-center font-sans uppercase text-xs hover:underline cursor-pointer", {
		"underline": !icon,
	});

	const renderContent = () => (
		<>
			{children}

			{icon && <Icon name={icon} className="ml-2" size={12} />}
		</>
	)

	return url ? (
		<NextLink href={url} passHref={external}>
			<a
				className={classes}
				target={external ? "_blank" : undefined}
			>
				{ renderContent() }
			</a>
		</NextLink>
	) : (
		<button
			type="button"
			className={classes}
		>
			{ renderContent() }
		</button>
	)
}

export default Link;
