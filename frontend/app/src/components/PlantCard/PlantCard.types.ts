import { ReactNode } from "react";

export type PlantCardProps = {
	children?: ReactNode;
	className?: string;
	id: string;
	type: string;
	image: string;
	health?: number;
	hydration?: number;
	waterNeeded?: number;
}
