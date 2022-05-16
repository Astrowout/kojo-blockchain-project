import { useEffect, useState } from "react";
import { useIonToast } from "@ionic/react";
import { providers } from "ethers";

import useTranslation from "./useTranslation";
import { Error, ErrorType } from "../types";
import { useHistory } from "react-router";

const isMetaMaskAvailable = window && typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask;
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const useMetaMask = (setProvider: (provider: any) => void) => {
	const { t } = useTranslation();
	const [present] = useIonToast();
	const history = useHistory();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		if (!isMetaMaskAvailable) {
			present({
				color: "tertiary",
				duration: 8000,
				position: "top",
				header: t("errors.noWeb3.title") as unknown as string,
				buttons: [ {
					side: 'end',
					text: 'Get MetaMask',
					handler: () => {
						window.open("https://metamask.io/download/");
					}
				}],
				message: t("errors.noWeb3.description") as unknown as string,
			});

			return;
		}

		const provider = new providers.Web3Provider(window.ethereum);
		setProvider(provider);
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const connectMetaMask = async (): Promise<any | void> => {
		setIsLoading(true);

		try {
			await delay(300);
			const provider = new providers.Web3Provider(window.ethereum);
			const [address] = await provider!.send("eth_requestAccounts", []);

			if (address) {
				setProvider(provider);
				history.push("/tabs/dashboard");

				return;
			}
		} catch (error: any) {
			present({
				color: "danger",
				duration: 6000,
				position: "top",
				message: error.message,
			});

			setError(
				{
					type: ErrorType.GENERAL,
					message: t("errors.general") as unknown as string,
				}
			);
		} finally {
			setIsLoading(false);
		}
	};

	return {
		isMetaMaskAvailable,
		isLoading,
		error,
		connectMetaMask,
	}
};

export default useMetaMask;