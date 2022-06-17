import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import {
	Button,
	Layout,
	Loader,
	PlantDetail,
} from "../../components";
import { SessionContext } from "../../context";
import { formatPlant } from "../../helpers";
import { useTranslation } from "../../hooks";
import { Plant } from "../../types";

const PlantPage = () => {
	const { t } = useTranslation();
	const { id } = useParams<any>();
	const {
		contract,
		balance,
	} = useContext(SessionContext);
	const [plant, setPlant] = useState<Plant | null>(null);

	const getPlant = async () => {
		const data = await contract?.handleReadPlant(id);
		const uri = await contract?.uri(id);

		setPlant(await formatPlant(id, data, uri));
	}

	useEffect(() => {
		getPlant();
	}, [balance]); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<Layout
			title={plant?.type || ""}
			description={t("plants.detailDescription", <b className="font-bold">{plant?.hydration || 0}</b>)}
			backLink
		>
			<div className="flex flex-col justify-between items-center flex-grow">
				{!plant ? (
					<Loader />
				) : (
					<>
						<PlantDetail
							id={id}
							type={plant.type}
							waterNeeded={plant.waterNeeded}
							growth={plant.growth}
							health={plant.health}
							hydration={plant.hydration}
							image={plant.image}
							plant={plant}
						/>

						<Button
							url={`/plants/${id}/hydrate`}
							icon="Hydration"
							className="mt-16"
						>
							{ t("plants.hydrate") }
						</Button>
					</>
				)}
			</div>
		</Layout>
	)
}

export default PlantPage;
