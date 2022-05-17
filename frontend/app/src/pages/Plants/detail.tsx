import {
	Layout,
	Tokens,
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

	return (
		<Layout
			title={plant.type}
			description={t("plants.description.1", <b className="font-semibold">{t("plants.description.2")}</b>)}
			backLink
		>
			<div className="grid xl:grid-cols-2 gap-x-8 gap-y-12 w-full">
				<Tokens />

				<div className="xl:col-span-2">
					plant comes here
				</div>
			</div>
		</Layout>
	)
}

export default PlantPage;
