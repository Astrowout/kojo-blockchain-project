import { createContext, FC, PropsWithChildren } from "react";
import { useContract, useSession } from "../hooks";
import { Notification, Plant, User } from "../types";

type SessionContextType = {
	user?: User | null;
	isLoading?: boolean;
	notifications?: Notification[];
	plants?: Plant[];
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
		balance,
		plants,
		minsUntilNextClaim,
	} = useContract(provider, address);

	const {
		markAllAsRead,
		notifications,
	} = useSession(address);

	return (
		<SessionContext.Provider
			value={{
				user,
				notifications,
				balance,
				plants,
				minsUntilNextClaim,
				markAllAsRead,
			}}
		>
			{children}
		</SessionContext.Provider>
	)
}

export default SessionContext;
