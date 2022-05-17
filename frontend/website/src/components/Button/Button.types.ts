import icons from "../Icon/icons";

export type ButtonProps = {
	children: JSX.Element,
	url?: string,
	className?: string,
	icon?: keyof typeof icons,
	iconAfter?: boolean,
	fluid?: boolean,
	loading?: boolean,
	external?: boolean,
	alt?: boolean,
	compact?: boolean,
	onClick?: () => void,
}
