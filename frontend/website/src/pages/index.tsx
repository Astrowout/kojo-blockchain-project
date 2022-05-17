import type { NextPage } from "next";
import Head from "next/head";

import {
	Header,
	Footer,
	Hero,
	Partners,
	How,
	Token,
	Cta,
} from "@/components";

const HomePage: NextPage = () => (
	<div>
		<Head>
			<title>Welcome to kojo</title>
			<meta name="description" content="Kojo aims at designing a solution that brings blockchain technology and water management together. We challenge ourselves in designing an NFT-game where end-users can grow seeds into plants based on their sustainable water consumption." />
		</Head>

		<Header />

		<main>
			<Hero />
			<Partners />
			<How />
			<Token />
			<Cta className="pt-10 sm:pt-16" />
		</main>

		<Footer className="pt-40 -mt-20" />
	</div>
)

export default HomePage;
