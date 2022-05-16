import { createContext, FC, PropsWithChildren } from "react";
import { Loader } from "../components";
import { useMetaMask, useWalletConnect, useWeb3 } from "../hooks";
import { Error } from "../types";

type GlobalContextType = {
	address?: string | null;
	isLoading?: boolean;
	error?: Error | null;
	network?: any;
	isMetaMaskAvailable?: boolean;
	connectMetaMask?: () => void;
	connectWalletConnect?: () => void;
	disconnect?: () => void;
}

const GlobalContext = createContext<GlobalContextType>({});

export const GlobalProvider: FC<PropsWithChildren<any>> = ({ children }) => {
	const {
		network,
		address,
		error,
		isLoading: isGlobalLoading,
		setProvider,
		disconnect,
	} = useWeb3();

	const {
		isLoading: isWalletConnectLoading,
		connectWalletConnect,
	} = useWalletConnect(setProvider);

	const {
		isLoading: isMetaMaskLoading,
		isMetaMaskAvailable,
		connectMetaMask,
	} = useMetaMask(setProvider);

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
				isLoading: isMetaMaskLoading || isWalletConnectLoading,
				error,
				network,
				isMetaMaskAvailable,
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
