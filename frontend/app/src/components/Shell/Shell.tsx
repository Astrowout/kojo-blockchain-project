import { FC, PropsWithChildren } from "react";
import { IonContent } from "@ionic/react";

type AppShellProps = {};

const AppShell: FC<PropsWithChildren<AppShellProps>> = ({children}) => {
	return (
		<IonContent className="font-sans">
			{children}
		</IonContent>
	)
};

export default AppShell;
