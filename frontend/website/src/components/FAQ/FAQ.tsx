import { FunctionComponent, useMemo } from "react";
import cn from "classnames";

import { HeroProps } from "./FAQ.types";
import Link from "next/link";


const FAQ: FunctionComponent<HeroProps> = ({ className }) => {
	return (
		<section className={cn(className, "")}>
			<div className='max-w-screen-xl mx-auto flex flex-col items-center gap-x-24 gap-y-12 px-6 sm:px-10 py-10 sm:py-16 justify-center min-h-[60vh]'>

				<div className="mt-14">
					<h1 className="font-serif text-center font-display uppercase text-4xl leading-tight md:text-5xl md:leading-tight xl:text-6xl xl:leading-tight">Frequently Asked Questions</h1>
				</div>

				<div className="w-full">
					<ul className="w-full">
						<li className="w-full bg-background p-8 rounded-md mb-5">
							<p className="font-sans uppercase text-xs font-bold mt-2 mb-4">How can I participate?</p>
							<p className="font-mono text-xs leading-6">After registering your IoT water meter and collecting Mumbai tokens, you can connect to our amazing dApp and off you go!</p>
						</li>

						<li className="w-full bg-background p-8 rounded-md mb-5">
							<p className="font-sans uppercase text-xs font-bold mt-2 mb-4">Do I need to buy Mumbai tokens?</p>
							<p className="font-mono text-xs leading-6">Mumbai tokens are freely available and can be obtained via the <span className="text-kojo"><Link href='https://faucet.polygon.technology/'>Polygon Faucet</Link></span>.</p>
						</li>

						<li className="w-full bg-background p-8 rounded-md mb-5">
							<p className="font-sans uppercase text-xs font-bold mt-2 mb-4">What if I move to another house or apartment?</p>
							<p className="font-mono text-xs leading-6">Using DID technology, you can claim your new household/IoT water meter and transfer your already earned Kojo tokens & NFTs.</p>
						</li>

						<li className="w-full bg-background p-8 rounded-md mb-5">
							<p className="font-sans uppercase text-xs font-bold mt-2 mb-4">Where can I sell or buy NFT plants?</p>
							<p className="font-mono text-xs leading-6">Using the <span className="text-kojo"><Link href='https://opensea.io/'>OpenSea</Link></span> market place, you can sell your precious plants or buy that one plant that you were dreaming of.</p>
						</li>
					</ul>
				</div>


			</div>
		</section>
	)
}

export default FAQ;
