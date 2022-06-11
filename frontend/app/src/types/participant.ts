export type Participant = {
	level?: number;
	experiencePoints?: number;
	plantIds?: number[];
	allowedTokenBalance?: number;
	progress?: number;
	isPresent?: boolean;
}

export interface Player extends Participant {
	address: string;
}
