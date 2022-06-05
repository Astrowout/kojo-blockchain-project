import { createContext, FC, PropsWithChildren } from "react";
import { Loader } from "../components";
import { useMetaMask, useWeb3 } from "../hooks";
import useMagicLink from "../hooks/useMagicLink";
import { Error } from "../types";
import { SessionProvider } from "./session";

type GlobalContextType = {
	address?: string | null;
	loading?: boolean;
	error?: Error | null;
	network?: any;
	provider?: any;
	isMetaMaskAvailable?: boolean;
	connectMetaMask?: () => void;
	connectWalletConnect?: () => void;
	connectMagicLink?: (value: string) => void;
	disconnect?: () => void;
}

type GlobalProviderProps = {};

const GlobalContext = createContext<GlobalContextType>({});

export const GlobalProvider: FC<PropsWithChildren<GlobalProviderProps>> = ({ children }) => {
	const {
		network,
		address,
		provider,
		error,
		loading: isGlobalLoading,
		setProvider,
		disconnect,
	} = useWeb3();

	// const {
	// 	loading: isWalletConnectLoading,
	// 	connectWalletConnect,
	// } = useWalletConnect(setProvider);

	const {
		loading: isMetaMaskLoading,
		error: metaMaskError,
		isMetaMaskAvailable,
		connectMetaMask,
	} = useMetaMask(setProvider);

	const {
		loading: isMagicLinkLoading,
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
				loading: isMetaMaskLoading || isMagicLinkLoading,
				error: error || metaMaskError,
				network,
				provider,
				isMetaMaskAvailable,
				connectMetaMask,
				connectMagicLink,
				disconnect,
			}}
		>
			<SessionProvider
				provider={provider}
				address={address!}
			>
				{children}
			</SessionProvider>
		</GlobalContext.Provider>
	)
}

export default GlobalContext;
