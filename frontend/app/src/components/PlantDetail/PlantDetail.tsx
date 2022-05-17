import { FC, ReactNode } from "react";
import cn from "classnames";

import { PlantDetailProps } from "./PlantDetail.types";
import { useTranslation } from "../../hooks";
import Stat from "../Stat/Stat";
import Icon from "../Icon/Icon";

const PlantDetail: FC<PlantDetailProps> = ({
	children,
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
			<Icon
				key={index}
				name={solid ? "DropSolid" : "Drop"}
			/>
		)
	}

	return (
		<div
			className={cn(className, "grid lg:grid-cols-2 gap-x-12 gap-y-8")}
		>
			<div className="relative aspect-square overflow-hidden rounded-2xl shadow-2xl shadow-emerald-900/20">
				<img
					src={image}
					alt={`${type} plant`}
					className="w-full h-full object-cover"
				/>

				<div className="flex space-x-0.5 absolute top-4 right-4 text-emerald-600 bg-white/80 px-1 py-0.5 rounded shadow-2xl">
					{ [...Array(3)].map((_drop, index) => renderDrop(index)) }
				</div>
			</div>

			<div className="lg:mt-24">
				<h2 className="text-emerald-600 font-semibold text-xl md:text-2xl xl:text-3xl">
					{ type }
				</h2>

				<div className="grid gap-y-6 py-6">
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

				<div>
					{ children }
				</div>
			</div>
	  	</div>
	)
}

export default PlantDetail;
