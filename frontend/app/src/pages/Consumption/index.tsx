import {
	Layout,
	Tokens,
} from "../../components";
import { useTranslation } from "../../hooks";

const ConsumptionPage = () => {
	const { t } = useTranslation();

	return (
		<Layout
			title={t("consumption.title")}
			description={t("consumption.description.1", <b className="font-bold">{t("consumption.description.2")}</b>)}
		>
			<div className="grid xl:grid-cols-2 gap-x-8 gap-y-12 w-full">
				<Tokens />
			</div>
		</Layout>
	)
}

export default ConsumptionPage;
