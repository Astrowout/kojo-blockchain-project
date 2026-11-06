import { useState } from "react";
import { providers } from "ethers";
const { Magic } = require('magic-sdk');

const magic = new Magic(process.env.REACT_APP_MAGIC_PUBLIC_KEY!);

const useMagicLink = (setProvider: (provider: any) => void) => {
	const [loading, setLoading] = useState(false);
	// const [error, setError] = useState<Error | null>(null);

	const connectMagicLink = async (email: string): Promise<void> => {
		setLoading(true);

		try {
			const provider = new providers.Web3Provider(magic.rpcProvider as any);
			await magic.auth.loginWithMagicLink({ email });

			setProvider(provider);

			return;
		} catch (error) {

		} finally {
			setLoading(false);
		}
	};

 	return {
		loading,
		connectMagicLink,
	 };
};


export default useMagicLink;
