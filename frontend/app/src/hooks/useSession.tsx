import { useState, useEffect } from "react";
import { axios } from "../helpers";
// import { useIonToast } from "@ionic/react";
import { Error, User } from "../types";

const useSession = (address?: string) => {
	// const [present] = useIonToast();
	const [isLoading] = useState(false);
	const [user, setUser] = useState<User | null>(null);
	const [error] = useState<Error | null>(null);

	useEffect(() => {
		if (!address) {
			return;
		}

		initUserState();

		return () => {
			// cleanup
		}
	}, [address]); // eslint-disable-line react-hooks/exhaustive-deps

	const initUserState = async () => {
		try {
			const res = await axios.get(`/user/${address}`);

			setUser(res.data);
		} catch (error: any) {
			throw error;
		}
	}; // eslint-disable-line react-hooks/exhaustive-deps

 	return {
		balance: user?.balance,
		plants: user?.plants,
		notifications: user?.notifications,
		isLoading,
		error,
	};
};


export default useSession;
