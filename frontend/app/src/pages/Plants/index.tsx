import {
	Layout,
	Tokens,
} from "../../components";
import { useTranslation } from "../../hooks";

const PlantsPage = () => {
	const { t } = useTranslation();

	return (
		<Layout
			title={t("plants.title")}
			description={t("plants.description.1", <b className="font-semibold">{t("plants.description.2")}</b>)}
		>
			<div className="grid xl:grid-cols-2 gap-x-8 gap-y-12 w-full">
				<Tokens />
			</div>
		</Layout>
	)
}

export default PlantsPage;
