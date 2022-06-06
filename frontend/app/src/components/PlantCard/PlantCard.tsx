import { FC, memo, ReactNode } from "react";
import cn from "classnames";
import { IonCard } from "@ionic/react";

import { PlantCardProps } from "./PlantCard.types";
import { useTranslation } from "../../hooks";
import Stat from "../Stat/Stat";
import Icon from "../Icon/Icon";

const PlantCard: FC<PlantCardProps> = ({
	className,
	id = 1,
	type = "",
	image = "",
	health = null,
	hydration = null,
	waterNeeded = 2,
}) => {
	const { t } = useTranslation();

	const getHealth = (value: number | null): ReactNode => {
		if (value) {
			return t(`health.${value}`);
		}
	}

	const renderDrop = (index: number) => {
		const solid = waterNeeded > index;

		return (
			<Icon
				key={index}
				name={solid ? "DropSolid" : "Drop"}
			/>
		)
	}

	return (
		<IonCard
			routerLink={`/plants/${id}`}
			routerDirection="forward"
			className={cn(className, "flex flex-col group m-0 rounded-2xl overflow-hidden shadow-2xl shadow-emerald-900/20")}
		>
			<div className="relative aspect-square overflow-hidden">
				<img
					src={image}
					alt={`${type} plant`}
					className="w-full h-full object-cover lg:group-hover:scale-110 duration-300 ease-out transition-transform"
				/>

				<div className="flex space-x-0.5 absolute top-4 right-4 text-emerald-600 bg-white/80 px-1 py-0.5 rounded shadow-2xl">
					{ [...Array(3)].map((_drop, index) => renderDrop(index)) }
				</div>
			</div>

			<h2 className="text-emerald-600 font-bold text-lg lg:text-xl py-4 px-4 lg:px-6 border-y">
				{ type }
			</h2>

			<div className="grid gap-y-8 px-4 lg:px-6 py-6">
				<Stat
					icon="Hearts"
					label={t("stats.health")}
				>
					{ getHealth(health) }
				</Stat>

				<Stat
					icon="Hydration"
					label={t("stats.hydration")}
				>
					<span className="flex items-center space-x-1">
						<Icon
							name="KojoToken"
							size={16}
							className="text-emerald-600 mt-0.5"
						/>

						<span>
							{ hydration }
						</span>
					</span>
				</Stat>
			</div>
	  	</IonCard>
	)
}

export default memo(PlantCard);
