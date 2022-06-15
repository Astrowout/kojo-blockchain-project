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
	const contentClasses = cn("flex w-full text-center justify-center duration-300 transition whitespace-nowrap items-center rounded-md font-title uppercase text-xs font-medium", {
		"text-white bg-kojo": context === ButtonContext.PRIMARY,
		"text-emerald-900 bg-white": context === ButtonContext.ALT,
		"text-red-500 bg-red-100": context === ButtonContext.DANGER,
		"bg-kojo text-white": context === ButtonContext.METAMASK,
		"text-white bg-blue-500": context === ButtonContext.WALLET_CONNECT,
		"px-8 sm:px-18 h-14 sm:h-14 space-x-4": !compact,
		"px-7 h-12 space-x-2": compact,
	});

	const buttonClasses = cn({
		"w-full": fluid,
		"pointer-events-none opacity-50 cursor-not-allowed": disabled,
		"opacity-80": loading,
	}, className);

	const renderContent = () => (
		<span className={contentClasses}>
			{icon && !iconAfter && !loading && <Icon name={icon} size={context === ButtonContext.METAMASK || context === ButtonContext.WALLET_CONNECT ? 28 : compact ? 20 : 28} />}

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
