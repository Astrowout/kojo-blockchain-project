import { ReactNode } from "react";
import icons from "../Icon/icons";

export enum AlertType {
	DANGER
}

export type AlertProps = {
	children: ReactNode;
	type?: AlertType;
	icon?: keyof typeof icons;
	className?: string;
}
