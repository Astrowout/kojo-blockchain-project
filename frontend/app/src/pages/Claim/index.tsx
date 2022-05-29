import { useContext, useState } from "react";
import {
	Button,
	Claim,
	Layout,
} from "../../components";
import { TX_OPTIONS } from "../../config";
import { SessionContext } from "../../context";
import { useTranslation } from "../../hooks";

const ClaimPage = () => {
	const { t } = useTranslation();
	const {
		participant,
		contract,
	} = useContext(SessionContext);
	const [loading, setLoading] = useState(false);

	const claimTokens = async () => {
		setLoading(true);

		console.log("claimTokens");

		try {
			const res = await contract!.handleClaimStartTokens(TX_OPTIONS);
			console.log(res);
		} catch (error: any) {
			throw error;
		} finally {
			setLoading(false);
		}
	};

	return (
		<Layout
			title={t("claim.title")}
			description={participant ? t("claim.description", <b className="font-bold">{participant?.allowedTokenBalance}</b>) : t("claim.empty")}
			backLink
			withOverlap={false}
		>
			<div className="flex flex-col justify-between items-center flex-grow">
				<Claim amount={participant?.allowedTokenBalance || 0} />

				<Button
					onClick={claimTokens}
					icon="Check"
					className="mt-8"
					disabled={!participant?.allowedTokenBalance}
					loading={loading}
				>
					{ t("claim.cta") }
				</Button>
			</div>
		</Layout>
	)
}

export default ClaimPage;
