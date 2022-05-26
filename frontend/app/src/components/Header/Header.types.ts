import { ReactNode } from "react"

export type HeaderProps = {
	title: ReactNode;
	description?: ReactNode;
	backLink?: string | boolean;
	withOverlap?: boolean;
	children?: ReactNode;
}
