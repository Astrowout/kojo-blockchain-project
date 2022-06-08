export type Participant = {
	level?: number;
	experiencePoints?: number;
	plantIds?: number[];
	allowedTokenBalance?: number;
	isPresent?: boolean;
}

export interface Player extends Participant {
	address: string;
}
