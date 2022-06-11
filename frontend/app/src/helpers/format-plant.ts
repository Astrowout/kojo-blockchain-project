import { WATER_COST_MAPPING } from "../config";
import { Plant } from "../types";
import axios from "./axios";

const formatPlant = async (tokenId: number, data: any, uri: string): Promise<Plant | null> => {
	try {
		const uriParts = uri.split("/");
		const serverURI = `${process.env.REACT_APP_STORAGE_URL}/ipfs/metadata/${uriParts[uriParts.length - 1]}`;

		const { data: metadata } = await Promise.race([
			axios.get(uri),
			axios.get(serverURI),
		]);

		if (metadata) {
			const imageUriParts = metadata.image.split("/");
			const image = metadata.centralServer
				? `${process.env.REACT_APP_STORAGE_URL}/ipfs/img/${imageUriParts[imageUriParts.length - 1]}`
				: metadata.image;

			return {
				id: tokenId,
				type: metadata.name,
				description: metadata.description,
				growth: data.level.toNumber(),
				health: data.lifes.toNumber(),
				waterNeeded: WATER_COST_MAPPING[data.levelCost.toNumber()],
				hydration:data.experiencePoints.toNumber(),
				image,
			}
		}
	} catch (error) {};

	return null;
};

export default formatPlant;
