import { useIonToast } from "@ionic/react";
import { useState } from "react";
import { providers } from "ethers";
import { useHistory } from "react-router";
import useTranslation from "./useTranslation";
const { Magic } = require('magic-sdk');

const customNetworkOptions = {
	rpcUrl: 'https://polygon-rpc.com/', // Polygon RPC URL
	chainId: 137, // Polygon chain id
}
const magic = new Magic(process.env.REACT_APP_MAGIC_PUBLIC_KEY!, { network: customNetworkOptions });

const useMagicLink = (setProvider: (provider: any) => void) => {
	const [present] = useIonToast();
	const [isLoading, setIsLoading] = useState(false);
	const history = useHistory();
	const { t } = useTranslation();
	// const [error, setError] = useState<Error | null>(null);

	const connectMagicLink = async (email: string): Promise<void> => {
		setIsLoading(true);

		try {
			const provider = new providers.Web3Provider(magic.rpcProvider as any);
			await magic.auth.loginWithMagicLink({ email });

			setProvider(provider);
			history.push("/tabs/dashboard");

			present({
				color: "secondary",
				duration: 5000,
				position: "top",
				message: t("messages.loginSuccess") as unknown as string,
			});

			return;
		} catch (error) {

		} finally {
			setIsLoading(false);
		}
	};

 	return {
		isLoading,
		connectMagicLink,
	 };
};


export default useMagicLink;
