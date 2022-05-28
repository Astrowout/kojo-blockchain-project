import { useState, useEffect, useCallback } from "react";
import { Contract } from "ethers";
import { Error, User } from "../types";
import Artifact from "../artifacts/contracts/KojoV1.sol/KojoV1.json";
import { axios } from "../helpers";

const useContract = (provider: any, address?: string) => {
	const [isLoading] = useState(false);
	const [user] = useState<User | null>(null);
	const [blockTime, setBlockTime] = useState<number>(5);
	const [contract, setContract] = useState<Contract | null>(null);
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

		initUserState();

		return () => {
			// cleanup
		}
	}, [contract]); // eslint-disable-line react-hooks/exhaustive-deps

	const initContract = () => {
		const signer = provider.getSigner();

		setContract(new Contract(
			process.env.REACT_APP_CONTRACT_ADDRESS!,
			Artifact.abi,
			signer,
		));
	}

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
	}, [contract]); // eslint-disable-line react-hooks/exhaustive-deps

	const initUserState = useCallback(async () => {
		try {
			// const owner = await contract!.handleBuyPlant(address);
			// console.log(owner);
		} catch (error: any) {
			throw error;
		}

		// call setUser()
	}, [contract]); // eslint-disable-line react-hooks/exhaustive-deps

 	return {
		user,
		minsUntilNextClaim: Math.ceil((189 * blockTime) / 60),
		isLoading,
		error,
	};
};


export default useContract;
