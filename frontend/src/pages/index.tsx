import type { NextPage, GetStaticProps } from "next";
import Head from "next/head";

import {
	MHeader,
	MFooter,
	MHero,
	MPartners,
	MHow,
	MToken,
	MCta,
} from "@/components";

interface HomePageProps {
	domain: string;
}

const HomePage: NextPage<HomePageProps> = ({
	domain = "",
}) => {
	return (
		<div>
			<Head>
				<title>Welcome to kojo</title>
				<meta name="description" content="Kojo aims at designing a solution that brings blockchain technology and water management together. We challenge ourselves in designing an NFT-game where end-users can grow seeds into plants based on their sustainable water consumption." />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<MHeader />

			<main>
				<MHero />
				<MPartners />
				<MHow />
				<MToken />
				<MCta
					className="pt-10 sm:pt-16"
				/>
			</main>

			<MFooter
				domain={domain}
				className="pt-40 -mt-20"
			/>
	   </div>
  	)
}

export const getStaticProps: GetStaticProps = async () => {
	return {
		props: {
			domain: process.env.APP_DOMAIN,
		}
	}
}

export default HomePage;