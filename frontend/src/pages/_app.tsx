import type { AppProps } from "next/app";

import "@/styles/main.css";
import "@ionic/react/css/core.css";

function MyApp({ Component, pageProps }: AppProps) {
	return <Component {...pageProps} />;
}

export default MyApp;
