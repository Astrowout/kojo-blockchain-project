import { IonContent, IonPage } from "@ionic/react";
import {
	AppLayout,
} from "@/components";
import { useTranslation } from "@hooks";

const DashboardPage = () => {
	const { t } = useTranslation();

	return (
		<IonPage>
			<AppLayout
				title={t("dashboard.title")}
				description={t("dashboard.description.1", <b className="font-semibold">{t("dashboard.description.2")}</b>)}
			>
				<IonContent>
					dashboard page
				</IonContent>
			</AppLayout>
		</IonPage>
	)
}

export default DashboardPage;
