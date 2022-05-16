import { useIonToast } from "@ionic/react";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { useState } from "react";
import useTranslation from "./useTranslation";

// const provider = new WalletConnectProvider({
// 	infuraId: "27e484dcd9e3efcfd25a83a78777cdf1",
// });

// Check if connection is already established
// if (!connector.connected) {
// 	// create new session
// 	connector.createSession();
// }

const useWalletConnect = (setProvider: (provider: any) => void) => {
	const { t } = useTranslation();
	const [present] = useIonToast();
	const [isLoading, setIsLoading] = useState(false);
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
		setIsLoading(true);
		await console.log("connect walletconnect");
		setIsLoading(false);
	};

 	return {
		isLoading,
		connectWalletConnect,
	 };
};


export default useWalletConnect;
