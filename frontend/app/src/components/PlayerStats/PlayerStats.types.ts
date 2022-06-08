import { ReactNode } from "react";
import icons from "../Icon/icons";

export type Stat = {
	label: ReactNode;
	value?: string;
}

export type PlayerStatsProps = {
	className?: string;
	title: ReactNode;
	icon?: keyof typeof icons;
	data: Stat[];
}
