import { useState, useEffect } from "react";
import { Contract } from "ethers";
import { Error } from "../types";
import Artifact from "../artifacts/contracts/KojoV1.sol/KojoV1.json";
// import { useIonToast } from "@ionic/react";

const useContract = (provider: any) => {
	const [isLoading] = useState(false);
	// const [present] = useIonToast();
	const [contract, setContract] = useState<Contract | null>(null);
	const [error] = useState<Error | null>(null);

	useEffect(() => {
		if (!provider) {
			return;
		}

		initContract();

		return () => {
			// cleanup
		}
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const initContract = () => {
		const signer = provider.getSigner();

		setContract(new Contract(
			process.env.REACT_APP_CONTRACT_ADDRESS!,
			Artifact.abi,
			signer,
		));
	}

 	return {
		contract,
		isLoading,
		error,
	};
};


export default useContract;
