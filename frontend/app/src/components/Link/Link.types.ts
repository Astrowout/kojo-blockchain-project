import { ReactNode } from "react";

import icons from "../Icon/icons";

export type LinkProps = {
	children: JSX.Element | string,
	url?: string,
	className?: string,
	icon?: keyof typeof icons,
	external?: boolean,
	loading?: boolean,
	light?: boolean,
	tooltip?: ReactNode,
	onClick?: () => void,
}
