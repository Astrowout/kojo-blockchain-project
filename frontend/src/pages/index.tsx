import type { NextPage, GetStaticProps } from 'next';
import Head from 'next/head';

import {
	MHeader,
	MFooter,
} from "@/components";

interface Props {
	version?: string;
}

const Index: NextPage<Props> = ({ version }) => {
	return (
		<div>
			<Head>
				<title>kojo</title>
				<meta name="description" content="Kojo aims at designing a solution that brings blockchain technology and water management together. We challenge ourselves in designing an NFT-game where end-users can grow seeds into plants based on their sustainable water consumption." />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<MHeader />

			<main>
				main content comes here
			</main>

			<MFooter version={version} />
	   </div>
  	)
}

export const getStaticProps: GetStaticProps = async () => {
	return {
		props: {
			version: process.env.APP_VERSION
		}
	}
}

export default Index;
