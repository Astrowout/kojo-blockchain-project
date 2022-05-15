import { ReactNode } from "react"

export type AppHeaderProps = {
	title: ReactNode;
	description?: ReactNode;
	backLink?: string | boolean;
	withOverlap?: boolean;
	children?: ReactNode;
}
