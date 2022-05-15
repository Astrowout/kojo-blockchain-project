import {
	Layout,
} from "../../components";
import { useTranslation } from "../../hooks";

const ClaimPage = () => {
	const { t } = useTranslation();
	const claimableAmount = 640;

	return (
		<Layout
			title={t("claim.title")}
			description={t("claim.description", <b className="font-semibold">{claimableAmount} of kojos</b>)}
			backLink
			withOverlap={false}
		>
			claim page
		</Layout>
	)
}

export default ClaimPage;
