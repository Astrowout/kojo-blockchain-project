import type { NextPage } from "next";
import Head from "next/head";

import {
	Header,
	Footer,
	Hero,
	Partners,
	How,
	Roadmap,
	Trust,
	Team,
	FAQ,
	CTA
} from "@/components";

const HomePage: NextPage = () => (
	<div>
		<Head>
			<title>Kojo | Grow a Virtual Garden</title>
			<meta name="description" content="Kojo aims at designing a solution that brings blockchain technology and water management together. We challenge ourselves in designing an NFT-game where end-users can grow seeds into plants based on their sustainable water consumption." />
		</Head>

		<Header />

		<main className="mt-40">
			<div id='hero'>
				<Hero id="hero" />
			</div>

			<How id="how" />

			<Roadmap id="roadmap" />

			<Trust id="trust" />

			<div id='team' style={{scrollMarginTop: "4rem"}}>
				<Team />
			</div>

			<div id='partners' style={{scrollMarginTop: "7rem"}}>
				<Partners />
			</div>

			<div id='faq' style={{scrollMarginTop: "4rem"}}>
				<FAQ />
			</div>






			<CTA />
			{/* <Token /> */}


			{/* <Cta className="pt-10 sm:pt-16" /> */}
		</main>

		<Footer />
	</div>
)

export default HomePage;
