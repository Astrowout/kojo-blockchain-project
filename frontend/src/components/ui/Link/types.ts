export type LinkProps = {
	children: JSX.Element,
	url?: string,
	className?: string,
	icon?: string,
	newTab?: boolean,
	compact?: boolean,
	clicked?: () => void,
}
