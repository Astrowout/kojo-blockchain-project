import { useEffect, useState } from "react";
import { providers } from "ethers";
import { useIonToast } from "@ionic/react";
import useTranslation from "./useTranslation";

const isWeb3Available = typeof window !== "undefined" && window?.ethereum;
const provider = isWeb3Available ? new providers.Web3Provider(window.ethereum) : null;
// const rpcProvider = isWeb3Available ? new providers.JsonRpcProvider(process.env.REACT_APP_RPC_URL) : null;

const useWeb3 = () => {
	const [network, setNetwork] = useState<any | null>(null);
	const { t } = useTranslation();
	const [present] = useIonToast();

	useEffect(() => {
		if (!isWeb3Available) {
			present({
				color: "tertiary",
				duration: 8000,
				position: "top",
				header: t("errors.noWeb3.title") as unknown as string,
				buttons: [ {
					side: 'end',
					text: 'Download MetaMask',
					handler: () => {
					  window.open("https://metamask.io/download/");
					}
				}],
				message: t("errors.noWeb3.description") as unknown as string,
			});

			return;
		}

		initNetwork();

		// Events
		provider!.on("chainChanged", window.location.reload);

		return () => {
			provider!.removeAllListeners();
		}
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const initNetwork = async (): Promise<void> => {
		const newNetwork = await provider!.getNetwork();

		if (newNetwork) {
			setNetwork(newNetwork);
		}
	}

 	return {
		network,
		provider,
		isWeb3Available,
	 };
};


export default useWeb3;
