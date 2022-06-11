import { ReactNode } from "react";

export type PlantCardProps = {
	children?: ReactNode;
	className?: string;
	id?: number;
	type?: string;
	image?: string;
	growth?: number;
	hydration?: number;
	waterNeeded?: number;
}
