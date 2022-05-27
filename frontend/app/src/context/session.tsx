import { createContext, FC, PropsWithChildren } from "react";
import { useContract, useSession } from "../hooks";
import { Notification, User } from "../types";

type SessionContextType = {
	user?: User | null;
	isLoading?: boolean;
	notifications?: Notification[];
	markAllAsRead?: () => void;
}

type SessionProviderProps = {
	provider: any;
	address: string | undefined;
};

const SessionContext = createContext<SessionContextType>({});

export const SessionProvider: FC<PropsWithChildren<SessionProviderProps>> = ({
	children,
	provider,
	address,
}) => {
	const {
		user,
	} = useContract(provider, address);

	const {
		// balance,
		// plants,
		markAllAsRead,
		notifications,
	} = useSession(address);

	return (
		<SessionContext.Provider
			value={{
				user,
				notifications,
				markAllAsRead,
			}}
		>
			{children}
		</SessionContext.Provider>
	)
}

export default SessionContext;
