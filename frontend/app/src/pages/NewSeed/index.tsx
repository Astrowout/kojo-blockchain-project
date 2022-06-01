import {
	Alert,
	Button,
	Layout, Tokens,
} from "../../components";
import { useTranslation } from "../../hooks";
import { TX_OPTIONS } from "../../config";
import { SessionContext } from "../../context";
import { useIonToast } from "@ionic/react";
import { useContext, useState } from "react";
import { delay } from "../../helpers";

const NewSeedPage = () => {
	const { t, ts } = useTranslation();
	const {
		participant,
		contract,
		blockTime,
		balance,
		postNotification,
		setParticipant,
	} = useContext(SessionContext);
	const [loading, setLoading] = useState(false);
	const [present] = useIonToast();

	const handleMintSuccess = async (_participant: any, plant: number) => {
		console.log("PlantMinted", {
			participant: _participant,
			plant,
		});

		if (_participant && _participant.isPresent && setParticipant) {
			setLoading(false);

			setParticipant({
				allowedTokenBalance: _participant.allowedTokenBalance.toNumber(),
				level: _participant.allowedTokenBalance.toNumber(),
				experiencePoints: _participant.experiencePoints.toNumber(),
				plantIds: _participant.plantIds,
				isPresent: _participant.isPresent,
			});

			present({
				color: "secondary",
				duration: 4000,
				position: "top",
				message: ts("newSeed.success"),
			});

			postNotification && postNotification({
				message: ts("newSeed.success"),
				url: "/tabs/plants",
			});
		}
	};

	const handleBuyPlant = async () => {
		setLoading(true);

		try {
			contract?.once("PlantMinted", handleMintSuccess);

			await contract!.handleBuyPlant(TX_OPTIONS);
			await delay(blockTime ? (blockTime + 3) * 1000 : 5000);

			if (loading) {
				setLoading(false);
			}
		} catch (error: any) {
			setLoading(false);

			throw error;
		}
	};

	return (
		<Layout
			title={t("newSeed.title")}
			description={t("newSeed.description.1", <b className="font-bold">{t("newSeed.description.2")}</b>, <b className="font-bold">{participant?.plantIds?.length || 0}</b>)}
			backLink
		>
			<div className="flex flex-col flex-grow items-center justify-between">
				<div className="grid grid-cols-1 xl:grid-cols-2 gap-x-8 gap-y-8 xl:gap-y-12 w-full">
					<Tokens />

					{!balance && (
						<Alert
							className="row-start-2 xl:col-span-2"
							icon="Danger"
						>
							<p>
								{ t("newSeed.noBalance", <b className="font-bold">{t("newSeed.price")}</b>) }
							</p>
						</Alert>
					)}
				</div>

				<Button
					onClick={handleBuyPlant}
					icon="Plus"
					className="mt-8"
					disabled={!balance}
					loading={loading}
				>
					{ t("newSeed.cta") }
				</Button>
			</div>
		</Layout>
	)
}

export default NewSeedPage;
