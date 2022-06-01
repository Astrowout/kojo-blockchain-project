import { useState, useEffect, useCallback } from "react";
import { BigNumber, Contract } from "ethers";
import { Error, Plant, Tokens, Participant } from "../types";
import { axios } from "../helpers";

// @ts-ignore:next-line
import MainArtifact from "../artifacts/contracts/KojoV1.sol/KojoV1.json";

const useContract = (provider: any, address?: string) => {
	const [loading] = useState(false);
	const [participant, setParticipant] = useState<Participant>({});
	const [blockTime, setBlockTime] = useState<number>(5);
	const [tokens, setTokens] = useState<Tokens>({
		balance: 0,
		plantIds: [],
	});
	const [plants] = useState<Plant[]>([]);
	const [contract, setContract] = useState<Contract | undefined>(undefined);
	const [error] = useState<Error | null>(null);

	useEffect(() => {
		if (!address) {
			return;
		}

		initContract();
		fetchBlocktime();

		return () => {
			// cleanup
		}
	}, [address]); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		if (!contract) {
			return;
		}

		initParticipant();

		return () => {
			// cleanup
		}
	}, [contract]); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		if (participant && participant.isPresent) {
			getTokens();
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

		// call setUser()
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const getTokens = useCallback(async () => {
		try {
			const [balance, ...plantIds] = await contract!.balanceOfBatch([address], [0]);

			setTokens({
				balance: balance.toNumber(),
				plantIds: plantIds.map((plantId: BigNumber) => plantId.toNumber()),
			});
		} catch (error: any) {
			throw error;
		}
	}, [contract]); // eslint-disable-line react-hooks/exhaustive-deps

	const initParticipant = useCallback(async () => {
		try {
			const data = await contract!.handleReadParticipant(address);

			if (data && data.isPresent) {
				setParticipant({
					allowedTokenBalance: data.allowedTokenBalance.toNumber(),
					level: data.allowedTokenBalance.toNumber(),
					experiencePoints: data.experiencePoints.toNumber(),
					plantIds: data.plantIds,
					isPresent: data.isPresent,
				});
			} else {
				const initialTokenAllowance = await contract!.handleReadInititalAllowance();

				setParticipant({
					allowedTokenBalance: initialTokenAllowance.toNumber(),
					level: 0,
					experiencePoints: 0,
					plantIds: [],
					isPresent: data.isPresent,
				});
			}
		} catch (error: any) {
			throw error;
		}
	}, [contract]); // eslint-disable-line react-hooks/exhaustive-deps

 	return {
		participant,
		balance: tokens?.balance,
		plants,
		blockTime,
		contract,
		minsUntilNextClaim: Math.ceil((189 * blockTime) / 60),
		loading,
		error,
		setParticipant,
	};
};


export default useContract;
