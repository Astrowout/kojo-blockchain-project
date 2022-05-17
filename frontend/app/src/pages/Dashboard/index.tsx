import {
	Layout,
	PlantCard,
	Tokens,
} from "../../components";
import { useTranslation } from "../../hooks";

const DashboardPage = () => {
	const { t } = useTranslation();

	const plant = {
		id: "uuid-1",
		type: "Purple Haze Sativa",
		waterNeeded: 2,
		health: 3,
		hydration: 80,
		image: "https://images.unsplash.com/photo-1458014854819-1a40aa70211c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
	};

	return (
		<Layout
			title={t("dashboard.title")}
			description={t("dashboard.description.1", <b className="font-semibold">{t("dashboard.description.2")}</b>)}
		>
			<div className="grid xl:grid-cols-2 gap-x-8 gap-y-12 w-full">
				<Tokens compact={false} />

				<div className="xl:col-span-2 grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-8">
					<div className="lg:col-span-2">
						<h2 className="font-semibold text-lg md:text-xl lg:text-2xl mb-4">
							{ t("dashboard.plants") }
						</h2>

						<div className="grid lg:grid-cols-2">
							<PlantCard
								key={plant.id}
								id={plant.id}
								type={plant.type}
								waterNeeded={plant.waterNeeded}
								health={plant.health}
								hydration={plant.hydration}
								image={plant.image}
							/>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	)
}

export default DashboardPage;
