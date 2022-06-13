import { FunctionComponent, useMemo } from "react";
import cn from "classnames";

const Team: FunctionComponent = ({ className }: any) => {
	const items = useMemo(() => [
		{
			name: 'Eva Vergucht',
			titles: ['Strategy Engineer', 'Project Manager'],
			image: '/assets/images/4-5.png',
		},
		{
			name: 'Jerom Verschoote',
			titles: ['Visual Artist', 'Smart Contract Engineer'],
			image: '/assets/images/1-5.png',
		},
		{
			name: 'Wout vandesompele',
			titles: ['Front-End Engineer', 'Blockchain Engineer'],
			image: '/assets/images/2-5.png',
		},
		{
			name: 'Gaël Fincioen',
			titles: ['Token Economics', 'Sales Manager'],
			image: '/assets/images/3-5.png',
		},
	], [])

	return (
		<section className={cn(className, "")}>
			<div className='max-w-screen-xl mx-auto flex flex-col items-center gap-x-24 gap-y-12 px-6 sm:px-10 py-10 sm:py-16 justify-center min-h-[60vh]'>

				<div className="mt-14">
					<h1 className="font-serif text-center font-display uppercase text-4xl leading-tight md:text-5xl md:leading-tight xl:text-6xl xl:leading-tight">Meet the team</h1>
					<p className="font-title uppercase text-sm text-center mt-3 mb-8">Yes, we do hug trees.</p>
					{/* <p className="font-text text-center text-xs leading-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat</p> */}
				</div>

				<div>
					<ul className="flex flex-col md:flex-row">
					{items.map((item) => 	<li className="flex flex-col items-center mx-3 mb-6">
							<div className="w-[60vw] h-[60vw] md:w-56 md:h-56 rounded-md bg-black bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${item.image})` }}></div>
							<p className="font-display uppercase mt-3 text-center w-[8.3rem] mb-2">{item.name}</p>
							<div className="flex flex-col items-center">
								{item.titles.map((title) => <p className="font-title uppercase text-xs text-center text-thin mb-1">{title}</p>)}
							</div>
						</li>)}
					</ul>
				</div>


			</div>
		</section>
	)
}

export default Team;
