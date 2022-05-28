import { useState } from "react";
import { providers } from "ethers";
const { Magic } = require('magic-sdk');

const customNetworkOptions = {
	rpcUrl: "https://rpc-mumbai.maticvigil.com/", // Polygon testnet RPC URL
	chainId: 80001, // Polygon testnet chain id
}
const magic = new Magic(process.env.REACT_APP_MAGIC_PUBLIC_KEY!, { network: customNetworkOptions });

const useMagicLink = (setProvider: (provider: any) => void) => {
	const [isLoading, setIsLoading] = useState(false);
	// const [error, setError] = useState<Error | null>(null);

	const connectMagicLink = async (email: string): Promise<void> => {
		setIsLoading(true);

		try {
			const provider = new providers.Web3Provider(magic.rpcProvider as any);
			await magic.auth.loginWithMagicLink({ email });

			setProvider(provider);

			return;
		} catch (error) {

		} finally {
			setIsLoading(false);
		}
	};

 	return {
		isLoading,
		connectMagicLink,
	 };
};


export default useMagicLink;
