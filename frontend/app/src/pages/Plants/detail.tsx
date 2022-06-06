import { useIonToast } from "@ionic/react";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import {
	Button,
	Layout,
	Loader,
	PlantDetail,
} from "../../components";
import { TX_OPTIONS } from "../../config";
import { GlobalContext, SessionContext } from "../../context";
import { formatPlant } from "../../helpers";
import { useTranslation } from "../../hooks";
import { Plant } from "../../types";

const PlantPage = () => {
	const { t, ts } = useTranslation();
	const { id } = useParams<any>();
	const {
		contract,
		handleUpdateParticipant,
		postNotification,
	} = useContext(SessionContext);
	const {
		provider,
	} = useContext(GlobalContext);
	const [plant, setPlant] = useState<Plant | null>(null);
	const [loading, setLoading] = useState(false);
	const [present] = useIonToast();

	const getPlant = async () => {
		const data = await contract?.handleReadPlant(id);
		const uri = await contract?.uri(id);

		setPlant(await formatPlant(id, data, uri));
	}

	const handleHydrateSuccess = async (_participant: any, _plant: number) => {
		console.log("PlantWatered", {
			participant: _participant,
			plant: _plant,
		});

		if (_participant && _participant.isPresent) {
			setLoading(false);

			handleUpdateParticipant(_participant);

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

		provider?.removeAllListeners();
		contract?.removeAllListeners();
	};

	const hydratePlant = async () => {
		setLoading(true);

		try {
			const tx = await contract!.handleWaterPlant(TX_OPTIONS);

			provider.once(tx.hash, () => {
				contract?.once("PlantWatered", handleHydrateSuccess);
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
		getPlant();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return !plant ? (
		<Loader />
	) : (
		<Layout
			title={plant.type}
			description={t("plants.detailDescription", <b className="font-bold">{plant.hydration}</b>)}
			backLink
		>
			<div>
				<PlantDetail
					id={plant.id}
					type={plant.type}
					waterNeeded={plant.waterNeeded}
					health={plant.health}
					hydration={plant.hydration}
					image={plant.image}
				>
					<Button
						onClick={hydratePlant}
						icon="Hydration"
						fluid
						loading={loading}
					>
						{ t("plants.hydrate") }
					</Button>
				</PlantDetail>
			</div>
		</Layout>
	)
}

export default PlantPage;
