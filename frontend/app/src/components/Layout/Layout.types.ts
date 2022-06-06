import { ReactNode } from "react";

export type AppLayoutProps = {
	className?: string;
	title?: ReactNode;
	description?: ReactNode;
	backLink?: string | boolean;
	withOverlap?: boolean;
};
