import icons from "./icons";

export type IconProps = {
	name: keyof typeof icons,
	size?: number,
	url?: string,
	className?: string,
}
