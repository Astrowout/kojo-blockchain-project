import { ComponentType, FunctionComponent, SVGProps } from "react";

import { IconProps } from "./Icon.types";
import icons from "./icons";

const Icon: FunctionComponent<IconProps> = ({
	name = "ArrowRight",
	size = null,
	className = "",
}) => {
	const Icon: ComponentType<SVGProps<SVGElement>> = icons[name];

	return (
		<Icon
			className={className}
			width={size || "100%"}
			height={size || "100%"}
			aria-hidden="true"
		/>
	)
}

export default Icon;
