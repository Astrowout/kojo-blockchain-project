import { ReactNode } from "react";

export type ConnectModalProps = {
	title: ReactNode;
	isOpen: boolean;
	description?: ReactNode;
	close: () => void;
}
