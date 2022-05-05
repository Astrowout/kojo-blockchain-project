import { FunctionComponent } from 'react';
import Link from 'next/link';

import { IconProps } from "./types";
import icons from "./icons";

const Icon: FunctionComponent<IconProps> = ({
	name = "External",
	size = 20,
	className = "",
}) => {
	const Icon = icons[name];

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
