import {
	Layout, Tokens,
} from "../../components";
import { useTranslation } from "../../hooks";

const DashboardPage = () => {
	const { t } = useTranslation();

	return (
		<Layout
			title={t("dashboard.title")}
			description={t("dashboard.description.1", <b className="font-semibold">{t("dashboard.description.2")}</b>)}
		>
			<div className="grid xl:grid-cols-2 gap-x-8 gap-y-12 w-full">
				<Tokens compact={false} />
			</div>
		</Layout>
	)
}

export default DashboardPage;
