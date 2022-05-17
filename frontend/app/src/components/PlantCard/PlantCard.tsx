import { FC, ReactNode } from "react";
import cn from "classnames";
import { IonCard } from "@ionic/react";

import { PlantCardProps } from "./PlantCard.types";
import { useTranslation } from "../../hooks";
import Stat from "../Stat/Stat";
import Icon from "../Icon/Icon";

const PlantCard: FC<PlantCardProps> = ({
	className,
	id = "",
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
			<Icon name={solid ? "DropSolid" : "Drop"} />
		)
	}

	return (
		<IonCard
			routerLink={`/plants/${id}`}
			routerDirection="forward"
			className={cn(className, "flex flex-col m-0 rounded-2xl overflow-hidden shadow-2xl")}
		>
			<div className="relative">
				<img
					src={image}
					alt={`${type} plant`}
					className="w-full h-full"
				/>

				<div className="flex space-x-0.5 absolute top-4 right-4 text-emerald-600 bg-white px-1 py-0.5 rounded shadow-2xl">
					{ [...Array(3)].map((_drop, index) => renderDrop(index)) }
				</div>
			</div>

			<div className="py-4 px-4 lg:px-6 border-y">
				<h2 className="text-emerald-600 font-semibold text-lg lg:text-xl">
					{ type }
				</h2>
			</div>

			<div className="grid gap-y-6 px-4 lg:px-6 py-6">
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
					{ hydration }%
				</Stat>
			</div>
	  	</IonCard>
	)
}

export default PlantCard;
