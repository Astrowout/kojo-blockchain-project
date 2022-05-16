import { createContext, FC, PropsWithChildren } from "react";
import { Loader } from "../components";
import { useAuth } from "../hooks";
import useWeb3 from "../hooks/useWeb3";
import { Error } from "../types";

type GlobalContextType = {
	address?: string | null;
	isLoading?: boolean;
	error?: Error | null;
	network?: any;
	isWeb3Available?: boolean;
	connectMetaMask?: () => void;
	connectWalletConnect?: () => void;
	disconnect?: () => void;
}

const GlobalContext = createContext<GlobalContextType>({});

export const GlobalProvider: FC<PropsWithChildren<any>> = ({ children }) => {
	const {
		provider,
		network,
		isWeb3Available,
	} = useWeb3();
	const {
		address,
		isGlobalLoading,
		isLoading,
		error,
		connectMetaMask,
		connectWalletConnect,
		disconnect,
	} = useAuth(provider, isWeb3Available);

	if (isGlobalLoading) {
		return (
			<div className="w-screen h-screen flex items-center justify-center">
				<Loader />
			</div>
		)
	}

	return (
		<GlobalContext.Provider
			value={{
				address,
				isLoading,
				error,
				network,
				isWeb3Available,
				connectMetaMask,
				connectWalletConnect,
				disconnect,
			}}
		>
			{children}
		</GlobalContext.Provider>
	)
}

export default GlobalContext;
