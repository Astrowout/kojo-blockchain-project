import { createContext, FC, PropsWithChildren } from "react";
import { useContract } from "../hooks";
import { User } from "../types";

type SessionContextType = {
	user?: User | null;
	isLoading?: boolean;
	isMetaMaskAvailable?: boolean;
	connectMetaMask?: () => void;
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

	return (
		<SessionContext.Provider
			value={{
				user,
			}}
		>
			{children}
		</SessionContext.Provider>
	)
}

export default SessionContext;
