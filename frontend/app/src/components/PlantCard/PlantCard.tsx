import { FC } from "react";
import cn from "classnames";
import { IonRouterLink } from "@ionic/react";

import { Icon } from "..";

import { PlantCardProps } from "./PlantCard.types";

const PlantCard: FC<PlantCardProps> = ({
	className,
	children,
	unread = false,
	url = "",
	icon = "Dashboard",
	onClick = () => null,
}) => {
	const classes = cn(className, "inline-flex space-x-5 lg:space-x-6 whitespace-nowrap items-center text-lg lg:text-xl text-emerald-900");

	const renderContent = () => (
		<span className={classes}>
			<span className="relative">
				<Icon name={icon} size={32} />

				{unread && (
					<span className="absolute flex top-0.5 right-0.5">
						<span className="animate-ping absolute flex w-full h-full rounded-full bg-red-500 opacity-60"></span>
						<span className="relative flex rounded-full h-3 w-3 border border-white bg-red-500"></span>
					</span>
				)}
			</span>

			<span>
				{children}
			</span>
		</span>
	)

	return url ? (
		<IonRouterLink
			routerLink={url}
			routerDirection="root"
		>
			{ renderContent() }
		</IonRouterLink>
	) : (
		<button
			type="button"
		>
			{ renderContent() }
		</button>
	)
}

export default PlantCard;
