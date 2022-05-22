import {
	Button,
	Layout,
	PlantDetail,
} from "../../components";
import { useTranslation } from "../../hooks";

const PlantPage = () => {
	const { t } = useTranslation();

	const plant = {
		id: "uuid-1",
		type: "Purple Haze Sativa",
		waterNeeded: 2,
		health: 3,
		hydration: 80,
		image: "https://images.unsplash.com/photo-1458014854819-1a40aa70211c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
	};

	const hydratePlant = () => null;

	return (
		<Layout
			title={plant.type}
			description={t("plants.description.1", <b className="font-bold">{t("plants.description.2")}</b>)}
			backLink
		>
			<div>
				<PlantDetail
					id={plant.id}
					type={plant.type}
					waterNeeded={plant.waterNeeded}
					health={plant.health}
					hydration={plant.hydration}
					image={plant.image}
				>
					<Button
						onClick={hydratePlant}
						icon="Hydration"
						fluid
					>
						{ t("plants.hydrate") }
					</Button>
				</PlantDetail>
			</div>
		</Layout>
	)
}

export default PlantPage;
