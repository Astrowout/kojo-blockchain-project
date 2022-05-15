import { ReactNode } from "react";

export type AppLayoutProps = {
	title?: ReactNode;
	description?: ReactNode;
	backLink?: string | boolean;
	withOverlap?: boolean;
};
