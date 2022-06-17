import { useState, useEffect, useCallback } from "react";
import orderBy from "lodash/orderBy";
import findIndex from "lodash/findIndex";
import { Contract } from "ethers";
import { Error, Participant, Player } from "../types";
import { formatParticipant } from "../helpers";
import { formatDistanceToNow } from 'date-fns';

// @ts-ignore:next-line
import MainArtifact from "../artifacts/contracts/KojoV1.sol/KojoV1.json";

const useContract = (provider: any, address?: string) => {
	const [loading] = useState(false);
	const [participant, setParticipant] = useState<Participant>({});
	const [participants, setParticipants] = useState<Player[]>([]);
	const [ranking, setRanking] = useState<number>(1);
	const [nextClaimInterval, setNextClaimInterval] = useState<string>("");
	const [balance, setBalance] = useState<number>(0);
	const [contract, setContract] = useState<Contract | undefined>(undefined);
	const [error] = useState<Error | null>(null);

	useEffect(() => {
		if (!address) {
			return;
		}

		initContract();
	}, [address]); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		if (!contract) {
			return;
		}

		initParticipant();
	}, [contract]); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		if (participant && participant.isPresent) {
			getTokens();
			getParticipants();
			calculateNextClaimInterval();
		}
	}, [participant]); // eslint-disable-line react-hooks/exhaustive-deps

	const initContract = () => {
		const signer = provider.getSigner();

		const contract = new Contract(
			process.env.REACT_APP_CONTRACT_ADDRESS!,
			MainArtifact.abi,
			signer,
		);

		setContract(contract);
	};

	const calculateNextClaimInterval = () => {
		const nowTimestamp = new Date().getTime() / 1000;
		const timestampDiff = (participant.timestamp || 0) - nowTimestamp;

		if (timestampDiff > 0) {
			setNextClaimInterval(formatDistanceToNow(
				new Date((participant.timestamp || 0) * 1000),
				{ includeSeconds: true }
			));
		}
	};

	const initParticipant = async () => {
		try {
			const data = await contract!.handleReadParticipant(address);

			if (data && data.isPresent) {
				handleUpdateParticipant(data);
			} else {
				const initialTokenAllowance = await contract!.handleReadInititalAllowance();

				setParticipant({
					allowedTokenBalance: initialTokenAllowance.toNumber(),
					level: 1,
					experiencePoints: 0,
					timestamp: 0,
					plantIds: [],
					isPresent: false,
				});
			}
		} catch (error: any) {
			throw error;
		}
	};

	const getTokens = useCallback(async () => {
		try {
			const balance = await contract!.balanceOf(address, 0);

			setBalance(balance.toNumber());
		} catch (error: any) {
			throw error;
		}
	}, [contract]); // eslint-disable-line react-hooks/exhaustive-deps

	const getParticipants = async () => {
		let participants: Player[] = [];

		try {
			const accounts = await contract!.handleReadParticipantAddresses();

			for (let i = 0; i < accounts.length; i++) {
				const account = accounts[i];

				const data = await contract!.handleReadParticipant(account);
				const levelCost = await contract!.handleReadParticipantLevelCost();

				if (data && data.isPresent) {
					participants.push(formatParticipant(
						data,
						{
							levelCost: levelCost.toNumber(),
						},
						account
					) as Player);
				}
			}

			participants = orderBy(participants, ["level", "experiencePoints"], ["desc", "desc"]);
			const ranking = findIndex(participants, ["address", address]) + 1;

			setRanking(ranking);
			setParticipants(participants);
		} catch (error: any) {
			throw error;
		}
	};

	const handleUpdateParticipant = async (data: any) => {
		const levelCost = await contract!.handleReadParticipantLevelCost();

		setParticipant(formatParticipant(
			data,
			{
				levelCost: levelCost.toNumber(),
			}
		));
	};

 	return {
		participant,
		participants,
		ranking,
		balance,
		contract,
		nextClaimInterval,
		loading,
		error,
		handleUpdateParticipant,
	};
};


export default useContract;
