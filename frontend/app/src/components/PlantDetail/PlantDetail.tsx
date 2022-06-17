import { FC, memo, ReactNode } from "react";
import cn from "classnames";

import { useTranslation } from "../../hooks";
import Stat from "../Stat/Stat";
import Icon from "../Icon/Icon";
import { IonRouterLink } from "@ionic/react";

const PlantDetail: FC<any> = ({
	children,
	className = "",
	id = 1,
	type = "",
	image = "",
	health = 3,
	growth = 1,
	hydration = 0,
	waterNeeded = null,
	plant = {}
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

	// const renderDrop = (index: number) => {
	// 	const solid = waterNeeded || 2 > index;

	// 	return (
	// 		<Icon
	// 			key={index}
	// 			name={solid ? "DropSolid" : "Drop"}
	// 		/>
	// 	)
	// }

	return (
		<div
			className={cn(className, "grid xl:grid-cols-2 gap-x-12 gap-y-8")}
		>
			<IonRouterLink
				className="relative group aspect-square cursor-zoom-in"
				routerLink={`/nft/${id}`}
			>
				<div className="group-hover:opacity-100 opacity-0 rounded-md transition-opacity absolute inset-0 outline outline-2" />

				<div
					className="overflow-hidden rounded-md border-solid border-8 border-background"
				>
					<img
						src={image}
						alt={`${type} plant`}
						className="w-full h-full object-cover bg-background"
					/>
				</div>
			</IonRouterLink>

			<div className="xl:mt-24">
				<h2 className="text-black font-display uppercase font-bold text-xl md:text-2xl xl:text-3xl">
					{ type }
				</h2>

				<div className="grid gap-y-6 py-6">
					{/* {waterNeeded && (
						<Stat
							icon="Seeds"
							label={t("stats.waterNeeded")}
							>
							<span className="flex space-x-0.5 text-emerald-600 bg-white/80 rounded shadow-2xl">
								{ [...Array(3)].map((_drop, index) => renderDrop(index)) }
							</span>
						</Stat>
					)} */}

					<Stat
						icon="Plants"
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

									<Stat

					label="Family"
				>
					{plant.family}
				</Stat>
				<Stat

					label="Variant"
				>
					{plant.variant}
				</Stat>
				<Stat

					label="Soil"
				>
					{plant.soil}
				</Stat>
				<Stat

					label="Pot"
				>
					{plant.pot}
				</Stat>
				<Stat

					label="Floating"
				>
					{plant.floating}
				</Stat>
				<Stat
					label="Setting"
				>
					{plant.setting}
				</Stat>
				<Stat
					label="Mark"
				>
					{plant.mark}
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
