import { useEffect, useState } from "react";
import { Error, ErrorType } from "../types";
import { useIonToast } from "@ionic/react";
import { useHistory } from "react-router-dom";
import useTranslation from "./useTranslation";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const useAuth = (provider?: any) => {
	const [isLoading, setIsLoading] = useState(false);
	const [isGlobalLoading, setIsGlobalLoading] = useState(false);
	const [address, setAddress] = useState<string | null>(null);
	const [error, setError] = useState<Error | null>(null);
	const [present] = useIonToast();
	const { t } = useTranslation();
	const history = useHistory();

	useEffect(() => {
		initAccount();

		// Events
		provider!.on("accountsChanged", initAccount);

		return () => {
			provider!.removeAllListeners();
		}
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const initAccount = async (): Promise<void> => {
		setIsGlobalLoading(true);
		await delay(300);
		const [account] = await provider!.listAccounts();

		if (account) {
			setAddress(account);
		} else {
			setAddress(null);
			history.push("/");
		}

		setIsGlobalLoading(false);
	}

	const connectMetaMask = async (): Promise<void> => {
		setIsLoading(true);

		try {
			await delay(300);
			const [account] = await provider!.send("eth_requestAccounts", []);
			setAddress(account);

			history.push("/tabs");
			await delay(100);
		} catch (error: any) {
			present({
				color: "danger",
				duration: 6000,
				position: "top",
				message: error.data.message,
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

	const connectWalletConnect = async (): Promise<void> => {
		setIsLoading(true);
		await console.log("connect walletconnect");
		setIsLoading(false);
	};

	const disconnect = async (): Promise<void> => {
		try {
			setAddress(null);
			history.push("/");
		} catch (error: any) {
			present({
				color: "danger",
				duration: 6000,
				position: "top",
				message: error.data.message,
			});
		}
	}

 	return {
		address,
		isGlobalLoading,
		isLoading,
		error,
		connectMetaMask,
		connectWalletConnect,
		disconnect,
	 };
};


export default useAuth;
