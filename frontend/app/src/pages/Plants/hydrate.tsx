import { useIonToast } from "@ionic/react";
import { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import {
	AmountInput,
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

const HydratePage = () => {
	const { t, ts } = useTranslation();
	const history = useHistory();
	const { id } = useParams<any>();
	const {
		contract,
		balance,
		handleUpdateParticipant,
		postNotification,
	} = useContext(SessionContext);
	const {
		provider,
	} = useContext(GlobalContext);
	const [plant, setPlant] = useState<Plant | null>(null);
	const [loading, setLoading] = useState(false);
	const [amount, setAmount] = useState<number>(80);
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
				message: ts("hydrate.success", plant?.type!, amount),
			});

			postNotification && postNotification({
				message: ts("hydrate.success", plant?.type!, amount),
				url: `/plants/${id}`,
			});

			history.replace(`/plants/${id}`);
		}

		provider?.removeAllListeners();
		contract?.removeAllListeners();
	};

	const hydratePlant = async () => {
		setLoading(true);

		try {
			await contract!.handleWaterPlant(id, amount, TX_OPTIONS);

			provider.once("block", () => {
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
			title={t("hydrate.title")}
			description={t("hydrate.description", <b className="font-bold">{balance}</b>)}
			backLink
		>
			<div className="flex flex-col justify-between items-center flex-grow">
				<PlantDetail
					type={plant.type}
					health={plant.health}
					hydration={plant.hydration}
					image={plant.image}
				>
					<div className="space-y-6">
						<AmountInput
							value={amount}
							onChange={setAmount}
						/>

						<Button
							onClick={hydratePlant}
							icon="Hydration"
							loading={loading}
							fluid
						>
							{ t("hydrate.cta") }
						</Button>
					</div>
				</PlantDetail>
			</div>
		</Layout>
	)
}

export default HydratePage;
