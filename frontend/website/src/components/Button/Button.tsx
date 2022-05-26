import { FunctionComponent } from "react";
import Link from "next/link";
import cn from "classnames";

import { Icon } from "@/components";
import { ButtonProps } from "./Button.types";

const Button: FunctionComponent<ButtonProps> = ({
	className,
	fluid = false,
	children,
	alt = false,
	compact = false,
	loading = false,
	iconAfter = false,
	external = false,
	url = "",
	icon = null,
	onClick,
}) => {
	const classes = cn(className, "inline-flex space-x-2 text-center justify-center duration-300 transition hover:scale-105 whitespace-nowrap items-center rounded-2xl shadow-lg hover:shadow-xl", {
		"text-white bg-emerald-600 shadow-emerald-600/20 hover:shadow-emerald-600/20": !alt,
		"text-emerald-900 bg-white shadow-emerald-900/20 hover:shadow-emerald-900/20": alt,
		"px-8 sm:px-14 h-16 sm:h-20 text-lg sm:text-xl": !compact,
		"px-7 h-12": compact,
		"w-full": fluid,
	});

	const renderContent = () => (
		<>
			{icon && !iconAfter && !loading && <Icon name={icon} size={20} />}

			{loading && <Icon className="animate-spin" name="Spinner" size={20} />}

			<span>
				{children}
			</span>

			{icon && iconAfter && <Icon name={icon} size={20} />}
		</>
	);

	// check capacitor is native and use different link if needed

	return url ? (
		<Link
			href={url}
			passHref={external}
		>
			<a
				className={classes}
				target={external ? "_blank" : undefined}
			>
				{ renderContent() }
			</a>
		</Link>
	) : (
		<button
			type="button"
			className={classes}
			onClick={onClick}
			disabled={loading}
		>
			{ renderContent() }
		</button>
	)
}

export default Button;
