import icons from "../Icon/icons";

export type LinkProps = {
	children: JSX.Element | string,
	url?: string,
	className?: string,
	icon?: keyof typeof icons,
	external?: boolean,
	light?: boolean,
	onClick?: () => void,
}
