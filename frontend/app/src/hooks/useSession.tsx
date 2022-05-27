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
			const { data } = await axios.get(`/users/${address}`);

			if (!data) {
				const { data } = await axios.post(`/users`, {
					address,
				});
				setUser(data);
			} else {
				setUser(data);
			}
		} catch (error: any) {
			throw error;
		}
	};

	const markAllAsRead = async () => {
		try {
			const { data: update } = await axios.post(`/users/${address}/notifications/mark-as-read`, {
				all: true,
			});

			if (!!update.count) {
				const { data } = await axios.get(`/users/${address}/notifications`);

				if (data) {
					setUser({
						...user! && user,
						notifications: data,
					});
				}
			}
		} catch (error: any) {
			throw error;
		}
	};

 	return {
		balance: user?.balance,
		plants: user?.plants,
		role: user?.role,
		notifications: user?.notifications,
		markAllAsRead,
		isLoading,
		error,
	};
};


export default useSession;
