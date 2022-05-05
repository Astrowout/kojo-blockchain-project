import { FunctionComponent } from 'react';
import Link from 'next/link';
import cn from "classnames";

import { Icon } from "@/components";
import { ButtonProps } from "./types";

const Button: FunctionComponent<ButtonProps> = ({
	className,
	fluid = false,
	children,
	alt = false,
	compact = false,
	iconAfter = false,
	url = "/",
	icon = null,
	onClick,
}) => {
	const classes = cn(className, 'inline-flex space-x-2 text-center justify-center duration-300 transition hover:scale-105 whitespace-nowrap items-center rounded-2xl shadow-lg shadow-emerald-600/20 hover:shadow-xl hover:shadow-emerald-600/20', {
		'text-white bg-emerald-600': !alt,
		'text-emerald-600 bg-white': alt,
		'px-8 sm:px-14 h-16 sm:h-20 text-lg sm:text-xl': !compact,
		'px-7 h-12': compact,
		'w-full': fluid,
	});

	const renderContent = () => (
		<>
			{icon && !iconAfter && <Icon name={icon} />}

			<span>
				{children}
			</span>

			{icon && iconAfter && <Icon name={icon} />}
		</>
	);

	return url ? (
		<Link href={url}>
			<a className={classes}>
				{ renderContent() }
			</a>
		</Link>
	) : (
		<button
			type="button"
			className={classes}
			onClick={onClick}
		>
			{ renderContent() }
		</button>
	)
}

export default Button;
