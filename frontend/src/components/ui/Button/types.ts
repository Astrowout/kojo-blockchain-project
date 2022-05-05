import icons from "../Icon/icons";

export type ButtonProps = {
	children: JSX.Element,
	url?: string,
	className?: string,
	icon?: keyof typeof icons,
	iconAfter?: boolean,
	fluid?: boolean,
	newTab?: boolean,
	alt?: boolean,
	compact?: boolean,
	onClick?: () => void,
}
