import { useState, useEffect, useCallback } from "react";
import { Contract, utils } from "ethers";
// import { useIonToast } from "@ionic/react";
import { Error, User } from "../types";
import Artifact from "../artifacts/contracts/KojoV1.sol/KojoV1.json";

const useContract = (provider: any, address?: string) => {
	// const [present] = useIonToast();
	const [isLoading] = useState(false);
	const [user] = useState<User | null>(null);
	const [contract, setContract] = useState<Contract | null>(null);
	const [error] = useState<Error | null>(null);

	useEffect(() => {
		if (!address) {
			return;
		}

		initContract();

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
		isLoading,
		error,
	};
};


export default useContract;
