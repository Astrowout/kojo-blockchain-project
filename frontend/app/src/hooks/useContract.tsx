import { useState, useEffect, useCallback } from "react";
import { BigNumber, Contract } from "ethers";
import { Error, Plant, Tokens, Participant } from "../types";
import { axios } from "../helpers";

// @ts-ignore:next-line
import Artifact from "../artifacts/contracts/KojoV1.sol/KojoV1.json";

const useContract = (provider: any, address?: string) => {
	const [loading] = useState(false);
	const [participant, setParticipant] = useState<Participant | undefined>(undefined);
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

		initTokens();
		initParticipant();

		return () => {
			// cleanup
		}
	}, [contract]); // eslint-disable-line react-hooks/exhaustive-deps

	const initContract = async () => {
		const signer = provider.getSigner();

		const contract = new Contract(
			process.env.REACT_APP_CONTRACT_ADDRESS!,
			Artifact.abi,
			signer,
		);

		contract.on("TokensClaimed", (from, to, value, event) => {
			console.log({
				from: from,
				to: to,
				value: value.toNumber(),
				data: event
			});
		});

		console.log(await contract.owner());


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

	const initTokens = useCallback(async () => {
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
			const participant = await contract!.handleReadParticipant(address);

			if (participant && participant.isPresent) {
				setParticipant(participant);
			} else {
				const initialTokenAllowance = await contract!.initialTokenAllowance();

				setParticipant({
					allowedTokenBalance: initialTokenAllowance.toNumber(),
					level: 0,
					experiencePoints: 0,
					plantIds: [],
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
		contract,
		minsUntilNextClaim: Math.ceil((189 * blockTime) / 60),
		loading,
		error,
	};
};


export default useContract;
