import { FunctionComponent } from 'react';
import cn from "classnames";

type FooterProps = {
	className?: string,
	version?: string,
}

const Footer: FunctionComponent<FooterProps> = ({ className, version = "0.0.1" }) => {
	return (
		<footer className={cn(className, 'py-4 bg-slate-100')}>
			<div className='2xl:container mx-auto px-4 sm:px-6 text-center'>
				{version && (
					<span className='text-sm font-mono'>
						v{version}
					</span>
				)}
			</div>
		</footer>
	)
}

export default Footer;
