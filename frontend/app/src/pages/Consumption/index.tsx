import { IonContent } from "@ionic/react";
import {
	Layout,
} from "../../components";
import { useTranslation } from "../../hooks";

const ConsumptionPage = () => {
	const { t } = useTranslation();

	return (
		<Layout
			title={t("consumption.title")}
			description={t("consumption.description.1", <b className="font-semibold">{t("consumption.description.2")}</b>)}
		>
			<IonContent>
				dashboard page
			</IonContent>
		</Layout>
	)
}

export default ConsumptionPage;
