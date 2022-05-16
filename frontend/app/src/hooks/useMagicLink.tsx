// import WalletConnectProvider from "@walletconnect/web3-provider";
// import { useIonToast } from "@ionic/react";
// import { useState } from "react";
// import useTranslation from "./useTranslation";

// // Check if connection is already established
// // if (!connector.connected) {
// // 	// create new session
// // 	connector.createSession();
// // }

// const useMagicLink = (setProvider: (provider: any) => void) => {
// 	const [present] = useIonToast();
// 	const [isLoading, setIsLoading] = useState(false);
// 	const [error, setError] = useState<Error | null>(null);

// 	const connectMagicLink = async (): Promise<void> => {
// 		setIsLoading(true);

// 		try {
// 			const provider = new WalletConnectProvider({
// 				rpc: {
// 					137: "https://polygon-rpc.com/",
// 				},
// 				qrcodeModalOptions: {
// 					mobileLinks: [
// 						"metamask",
// 						"trust",
// 						"rainbow",
// 						"argent",
// 					],
// 				},
// 			});
// 			await provider.enable();

// 			setProvider(provider);
// 		} catch (error) {

// 		} finally {
// 			setIsLoading(false);
// 		}
// 	};

//  	return {
// 		isLoading,
// 		connectMagicLink,
// 	 };
// };


// export default useMagicLink;
const magicLink = {};
export default magicLink;
