import { useState, useEffect } from "react";
import { axios } from "../helpers";
// import { useIonToast } from "@ionic/react";
import { Error, User } from "../types";

const useSession = (address?: string) => {
	// const [present] = useIonToast();
	const [isLoading] = useState(false);
	const [user] = useState<User | null>(null);
	const [error] = useState<Error | null>(null);

	useEffect(() => {
		if (!address) {
			return;
		}

		console.log(address);


		initUserState();

		return () => {
			// cleanup
		}
	}, [address]); // eslint-disable-line react-hooks/exhaustive-deps

	const initUserState = async () => {
		console.log(address);

		try {
			const res = await axios.get("/user", {
				params: {
					address
				},
				proxy: {
					protocol: "http",
					host: "localhost",
					port: 3000,
				}
			});

			console.log(res);

		} catch (error: any) {
			throw error;
		}
	}; // eslint-disable-line react-hooks/exhaustive-deps

 	return {
		balance: user?.balance,
		plants: user?.plants,
		// notifications: user?.profile?.notifications,
		notifications: [
			{
				id: 1,
				message: "Test",
				createdAt: new Date(),
				read: false,
			},
			{
				id: 2,
				message: "Test",
				createdAt: new Date(),
				read: false,
			},
			{
				id: 3,
				message: "Test",
				createdAt: new Date(),
				read: true,
			},
		],
		isLoading,
		error,
	};
};


export default useSession;
