import { useState } from "react";
import { Error } from "../types";
// import { useIonToast } from "@ionic/react";

const useContract = () => {
	const [isLoading] = useState(false);
	// const [present] = useIonToast();
	const [error] = useState<Error | null>(null);

 	return {
		isLoading,
		error,
	};
};


export default useContract;
