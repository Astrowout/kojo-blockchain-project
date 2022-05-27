import { useState, useEffect } from "react";
import { axios } from "../helpers";
import { Error, User } from "../types";

const useSession = (address?: string) => {
	const [isLoading] = useState(false);
	const [user, setUser] = useState<User | null>(null);
	const [error] = useState<Error | null>(null);

	useEffect(() => {
		if (!address) {
			return;
		}

		initUserState();
	}, [address]); // eslint-disable-line react-hooks/exhaustive-deps

	const initUserState = async () => {
		try {
			let user: User | null = null;

			user = await axios.get(`/users/${address}`);

			console.log("1", user);


			if (!user) {
				user = await axios.post(`/users`, {
					address,
				});
			}

			console.log("2", user);


			setUser(user);
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
