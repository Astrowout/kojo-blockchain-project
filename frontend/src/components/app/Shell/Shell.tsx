import { PropsWithChildren, useEffect } from "react";
import type { NextPage } from "next";
import { IonApp, IonPage } from "@ionic/react";
import { StatusBar, Style } from "@capacitor/status-bar";

type AppShellProps = {};

// const IonApp = dynamic(() => import("@ionic/react").then((m) => m.IonApp) as any, {
// 	ssr: false,
// }) as any;

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
			<IonPage>
      			{children}
  			</IonPage>
		</IonApp>
	)
};

export default AppShell;
