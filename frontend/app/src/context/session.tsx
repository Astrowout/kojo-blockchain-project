import { Contract } from "ethers";
import { createContext, FC, PropsWithChildren } from "react";
import { useContract, useSession } from "../hooks";
import { Notification, Participant, Player } from "../types";

type SessionContextType = {
	loading?: boolean;
	notifications?: Notification[];
	participant: Participant;
	ranking?: number;
	participants: Player[];
	balance?: number;
	contract?: Contract;
	nextClaimInterval?: string;
	postNotification?: ({ message, url }: { message: string, url: string }) => void;
	markAllAsRead?: () => void;
	handleUpdateParticipant: (data: any) => void;
}

type SessionProviderProps = {
	provider: any;
	address: string | undefined;
};

const SessionContext = createContext<SessionContextType>({
	participants: [],
	participant: {},
	handleUpdateParticipant: () => {},
});

export const SessionProvider: FC<PropsWithChildren<SessionProviderProps>> = ({
	children,
	provider,
	address,
}) => {
	const {
		balance,
		participant,
		ranking,
		participants,
		contract,
		nextClaimInterval,
		handleUpdateParticipant,
	} = useContract(provider, address);

	const {
		notifications,
		loading,
		postNotification,
		markAllAsRead,
	} = useSession(address);

	return (
		<SessionContext.Provider
			value={{
				contract,
				notifications,
				balance,
				loading,
				participant,
				ranking,
				participants,
				nextClaimInterval,
				postNotification,
				markAllAsRead,
				handleUpdateParticipant,
			}}
		>
			{children}
		</SessionContext.Provider>
	)
}

export default SessionContext;
