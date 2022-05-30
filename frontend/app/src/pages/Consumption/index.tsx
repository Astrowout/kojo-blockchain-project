import {
	EmptyState,
	Layout,
} from "../../components";
import { useTranslation } from "../../hooks";

const ConsumptionPage = () => {
	const { t } = useTranslation();

	return (
		<Layout
			title={t("consumption.title")}
			description={t("consumption.description")}
		>
			<EmptyState
				message={t("consumption.empty")}
				icon="Roadmap"
				className="flex-grow justify-center"
			/>
		</Layout>
	)
}

export default ConsumptionPage;
