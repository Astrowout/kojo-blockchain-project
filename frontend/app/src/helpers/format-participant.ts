import { BigNumber } from "ethers";
import { Participant, Player } from "../types";

const formatParticipant = (data: any, { levelCost }: any, account?: string): Participant | Player => {
	return {
		...(account && { address: account }),
		allowedTokenBalance: data.allowedTokenBalance.toNumber(),
		level: data.level.toNumber(),
		experiencePoints: data.experiencePoints.toNumber(),
		plantIds: data.plantIds.map((plantId: BigNumber) => plantId.toNumber()),
		progress: Math.round((100 * (data.experiencePoints ? data.experiencePoints.toNumber() : 0)) / levelCost),
		isPresent: data.isPresent,
	};
};

export default formatParticipant;
