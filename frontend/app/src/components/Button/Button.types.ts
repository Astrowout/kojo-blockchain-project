import { ReactNode } from "react";

import icons from "../Icon/icons";

export enum ButtonContext {
	PRIMARY,
	ALT,
	METAMASK,
	WALLET_CONNECT,
}

export type ButtonProps = {
	children: ReactNode,
	url?: string,
	className?: string,
	icon?: keyof typeof icons,
	iconAfter?: boolean,
	context?: ButtonContext,
	fluid?: boolean,
	loading?: boolean,
	disabled?: boolean,
	newTab?: boolean,
	compact?: boolean,
	onClick?: () => void,
}
