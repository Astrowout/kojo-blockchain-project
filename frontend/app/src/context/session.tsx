import { Contract } from "ethers";
import { createContext, Dispatch, FC, PropsWithChildren, SetStateAction } from "react";
import { useContract, useSession } from "../hooks";
import { Notification, Participant, Plant } from "../types";

type SessionContextType = {
	loading?: boolean;
	notifications?: Notification[];
	plants?: Plant[];
	participant?: Participant;
	balance?: number;
	contract?: Contract;
	minsUntilNextClaim?: number;
	markAllAsRead?: () => void;
	setParticipant?: Dispatch<SetStateAction<Participant | undefined>>;
}

type SessionProviderProps = {
	provider: any;
	address: string | undefined;
};

const SessionContext = createContext<SessionContextType>({});

export const SessionProvider: FC<PropsWithChildren<SessionProviderProps>> = ({
	children,
	provider,
	address,
}) => {
	const {
		balance,
		plants,
		participant,
		contract,
		minsUntilNextClaim,
		setParticipant,
	} = useContract(provider, address);

	const {
		notifications,
		loading,
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
				plants,
				minsUntilNextClaim,
				markAllAsRead,
				setParticipant,
			}}
		>
			{children}
		</SessionContext.Provider>
	)
}

export default SessionContext;
