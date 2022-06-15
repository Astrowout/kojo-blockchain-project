import { useContext, useEffect, useState } from "react";
import {
	Button,
	EmptyState,
	Layout,
	Loader,
	PlantCard,
	Tokens,
} from "../../components";
import { SessionContext } from "../../context";
import { formatPlant } from "../../helpers";
import { useTranslation } from "../../hooks";
import { Plant } from "../../types";

const PlantsPage = () => {
	const { t } = useTranslation();
	const [plants, setPlants] = useState<Plant[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const {
		participant,
		contract,
	} = useContext(SessionContext);

	const getPlants = async () => {
		setLoading(true);

		let plants: Plant[] = [];

		try {
			const plantIds = participant.plantIds || [];

			for (let i = 0; i < plantIds.length; i++) {
				const tokenId = plantIds[i];

				const data = await contract!.handleReadPlant(tokenId);
				const uri = await contract!.uri(tokenId);

				if (data && data.isPresent) {
					const plant = await formatPlant(tokenId, data,uri);

					if (plant) {
						plants.push(plant);
					}
				}
			}

			setPlants(plants);
		} catch (error: any) {
			throw error;
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (participant && participant.isPresent) {
			getPlants();
		}
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const renderContent = () => {
		return plants && !!plants.length ? (
			<div className="grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12">
				{plants.map((plant: Plant) => (
					<PlantCard
						key={plant.id}
						id={plant.id!}
						type={plant.type!}
						waterNeeded={plant.waterNeeded}
						growth={plant.growth}
						hydration={plant.hydration}
						image={plant.image!}
					/>
				))}
			</div>
		) : (
			<EmptyState
				message={t("plants.empty")}
				icon="Seeds"
				className=" min-h-[40rem]"
			>
				<Button
					url="/new-seed"
					compact
				>
					{t("plants.emptyCta")}
				</Button>
			</EmptyState>
		)
	}

	return (
		<Layout
			title={t("plants.title")}
			description={t("plants.description", <b className="font-bold">{participant?.plantIds?.length || 0}</b>)}
		>
			<div className="grid xl:grid-cols-2 gap-x-8 gap-y-8 md:gap-y-7 w-full">
				<Tokens />

				{plants && !!plants.length && (
					<EmptyState
						message={t("plants.mint")}
						compact
					>
						<Button
							url="/new-seed"
							compact
						>
							{t("plants.mintCta")}
						</Button>
					</EmptyState>
				)}

				<div className="xl:col-span-2 w-full">
					{loading ? (
						<Loader />
					) : renderContent()}
				</div>
			</div>
		</Layout>
	)
}

export default PlantsPage;
