import { IonContent } from "@ionic/react";
import {
	Layout,
} from "../../components";
import { useTranslation } from "../../hooks";

const DashboardPage = () => {
	const { t } = useTranslation();

	return (
		<Layout
			title={t("dashboard.title")}
			description={t("dashboard.description.1", <b className="font-semibold">{t("dashboard.description.2")}</b>)}
		>
			<IonContent>
				dashboard page
			</IonContent>
		</Layout>
	)
}

export default DashboardPage;
