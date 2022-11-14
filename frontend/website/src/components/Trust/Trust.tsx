import { FC, useMemo } from "react";
import cn from "classnames";

import { TrustProps } from "./Trust.types";

const Trust: FC<TrustProps> = ({
	className = "",
	id = "",
}: any) => {
	const items = useMemo(() => [
		{
			title: 'Minted on Polygon',
			image: '/assets/images/polygon.png',
		},
		{
			title: 'Hosted on IPFS',
			image: '/assets/images/ipfs.png',
		},
		{
			title: 'Utility NFT',
			image: '/assets/images/utility.png',
		},
		{
			title: 'Metaverse Compatible',
			image: '/assets/images/meta.png',
		},
	], [])

	return (
		<section id={id} className={cn(className, "bg-background")}>
			<div className='max-w-screen-xl mx-auto flex flex-col items-center gap-x-24 gap-y-12 px-6 sm:px-10 py-10 sm:py-16 justify-center min-h-[60vh]'>

				<div className="mt-14">
					<h1 className="font-serif text-center font-display uppercase text-4xl leading-tight md:text-5xl md:leading-tight xl:text-6xl xl:leading-tight">Trust Indicators</h1>
					<p className="font-sans uppercase text-sm text-center mt-3 mb-8">built right from the beginning</p>
					{/* <p className="font-mono text-center text-xs leading-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat</p> */}
				</div>

				<div>
					<ul className="flex flex-col md:flex-row">
					{items.map((item) => 	<li className="flex flex-col items-center mx-3 mb-6" >
							<div className="w-[30vw] h-[30vw] md:w-28 md:h-28 m-6 rounded-md bg-black opacity-10 bg-contain bg-center bg-no-repeat bg-transparent" style={{ backgroundImage: `url(${item.image})` }}></div>
							<p className="font-sans uppercase text-xs mt-2 mb-4 md:w-20 text-center">{item.title}</p>
						</li>)}
					</ul>
				</div>


			</div>
		</section>
	)
}

export default Trust;
