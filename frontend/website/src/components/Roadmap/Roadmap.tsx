import { FunctionComponent, useMemo } from "react";
import cn from "classnames";

import { HeroProps } from "./Roadmap.types";


const Roadmap: FunctionComponent<HeroProps> = ({ className }) => {
	const items = useMemo(() => [
		{
			period: '2023 Q1',
			title: 'Product Launch',
			paragraph: 'Kojo launches with its core features. Mint seeds, harvest rewards, grow plants, develop a garden, track consumption, compete worldwide.'
		},
		{
			period: '2023 Q2',
			title: 'Rare Seed Airdrops',
			paragraph: 'In rare occasions, wind carries over rare seeds into your garden. The bigger your garden, the bigger the chance of discovering exotic plant breeds in your garden.'
		},
		{
			period: '2023 Q3',
			title: 'A Metaverse Garden',
			paragraph: 'Port your plants over to the metaverse and use them as decorative elements or skins in games!'
		},
		{
			period: '2023 Q4',
			title: 'Te be continued...',
			paragraph: 'Many more ideas and concepts await development. Stay tuned for more info!'
		},
	], [])

	return (
		<section className={cn(className, "")}>
			<div className='max-w-screen-xl mx-auto flex flex-col items-center gap-x-24 gap-y-12 px-6 sm:px-10 py-10 sm:py-16 justify-center min-h-[60vh]'>

				<div className="mt-14">
					<h1 className="font-serif text-center font-display uppercase text-4xl leading-tight md:text-5xl md:leading-tight xl:text-6xl xl:leading-tight">Roadmap</h1>
					<p className="font-title uppercase text-sm text-center mt-3 mb-8">to a greener planet</p>
					<p className="font-text text-center text-xs leading-6">Kojo is an ungoing project as long as there are yet opportunities to be explored to sustain water consumption. Let's start building!</p>
				</div>

				<div className="w-full">
					<ul className="w-full">
					{items.map((item) => 	<li className="w-full bg-background p-8 rounded-md mb-5">
							<p className="font-display text-4xl uppercase opacity-5">{item.period}</p>
							<p className="font-title uppercase text-xs font-bold mt-2 mb-4">{item.title}</p>
							<p className="font-text text-xs leading-6">{item.paragraph}</p>
						</li>)}
					</ul>
				</div>


			</div>
		</section>
	)
}

export default Roadmap;
