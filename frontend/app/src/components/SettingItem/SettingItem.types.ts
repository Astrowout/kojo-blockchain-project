import { ReactNode } from "react";

export type SettingItemProps = {
	children?: ReactNode;
	actionSlot?: ReactNode;
	title: ReactNode;
	connected?: boolean;
	className?: string;
}
