import icons from "../Icon/icons";

export type LinkProps = {
	children: JSX.Element | string,
	url?: string,
	className?: string,
	icon?: keyof typeof icons,
	newTab?: boolean,
	compact?: boolean,
	clicked?: () => void,
}
