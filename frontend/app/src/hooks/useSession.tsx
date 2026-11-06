import { useState } from "react";
import { Error, Notification } from "../types";

// The off-chain user and notification API was shut down together with its database.
// This hook keeps its interface so the app still renders, but it no longer stores anything.
const useSession = (address?: string) => {
	const [error] = useState<Error | null>(null);

	const markAllAsRead = async () => {};

	const postNotification = async ({ message, url }: { message: string, url: string }) => {};

 	return {
		notifications: undefined as Notification[] | undefined,
		loading: false,
		error,
		postNotification,
		markAllAsRead,
	};
};


export default useSession;
