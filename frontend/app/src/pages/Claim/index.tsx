import { useIonToast } from "@ionic/react";
import { useContext, useEffect, useState } from "react";
import {
	Button,
	Claim,
	Layout,
} from "../../components";
import { TX_OPTIONS } from "../../config";
import { GlobalContext, SessionContext } from "../../context";
import { useTranslation } from "../../hooks";

const ClaimPage = () => {
	const { t, ts } = useTranslation();
	const {
		participant,
		contract,
		postNotification,
		handleUpdateParticipant,
	} = useContext(SessionContext);
	const {
		provider,
	} = useContext(GlobalContext);
	const [loading, setLoading] = useState(false);
	const [present] = useIonToast();

	const handleClaimSuccess = async (_participant: any, amount: number) => {
		if (_participant && _participant.isPresent) {
			setLoading(false);

			handleUpdateParticipant(_participant);

			present({
				color: "secondary",
				duration: 5000,
				position: "top",
				message: ts("claim.success", amount),
			});

			postNotification && postNotification({
				message: ts("claim.success", amount),
				url: "",
			});
		}

		provider?.removeAllListeners();
		contract?.removeAllListeners();
	};

	const claimTokens = async () => {
		setLoading(true);

		try {
			if (participant && participant.isPresent) {
				await contract?.handleClaimMonthlyReward(TX_OPTIONS);
			} else {
				await contract?.handleClaimStartTokens(TX_OPTIONS);
			}

			provider.once("block", () => {
				contract?.once("TokensClaimed", handleClaimSuccess);
			});
		} catch (error: any) {
			setLoading(false);

			present({
				color: "danger",
				duration: 6000,
				position: "top",
				message: error.message,
			});

			throw error;
		}
	};

	useEffect(() => {
	  return () => {
		provider?.removeAllListeners();
		contract?.removeAllListeners();
	  }
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

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
