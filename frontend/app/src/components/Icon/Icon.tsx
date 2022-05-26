import { ReactComponentOrElement } from "@ionic/react";
import { FC, memo } from "react";

import { IconProps } from "./Icon.types";
import icons from "./icons";

const Icon: FC<IconProps> = ({
	name = "ArrowRight",
	size = 20,
	className = "",
}) => {
	const Icon: ReactComponentOrElement = icons[name];

	return (
		<Icon
			className={className}
			width={size}
			height={size}
			aria-hidden="true"
		/>
	)
}

export default memo(Icon);
