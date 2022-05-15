import { createContext, FC, PropsWithChildren } from "react";
import { Loader } from "../components";
import { useAuth } from "../hooks";

type AuthContextType = {
	address?: string | null;
	disconnect?: () => void;
}

const AuthContext = createContext<AuthContextType>({});

export const AuthProvider: FC<PropsWithChildren<any>> = ({ children }) => {
	const { address, isGlobalLoading, disconnect } = useAuth();

	if (isGlobalLoading) {
		return (
			<div className="w-screen h-screen flex items-center justify-center">
				<Loader />
			</div>
		)
	}

	return (
		<AuthContext.Provider
			value={{
				address,
				disconnect,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthContext;
