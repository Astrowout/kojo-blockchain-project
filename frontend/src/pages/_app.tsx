import type { AppProps } from "next/app";
import Head from "next/head";
import Router from "next/router";
import { setupIonicReact } from "@ionic/react";
import { Capacitor } from "@capacitor/core";
import { SplashScreen } from "@capacitor/splash-screen";

import "@ionic/react/css/core.css";

import "@/styles/main.css";
import "@/styles/ionic-theme.css";

setupIonicReact();

function MyApp({ Component, pageProps }: AppProps) {
	if (Capacitor.isNativePlatform()) {
		Router.push("/app");
		SplashScreen.hide();
	}

	return (
		<>
			<Head>
				<title>Welcome to kojo</title>
			</Head>

			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
