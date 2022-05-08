
import { setupIonicReact } from "@ionic/react";
import Document, { Html, Head, Main, NextScript } from "next/document";

setupIonicReact();

class MyDocument extends Document {
	render() {
		return (
			<Html>
				<Head>
					<meta name="format-detection" content="telephone=no" />
					<meta name="msapplication-tap-highlight" content="no" />

					<link rel="manifest" href="/manifest.json" />

					<link rel="shortcut icon" type="image/png" href="/favicon.png" />

					{/* add to homescreen for ios */}
					<meta name="apple-mobile-web-app-capable" content="yes" />
					<meta name="apple-mobile-web-app-title" content="Ionic App" />
					<meta name="apple-mobile-web-app-status-bar-style" content="black" />

					{/* load google fonts Abhaya Libre & Poppins */}
					<link
						href="https://fonts.googleapis.com/css2?family=Abhaya+Libre:wght@400;700&family=Poppins:wght@400;600;700&display=swap"
						rel="stylesheet"
					/>
				</Head>

				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}

export default MyDocument;
