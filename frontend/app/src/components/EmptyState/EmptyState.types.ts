import { ReactNode } from "react";
import icons from "../Icon/icons";

export type EmptyStateProps = {
	children?: ReactNode;
	className?: string;
	message: ReactNode;
	icon?: keyof typeof icons;
}
