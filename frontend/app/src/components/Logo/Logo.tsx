import { FunctionComponent } from "react";
import cn from "classnames";

const Logo: FunctionComponent<any> = ({
	className,
	w = 40,
	blank = false,
}) => {
	return (
		<div className={cn(className, "flex items-center")}>
			<svg width={w} viewBox="0 0 62 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M12.61 2.21C12.25 1.93 11.75 1.93 11.39 2.21C9.49001 3.66 3.87997 8.39 3.90997 13.9C3.90997 18.36 7.54001 22 12.01 22C16.48 22 20.11 18.37 20.11 13.91C20.12 8.48 14.5 3.67 12.61 2.21Z" stroke={blank ? 'currentColor' : '#059669'} strokeWidth="1.5" strokeMiterlimit="10"/>
				<path d="M12 2V22" stroke={blank ? 'currentColor' : '#059669'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
				<path d="M12 14L17.5 19.5" stroke={blank ? 'currentColor' : '#059669'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
				<path d="M12 13.96L18 7.96001" stroke={blank ? 'currentColor' : '#059669'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
			</svg>

			<p
				className={cn("font-display uppercase text-3xl -ml-16", {
					"text-black": !blank,
				})}
			>
				Kōjō
			</p>
		</div>
	)
}

export default Logo;
