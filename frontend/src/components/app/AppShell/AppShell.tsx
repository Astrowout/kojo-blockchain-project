import { PropsWithChildren, useEffect } from "react";
import type { NextPage } from "next";
import { IonApp, IonContent } from "@ionic/react";
import { StatusBar, Style } from "@capacitor/status-bar";

type AppShellProps = {};

const AppShell: NextPage<PropsWithChildren<AppShellProps>> = ({
	children,
}) => {
	useEffect(() => {
		window.matchMedia("(prefers-color-scheme: dark)").addListener(async (status) => {
			try {
				  await StatusBar.setStyle({
					style: status.matches ? Style.Dark : Style.Light,
				  });
			} catch {}
		});
	}, []);

	return (
		<IonApp className="font-sans">
			<IonContent>
      			{children}
  			</IonContent>
		</IonApp>
	)
};

export default AppShell;
