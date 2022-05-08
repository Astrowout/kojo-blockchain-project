import { useEffect, useState } from "react";

const useWallet = () => {
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
	  console.log("INIT useWallet");

	  return () => {
		// cleanup
	  }
	}, []);

	const handleConnect = async (): Promise<void> => {
		setIsLoading(true);
		await console.log("connect walletconnect");
		setIsLoading(false);
	};

 	return {
		handleConnect,
		isLoading,
	};
};


export default useWallet;
