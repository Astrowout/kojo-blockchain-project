import { useIonToast } from "@ionic/react";
import { useContext, useState } from "react";
import {
	Button,
	Claim,
	Layout,
} from "../../components";
import { TX_OPTIONS } from "../../config";
import { SessionContext } from "../../context";
import { delay } from "../../helpers";
import { useTranslation } from "../../hooks";

const ClaimPage = () => {
	const { t, ts } = useTranslation();
	const {
		participant,
		contract,
		blockTime,
		postNotification,
		setParticipant,
	} = useContext(SessionContext);
	const [loading, setLoading] = useState(false);
	const [present] = useIonToast();

	const handleClaimSuccess = async (data: any, amount: number) => {
		console.log("TokensClaimed", {
			data,
			amount,
		});

		if (data && data.isPresent && setParticipant) {
			setLoading(false);

			setParticipant({
				allowedTokenBalance: data.allowedTokenBalance.toNumber(),
				level: data.allowedTokenBalance.toNumber(),
				experiencePoints: data.experiencePoints.toNumber(),
				plantIds: data.plantIds,
				isPresent: data.isPresent,
			});

			present({
				color: "secondary",
				duration: 5000,
				position: "top",
				message: ts("claim.success", amount),
			});

			postNotification && postNotification({
				message: ts("claim.success", amount),
				url: "#",
			});
		}
	};

	const claimTokens = async () => {
		setLoading(true);

		try {
			contract?.once("TokensClaimed", handleClaimSuccess);

			await contract!.handleClaimStartTokens(TX_OPTIONS);
			await delay(blockTime ? (blockTime + 3) * 1000 : 5000);

			if (loading) {
				console.log("loading timeout", loading);

				setLoading(false);
			}
		} catch (error: any) {
			setLoading(false);

			throw error;
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
