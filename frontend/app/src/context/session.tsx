import { createContext, FC, PropsWithChildren } from "react";
import { useContract, useSession } from "../hooks";
import { Notification, User } from "../types";

type SessionContextType = {
	user?: User | null;
	isLoading?: boolean;
	notifications?: Notification[];
	balance?: number;
	minsUntilNextClaim?: number;
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
		minsUntilNextClaim,
	} = useContract(provider, address);

	const {
		// balance,
		// plants,
		balance,
		markAllAsRead,
		notifications,
	} = useSession(address);

	return (
		<SessionContext.Provider
			value={{
				user,
				notifications,
				balance,
				minsUntilNextClaim,
				markAllAsRead,
			}}
		>
			{children}
		</SessionContext.Provider>
	)
}

export default SessionContext;
