import { useIonToast } from "@ionic/react";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { Error, ErrorType } from "../types";
import useTranslation from "./useTranslation";

const useWeb3 = () => {
	const [present] = useIonToast();
	const history = useHistory();
	const location = useLocation();
	const { t } = useTranslation();
	const [network, setNetwork] = useState<any | null>(null);
	const [provider, setProvider] = useState<any | null>(null);
	const [address, setAddress] = useState<string | null>(null);
	const [loading] = useState(false);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		if (!provider || location.pathname !== "/") {
			history.push("/");

			return;
		}

		initAccount();
		initNetwork();
	}, [provider]); // eslint-disable-line react-hooks/exhaustive-deps

	const initAccount = async (): Promise<void> => {
		const [address] = await provider!.listAccounts();

		if (address) {
			setAddress(address);
			history.push("/tabs/dashboard");

			present({
				color: "secondary",
				duration: 3000,
				position: "top",
				message: t("messages.loginSuccess") as unknown as string,
			});
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

	const disconnect = async (code?: string, reason?: string): Promise<void> => {
		if (code && reason) {
			present({
				color: "tertiary",
				duration: 6000,
				position: "top",
				message: `Error ${code} - ${reason}`,
			});
		}

		try {
			provider?.disconnect();

			setAddress(null);
			history.push("/");
		} catch (error: any) {
			present({
				color: "danger",
				duration: 6000,
				position: "top",
				message: error.message,
			});

			setError({
				type: ErrorType.GENERAL,
				message: error.message,
			});
		}
	}

 	return {
		network,
		address,
		provider,
		loading,
		error,
		setProvider,
		disconnect,
	 };
};


export default useWeb3;
