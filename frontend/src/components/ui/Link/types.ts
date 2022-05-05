export type LinkProps = {
	children: JSX.Element | string,
	url?: string,
	className?: string,
	icon?: string,
	newTab?: boolean,
	compact?: boolean,
	clicked?: () => void,
}
