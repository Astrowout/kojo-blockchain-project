import { ReactNode } from "react";
import icons from "../Icon/icons";

export type EmptyStateProps = {
	children?: ReactNode;
	className?: string;
	message: ReactNode;
	compact?: boolean;
	icon?: keyof typeof icons;
}
