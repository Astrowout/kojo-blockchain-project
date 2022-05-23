import { ReactNode } from "react";

export type ChartProps = {
	children?: ReactNode;
	className?: string;
	progress: number;
	strokeWidth?: number;
	size?: number;
}
