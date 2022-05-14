import { IonContent } from "@ionic/react";
import {
	Layout,
} from "../../components";
import { useTranslation } from "../../hooks";

const PlantsPage = () => {
	const { t } = useTranslation();

	return (
		<Layout
			title={t("plants.title")}
			description={t("plants.description.1", <b className="font-semibold">{t("plants.description.2")}</b>)}
		>
			<IonContent>
				plants page
			</IonContent>
		</Layout>
	)
}

export default PlantsPage;
