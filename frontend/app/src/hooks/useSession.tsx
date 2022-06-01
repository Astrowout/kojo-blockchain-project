import { useState, useEffect } from "react";
import { axios } from "../helpers";
import { Error, User } from "../types";

const useSession = (address?: string) => {
	const [loading, setLoading] = useState(false);
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
		setLoading(true);

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
		} finally {
			setLoading(false);
		}
	};

	const postNotification = async ({ message, url }: { message: string, url: string }) => {
		try {
			const { data: notifications } = await axios.post(`/users/${address}/notifications`, {
				message,
				url,
			});

			if (!!notifications) {
				setUser({
					...user! && user,
					notifications,
				});
			}
		} catch (error: any) {
			throw error;
		}
	};

 	return {
		role: user?.role,
		notifications: user?.notifications,
		loading,
		error,
		postNotification,
		markAllAsRead,
	};
};


export default useSession;
