import { ReactNode } from "react";

export type EmailFormProps = {
	className?: string,
	label?: ReactNode,
	placeholder?: string,
	disabled?: boolean,
	onSubmit: ((value: string) => void) | undefined,
}
