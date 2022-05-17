import {
	Button,
	Layout,
} from "../../components";
import { useTranslation } from "../../hooks";

const ClaimPage = () => {
	const { t } = useTranslation();
	const claimableAmount = 640;

	const claimTokens = () => null;

	return (
		<Layout
			title={t("claim.title")}
			description={t("claim.description", <b className="font-semibold">{claimableAmount} of kojos</b>)}
			backLink
			withOverlap={false}
		>
			<div className="flex flex-col justify-end items-center flex-grow">
				<Button
					onClick={claimTokens}
					icon="Check"
				>
					{ t("claim.cta") }
				</Button>
			</div>
		</Layout>
	)
}

export default ClaimPage;
