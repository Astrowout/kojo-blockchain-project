import { ComponentType, FunctionComponent, SVGProps } from "react";

import { IconProps } from "./Icon.types";
import icons from "./icons";

const Icon: FunctionComponent<IconProps> = ({
	name = "ArrowRight",
	size = 20,
	className = "",
}) => {
	const Icon: ComponentType<SVGProps<SVGElement>> = icons[name];

	return (
		<Icon
			className={className}
			width={size}
			height={size}
			aria-hidden="true"
		/>
	)
}

export default Icon;
