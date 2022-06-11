import { FC, memo, ReactNode } from "react";
import cn from "classnames";

import { PlantDetailProps } from "./PlantDetail.types";
import { useTranslation } from "../../hooks";
import Stat from "../Stat/Stat";
import Icon from "../Icon/Icon";

const PlantDetail: FC<PlantDetailProps> = ({
	children,
	className = "",
	type = "",
	image = "",
	health = 3,
	growth = 1,
	hydration = 0,
	waterNeeded = null,
}) => {
	const { t } = useTranslation();

	const getGrowth = (value: number | null): ReactNode => {
		if (value) {
			return t(`growth.${value}`);
		}
	}

	const getHealth = (value: number | null): ReactNode => {
		if (value) {
			return t(`health.${value}`);
		}
	}

	const renderDrop = (index: number) => {
		const solid = waterNeeded || 2 > index;

		return (
			<Icon
				key={index}
				name={solid ? "DropSolid" : "Drop"}
			/>
		)
	}

	return (
		<div
			className={cn(className, "grid xl:grid-cols-2 gap-x-12 gap-y-8")}
		>
			<div className="relative aspect-square overflow-hidden rounded-2xl shadow-2xl shadow-emerald-600/20 border-solid border-8 border-white">
				<img
					src={image}
					alt={`${type} plant`}
					className="w-full h-full object-cover bg-white"
				/>
			</div>

			<div className="xl:mt-24">
				<h2 className="text-emerald-600 font-bold text-xl md:text-2xl xl:text-3xl">
					{ type }
				</h2>

				<div className="grid gap-y-6 py-6">
					{waterNeeded && (
						<Stat
							icon="Seeds"
							label={t("stats.waterNeeded")}
							>
							<span className="flex space-x-0.5 text-emerald-600 bg-white/80 rounded shadow-2xl">
								{ [...Array(3)].map((_drop, index) => renderDrop(index)) }
							</span>
						</Stat>
					)}

					<Stat
						icon="Hearts"
						label={t("stats.growth")}
					>
						{ getGrowth(growth) }
					</Stat>

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

				{children && (
					<div className="mt-6">
						{ children }
					</div>
				)}
			</div>
	  	</div>
	)
}

export default memo(PlantDetail);
