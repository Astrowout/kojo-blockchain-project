import WalletConnectProvider from "@walletconnect/web3-provider";
// import { useIonToast } from "@ionic/react";
import { useState } from "react";
import { Error, ErrorType } from "../types";

// Check if connection is already established
// if (!connector.connected) {
// 	// create new session
// 	connector.createSession();
// }

const useWalletConnect = (setProvider: (provider: any) => void) => {
	// const [present] = useIonToast();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);

	// Subscribe to connection events
	// connector.on("connect", (error, payload) => {
	// 	if (error) {
	// 		throw error;
	// 	}

	// 	// Get provided accounts and chainId
	// 	const { accounts, chainId } = payload.params[0];
	// });

	// connector.on("session_update", (error, payload) => {
	// 	if (error) {
	// 	  throw error;
	// 	}

	// 	// Get updated accounts and chainId
	// 	const { accounts, chainId } = payload.params[0];
	//   });

	// connector.on("disconnect", (error, payload) => {
	// 	if (error) {
	// 	  throw error;
	// 	}

	// 	// Delete connector
	//   });

	const connectWalletConnect = async (): Promise<void> => {
		setLoading(true);

		try {
			const provider = new WalletConnectProvider({
				rpc: {
					137: "https://polygon-rpc.com/",
				},
				qrcodeModalOptions: {
					mobileLinks: [
						"metamask",
						"trust",
						"rainbow",
						"argent",
					],
				},
			});
			await provider.enable();

			setProvider(provider);
		} catch (error: any) {
			setError({
				type: ErrorType.GENERAL,
				message: error.message,
			});
		} finally {
			setLoading(false);
		}
	};

 	return {
		loading,
		error,
		connectWalletConnect,
	 };
};


export default useWalletConnect;
