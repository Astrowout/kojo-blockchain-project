import { WATER_COST_MAPPING } from "../config";
import axios from "./axios";

const formatPlant = async (tokenId: number, data: any, uri: string) => {
	let metadata: any = null;
	const controller = new AbortController();

	setTimeout(async () => {
		if (!metadata) {
			controller.abort();

			const pinataUri = uri.replace("https://cloudflare-ipfs.com/", "https://gateway.pinata.cloud/");
			const res = await axios.get(pinataUri);
			metadata = res.data;
		}
	}, 2000);

	const res = await axios.get(uri, {
		signal: controller.signal,
	});
	metadata = res.data;

	return {
		id: tokenId,
		type: metadata.name,
		description: metadata.description,
		health: data.level.toNumber(),
		waterNeeded: WATER_COST_MAPPING[data.levelCost.toNumber()],
		hydration: data.experiencePoints.toNumber(),
		image: metadata.image,
	}
};

export default formatPlant;
