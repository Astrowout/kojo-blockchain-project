import { ReactNode } from "react";
import icons from "../Icon/icons";

export type PlantCardProps = {
	children: ReactNode;
	url: string;
	icon: keyof typeof icons;
	className?: string;
	unread?: boolean;
	onClick?: () => void;
}
