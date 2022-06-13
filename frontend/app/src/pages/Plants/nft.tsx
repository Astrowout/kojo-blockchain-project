import { IonPage } from "@ionic/react";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import {
	FullscreenImage, Loader,
} from "../../components";
import { SessionContext } from "../../context";
import { formatPlant } from "../../helpers";
import { Plant } from "../../types";

const NftPage = () => {
	const { id } = useParams<any>();
	const {
		contract,
	} = useContext(SessionContext);

	const [plant, setPlant] = useState<Plant | null>(null);

	const getPlant = async () => {
		const data = await contract?.handleReadPlant(id);
		const uri = await contract?.uri(id);

		setPlant(await formatPlant(id, data, uri));
	}

	useEffect(() => {
		getPlant();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<IonPage>
			{!plant ? (
				<Loader />
			) : (
				<FullscreenImage
					image={plant!.image!}
					alt={`${plant!.type} plant`}
				/>
			)}
		</IonPage>
	)
}

export default NftPage;
