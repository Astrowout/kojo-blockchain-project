import {
	Layout, Tokens,
} from "../../components";
import { useTranslation } from "../../hooks";

const NewSeedPage = () => {
	const { t } = useTranslation();

	return (
		<Layout
			title={t("newSeed.title")}
			description={t("newSeed.description.1", <b className="font-bold">{t("newSeed.description.2")}</b>)}
			backLink
		>
			<div className="grid xl:grid-cols-2 gap-x-8 gap-y-12 w-full">
				<Tokens />
			</div>
		</Layout>
	)
}

export default NewSeedPage;
