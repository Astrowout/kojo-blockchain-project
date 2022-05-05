import { FunctionComponent } from 'react';
import NextLink from 'next/link';
import cn from "classnames";

import { Icon } from "@/components";

import { LinkProps } from "./types";

const Link: FunctionComponent<LinkProps> = ({ className, newTab = false, children, url = "/", icon = null }) => {
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
		<NextLink href={url}>
			<a
				className={classes}
				target={newTab ? "_blank" : undefined}
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
