import { BigNumber } from "ethers";
import { Participant, Player } from "../types";

const formatParticipant = (data: any, account?: string): Participant | Player => {
	return {
		...(account && { address: account }),
		allowedTokenBalance: data.allowedTokenBalance.toNumber(),
		level: data.allowedTokenBalance.toNumber(),
		experiencePoints: data.experiencePoints.toNumber(),
		plantIds: data.plantIds.map((plantId: BigNumber) => plantId.toNumber()),
		isPresent: data.isPresent,
	};
};

export default formatParticipant;
