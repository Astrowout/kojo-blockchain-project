export type ButtonProps = {
	children: JSX.Element,
	url?: string,
	className?: string,
	icon?: string,
	iconAfter: boolean,
	fluid?: boolean,
	newTab?: boolean,
	alt?: boolean,
	compact?: boolean,
	onClick?: () => void,
}
