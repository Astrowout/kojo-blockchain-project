import type { AppProps } from "next/app";
import Router from "next/router";
import { Capacitor } from "@capacitor/core";
import { SplashScreen } from "@capacitor/splash-screen";

import "@/styles/main.css";
import "@ionic/react/css/core.css";

function MyApp({ Component, pageProps }: AppProps) {
	if (Capacitor.isNativePlatform()) {
		Router.push("/app");
		SplashScreen.hide();
	}

	return <Component {...pageProps} />;
}

export default MyApp;
