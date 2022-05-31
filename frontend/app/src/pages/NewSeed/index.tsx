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

const NewSeedPage = () => {
	const { t } = useTranslation();
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

	const handleMintSuccess = async (data: any, amount: number) => {
		console.log("PlantMinted", {
			data,
			amount,
		});

		if (data && data.isPresent && setParticipant) {
			setParticipant({
				allowedTokenBalance: data.allowedTokenBalance.toNumber(),
				level: data.allowedTokenBalance.toNumber(),
				experiencePoints: data.experiencePoints.toNumber(),
				plantIds: data.plantIds,
			});

			present({
				color: "secondary",
				duration: 5000,
				position: "top",
				message: t("newSeed.success") as unknown as string,
			});

			postNotification && postNotification({
				message: t("newSeed.success") as unknown as string,
				url: "/tabs/plants",
			});
		}
	};

	const handleBuyPlant = async () => {
		setLoading(true);

		try {
			contract?.once("PlantMinted", handleMintSuccess);

			await contract!.handleBuyPlant(TX_OPTIONS);

			setTimeout(() => {
				if (loading) {
					setLoading(false);
				}
			}, blockTime ? (blockTime + 3) * 1000 : 5000);
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
				<div className="grid xl:grid-cols-2 gap-x-8 gap-y-12 w-full">
					<Tokens />

					{!balance && (
						<Alert
							className="row-start-2 col-span-2"
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
