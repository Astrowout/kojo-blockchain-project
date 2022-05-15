import { useState, useEffect } from "react";
import { Error } from "../types";
// import { useIonToast } from "@ionic/react";

const useContract = () => {
	const [isLoading] = useState(false);
	// const [present] = useIonToast();
	const [error] = useState<Error | null>(null);

	useEffect(() => {
		//

	  return () => {
		// cleanup
	  }
	}, []); // eslint-disable-line react-hooks/exhaustive-deps


 	return {
		isLoading,
		error,
	};
};


export default useContract;
