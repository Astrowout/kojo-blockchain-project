import { createContext, FC, PropsWithChildren } from "react";

type SessionContextType = {
	address?: string | null;
	isLoading?: boolean;
	isMetaMaskAvailable?: boolean;
	connectMetaMask?: () => void;
}

const SessionContext = createContext<SessionContextType>({});

export const SessionProvider: FC<PropsWithChildren<any>> = ({ children }) => {
	// useContract(provider);

	return (
		<SessionContext.Provider
			value={{

			}}
		>
			{children}
		</SessionContext.Provider>
	)
}

export default SessionContext;
