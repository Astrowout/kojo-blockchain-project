import { ReactNode } from "react";

export type NotificationItemProps = {
	message: ReactNode;
	date: Date;
	id: string;
	url?: string;
	read?: boolean;
	className?: string;
}
