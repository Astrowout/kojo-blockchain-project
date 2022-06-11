import { WATER_COST_MAPPING } from "../config";
import { Plant } from "../types";
import axios from "./axios";

const formatPlant = async (tokenId: number, data: any, uri: string): Promise<Plant | null> => {
	try {
		const { data: metadata } = await axios.get(uri);

		console.log(metadata);

		if (metadata) {
			return {
				id: tokenId,
				type: metadata.name,
				description: metadata.description,
				health: data.level.toNumber(),
				waterNeeded: WATER_COST_MAPPING[data.levelCost.toNumber()],
				hydration:data.experiencePoints.toNumber(),
				image: metadata.image,
			}
		}
	} catch (error) {};

	return null;
};

export default formatPlant;
