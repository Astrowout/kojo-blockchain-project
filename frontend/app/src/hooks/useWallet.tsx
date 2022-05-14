import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Error, ErrorType } from "../types";
import { useIonToast } from "@ionic/react";
import { useHistory } from "react-router";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const useWallet = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [present] = useIonToast();
	const history = useHistory();
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		if (window.ethereum === undefined) {
			setError({
				type: ErrorType.NO_ETHEREUM,
				message: "string",
			});

			return;
		}
	  console.log("INIT useWallet");

	  return () => {
		// cleanup
	  }
	}, []);

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

 	return {
		connectMetaMask,
		connectWalletConnect,
		isLoading,
		error,
	};
};


export default useWallet;
