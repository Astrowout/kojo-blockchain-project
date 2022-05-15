import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Error, ErrorType } from "../types";
import { useIonToast } from "@ionic/react";
import useTranslation from "./useTranslation";
import { useHistory } from "react-router";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const isWeb3Available = typeof window !== "undefined" && window?.ethereum;
const provider = isWeb3Available ? new ethers.providers.Web3Provider(window.ethereum) : null;

const useAuth = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [isGlobalLoading, setIsGlobalLoading] = useState(false);
	const [address, setAddress] = useState<string | null>(null);
	const [error, setError] = useState<Error | null>(null);
	const { t } = useTranslation();
	const [present] = useIonToast();
	const history = useHistory();

	useEffect(() => {
		if (!isWeb3Available) {
			present({
				color: "danger",
				duration: 6000,
				position: "top",
				message: t("errors.noWeb3") as unknown as string,
			});

			return;
		}

		checkCurrentAccount();

		// Events
		window.ethereum.on("accountsChanged", handleAccountChange);
		window.ethereum.on("chainChanged", handleChainChange);

		return () => {
			window.ethereum.removeListener("accountsChanged", handleAccountChange);
			window.ethereum.removeListener("chainChanged", handleChainChange);
		}
	}, []); // eslint-disable-line react-hooks/exhaustive-deps


	const handleAccountChange = ([newAddress]: string[]): void => {
		if (newAddress) {
			setAddress(newAddress)
		} else if (!newAddress) {
			window.location.reload();
		}
	}

	const handleChainChange = (): void => {
		window.location.reload();
	}

	const checkCurrentAccount = async (): Promise<void> => {
		setIsGlobalLoading(true);
		await delay(300);
		const accounts = await provider!.listAccounts();

		setAddress(accounts[0]);
		setIsGlobalLoading(false);
	}

	const connectMetaMask = async (): Promise<void> => {
		setIsLoading(true);

		try {
			await delay(300);
			const [acc] = await provider!.send("eth_requestAccounts", []);
			setAddress(acc);

			history.push("/tabs");
			await delay(300);
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
		try {
			await provider!.send("wallet_requestPermissions", [{ eth_accounts: {} }]);
			const accounts = await provider!.listAccounts();
			console.log(accounts);
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
