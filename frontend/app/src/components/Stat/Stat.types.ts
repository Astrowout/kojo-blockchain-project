import { ReactNode } from "react";
import icons from "../Icon/icons";

export type StatProps = {
	children: ReactNode;
	className?: string;
	icon: keyof typeof icons;
	label: ReactNode;
}
