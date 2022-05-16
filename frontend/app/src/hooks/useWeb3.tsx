import { useIonToast } from "@ionic/react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Error } from "../types";
import useTranslation from "./useTranslation";

const useWeb3 = () => {
	const [present] = useIonToast();
	const { t } = useTranslation();
	const history = useHistory();
	const [network, setNetwork] = useState<any | null>(null);
	const [provider, setProvider] = useState<any | null>(null);
	const [address, setAddress] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		if (!provider) {
			return;
		}

		initAccount();
		initNetwork();

		// Events
		provider!.on("accountsChanged", initAccount);
		provider!.on("chainChanged", window.location.reload);

		return () => {
			provider!.removeAllListeners();
		}
	}, [provider]); // eslint-disable-line react-hooks/exhaustive-deps

	const initAccount = async (): Promise<void> => {
		const [address] = await provider!.listAccounts();

		if (address) {
			setAddress(address);
		} else {
			setAddress(null);
		}
	}

	const initNetwork = async (): Promise<void> => {
		const newNetwork = await provider!.getNetwork();

		if (newNetwork) {
			setNetwork(newNetwork);
		}
	}

	const disconnect = async (): Promise<void> => {
		try {
			setAddress(null);
			history.push("/");
		} catch (error: any) {
			present({
				color: "danger",
				duration: 6000,
				position: "top",
				message: error.message,
			});
		}
	}

 	return {
		network,
		address,
		isLoading,
		error,
		setProvider,
		disconnect,
	 };
};


export default useWeb3;
