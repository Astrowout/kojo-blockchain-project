import { ReactNode } from "react";

export type NotificationItemProps = {
	message: ReactNode;
	date: Date;
	url?: string;
	read?: boolean;
	className?: string;
}
