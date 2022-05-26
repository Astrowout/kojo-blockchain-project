import { FunctionComponent, memo } from "react";
import cn from "classnames";

import { Icon } from "../../components";
import { ButtonProps, ButtonContext } from "./Button.types";
import { IonRouterLink } from "@ionic/react";

const Button: FunctionComponent<ButtonProps> = ({
	className,
	fluid = false,
	children,
	context = ButtonContext.PRIMARY,
	compact = false,
	loading = false,
	disabled = false,
	iconAfter = false,
	url = "",
	icon = null,
	onClick,
}) => {
	const contentClasses = cn("flex w-full text-center justify-center duration-300 transition whitespace-nowrap items-center rounded-2xl shadow-lg hover:shadow-xl", {
		"text-white bg-emerald-600 shadow-emerald-600/20 hover:shadow-emerald-600/20": context === ButtonContext.PRIMARY,
		"text-emerald-900 bg-white shadow-emerald-900/20 hover:shadow-emerald-900/20": context === ButtonContext.ALT,
		"text-red-500 bg-red-100 shadow-red-600/10 hover:shadow-red-600/10": context === ButtonContext.DANGER,
		"text-white bg-amber-500 shadow-amber-900/20 hover:shadow-amber-900/20": context === ButtonContext.METAMASK,
		"text-white bg-blue-500 shadow-blue-900/20 hover:shadow-blue-900/20": context === ButtonContext.WALLET_CONNECT,
		"px-8 sm:px-14 h-16 sm:h-20 text-lg sm:text-xl space-x-4": !compact,
		"px-7 h-12 space-x-2": compact,
	});

	const buttonClasses = cn(className, {
		"w-full": fluid,
		"pointer-events-none opacity-50 cursor-not-allowed": disabled
	});

	const renderContent = () => (
		<span className={contentClasses}>
			{icon && !iconAfter && !loading && <Icon name={icon} size={context === ButtonContext.METAMASK || context === ButtonContext.WALLET_CONNECT ? 36 : compact ? 20 : 28} />}

			{loading && <Icon className="animate-spin" name="Spinner" size={compact ? 20 : 28} />}

			<span>
				{children}
			</span>

			{icon && iconAfter && <Icon name={icon} />}
		</span>
	);

	// check capacitor is native and use different link if needed

	return url ? (
		<IonRouterLink
			routerLink={url}
			className={buttonClasses}
		>
			{ renderContent() }
		</IonRouterLink>
	) : (
		<button
			type="button"
			onClick={onClick}
			disabled={disabled || loading}
			className={buttonClasses}
		>
			{ renderContent() }
		</button>
	)
}

export default memo(Button);
