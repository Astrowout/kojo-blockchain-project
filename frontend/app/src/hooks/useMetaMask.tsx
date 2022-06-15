import { useEffect, useState } from "react";
import { useIonToast } from "@ionic/react";
import { providers } from "ethers";

import useTranslation from "./useTranslation";
import { Error, ErrorType } from "../types";
import { delay } from "../helpers";

const isMetaMaskAvailable = window && typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask;
const MUMBAI_CHAIN_ID =  137;

const useMetaMask = (setProvider: (provider: any) => void) => {
	const { t } = useTranslation();
	const [present] = useIonToast();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		if (!isMetaMaskAvailable) {
			present({
				color: "tertiary",
				duration: 6000,
				position: "top",
				buttons: [ {
					side: 'end',
					text: 'Get MetaMask',
					handler: () => {
						window.open("https://metamask.io/download/");
					}
				}],
				message: t("errors.noWeb3") as unknown as string,
			});

			return;
		} else {
			validNetwork();
			initChainChangeEvent();
		}
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const validNetwork = async () => {
		const provider = new providers.Web3Provider(window.ethereum);

		const network = await provider.getNetwork();
		const chainId = network.chainId;

		if (chainId !== (MUMBAI_CHAIN_ID || 80001)) {
			present({
				color: "secondary",
				duration: 6000,
				position: "top",
				buttons: [ {
					side: "end",
					text: "Close",
					role: "cancel",
				}],
				message: t("errors.wrongNetwork") as unknown as string,
			});

			return false;
		}

		return true;
	}

	const initChainChangeEvent = async () => {
		window.ethereum.on("chainChanged", () => window.location.reload());
	}

	const initAccountChangeEvent = async () => {
		window.ethereum.on("accountsChanged", () => window.location.reload());
	}

	const connectMetaMask = async (): Promise<any | void> => {
		setLoading(true);

		try {
			const isNetworkValid = await validNetwork();

			if (!isNetworkValid) {
				setError({
					type: ErrorType.WRONG_NETWORK,
					message: t("errors.wrongNetwork") as unknown as string,
				});

				return;
			}

			const provider = new providers.Web3Provider(window.ethereum);

			const [address] = await provider!.send("eth_requestAccounts", []);

			if (address) {
				setProvider(provider);
				initAccountChangeEvent();

				await delay(300);

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
			setLoading(false);
		}
	};

	return {
		isMetaMaskAvailable,
		loading,
		error,
		connectMetaMask,
	}
};

export default useMetaMask;
