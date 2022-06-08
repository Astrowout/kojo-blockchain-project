import { useState, useEffect, useCallback } from "react";
import { Contract } from "ethers";
import { Error, Plant, Participant, Player } from "../types";
import { axios, formatParticipant, formatPlant } from "../helpers";

// @ts-ignore:next-line
import MainArtifact from "../artifacts/contracts/KojoV1.sol/KojoV1.json";

const useContract = (provider: any, address?: string) => {
	const [loading] = useState(false);
	const [participant, setParticipant] = useState<Participant>({});
	const [participants, setParticipants] = useState<Player[]>([]);
	const [blockTime, setBlockTime] = useState<number>(5);
	const [balance, setBalance] = useState<number>(0);
	const [plants, setPlants] = useState<Plant[]>([]);
	const [contract, setContract] = useState<Contract | undefined>(undefined);
	const [error] = useState<Error | null>(null);

	useEffect(() => {
		if (!address) {
			return;
		}

		initContract();
		fetchBlocktime();
	}, [address]); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		if (!contract) {
			return;
		}

		initParticipant();
		getParticipants();
	}, [contract]); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		if (participant && participant.isPresent) {
			getTokens();
			getPlants();
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

	const fetchBlocktime = useCallback(async () => {
		try {
			const { data } = await axios.get("https://gasstation-mumbai.matic.today/v2");

			if (data) {
				setBlockTime(data.blockTime);
			}
		} catch (error: any) {
			throw error;
		}
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const initParticipant = async () => {
		try {
			const data = await contract!.handleReadParticipant(address);

			if (data && data.isPresent) {
				handleUpdateParticipant(data);
			} else {
				const initialTokenAllowance = await contract!.handleReadInititalAllowance();

				setParticipant({
					allowedTokenBalance: initialTokenAllowance.toNumber(),
					level: 0,
					experiencePoints: 0,
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

	const getPlants = async () => {
		let plants: Plant[] = [];

		try {
			const plantIds = participant.plantIds || [];

			for (let i = 0; i < plantIds.length; i++) {
				const tokenId = plantIds[i];

				const data = await contract!.handleReadPlant(tokenId);
				const uri = await contract!.uri(tokenId);

				if (data && data.isPresent) {
					const _plant = await formatPlant(tokenId, data,uri);

					if (_plant) {
						plants.push(_plant);
					}
				}
			}

			setPlants(plants);
		} catch (error: any) {
			throw error;
		}
	};

	const getParticipants = async () => {
		let participants: Player[] = [];

		try {
			const accounts = await contract!.handleReadParticipantAddress();

			console.log(accounts);

			for (let i = 0; i < accounts.length; i++) {
				const account = accounts[i];

				const data = await contract!.handleReadParticipant(account);

				if (data && data.isPresent) {
					participants.push(formatParticipant(data, account) as Player);
				}
			}

			setParticipants(participants);
		} catch (error: any) {
			throw error;
		}
	};

	const handleUpdateParticipant = (data: any) => {
		setParticipant(formatParticipant(data));
	};

 	return {
		participant,
		participants,
		balance,
		plants,
		contract,
		minsUntilNextClaim: Math.ceil((189 * blockTime) / 60),
		loading,
		error,
		handleUpdateParticipant,
	};
};


export default useContract;
