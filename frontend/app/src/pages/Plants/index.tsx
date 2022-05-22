import {
	Layout,
	PlantCard,
	Tokens,
} from "../../components";
import { useTranslation } from "../../hooks";

const PlantsPage = () => {
	const { t } = useTranslation();

	const plants = [
		{
			id: "uuid-1",
			type: "Purple Haze Sativa",
			waterNeeded: 2,
			health: 3,
			hydration: 80,
			image: "https://images.unsplash.com/photo-1458014854819-1a40aa70211c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
		},
	]

	return (
		<Layout
			title={t("plants.title")}
			description={t("plants.description.1", <b className="font-bold">{t("plants.description.2")}</b>)}
		>
			<div className="grid xl:grid-cols-2 gap-x-8 gap-y-12 w-full">
				<Tokens />

				<div className="xl:col-span-2 w-full grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-8">
					{plants.map((plant) => (
						<PlantCard
							key={plant.id}
							id={plant.id}
							type={plant.type}
							waterNeeded={plant.waterNeeded}
							health={plant.health}
							hydration={plant.hydration}
							image={plant.image}
						/>
					))}
				</div>
			</div>
		</Layout>
	)
}

export default PlantsPage;
