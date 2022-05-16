import { createContext, FC, PropsWithChildren } from "react";
import { Loader } from "../components";
import { useMetaMask, useWalletConnect, useWeb3 } from "../hooks";
import useMagicLink from "../hooks/useMagicLink";
import { Error } from "../types";

type GlobalContextType = {
	address?: string | null;
	isLoading?: boolean;
	error?: Error | null;
	network?: any;
	isMetaMaskAvailable?: boolean;
	connectMetaMask?: () => void;
	connectWalletConnect?: () => void;
	connectMagicLink?: (value: string) => void;
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

	const {
		isLoading: isMagicLinkLoading,
		connectMagicLink,
	} = useMagicLink(setProvider);

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
				isLoading: isMetaMaskLoading || isWalletConnectLoading || isMagicLinkLoading,
				error,
				network,
				isMetaMaskAvailable,
				connectMetaMask,
				connectWalletConnect,
				connectMagicLink,
				disconnect,
			}}
		>
			{children}
		</GlobalContext.Provider>
	)
}

export default GlobalContext;
