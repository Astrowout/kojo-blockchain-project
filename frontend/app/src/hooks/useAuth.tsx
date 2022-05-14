import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Error, ErrorType } from "../types";
import { useIonToast } from "@ionic/react";
import { useHistory } from "react-router";
import useTranslation from "./useTranslation";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const useAuth = () => {
	const [isLoading, setIsLoading] = useState(false);
	const { t } = useTranslation();
	const [present] = useIonToast();
	const history = useHistory();
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		const isWeb3Available = typeof window !== "undefined" && window?.ethereum;
		if (!isWeb3Available) {
			present({
				color: "danger",
				duration: 6000,
				position: "top",
				message: t("errors.noWeb3") as unknown as string,
			});

			return;
		}
	  console.log("INIT useAuth");

	  return () => {
		// cleanup
	  }
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const connectMetaMask = async (cb?: () => void | null): Promise<void> => {
		setIsLoading(true);

		try {
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			await delay(300);
			const [acc] = await provider.send("eth_requestAccounts", []);
			await console.log(acc);

			if (cb) {
				cb();
			}
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
					message: "Oops, something went wrong..."
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
		await window.ethereum.request({
			method: "wallet_requestPermissions",
			params: [
			  {
				eth_accounts: {}
			  }
			]
		  });
	}

 	return {
		connectMetaMask,
		connectWalletConnect,
		isLoading,
		error,
	};
};


export default useAuth;
