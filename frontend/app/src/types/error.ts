export enum ErrorType {
	GENERAL,
	NO_ETHEREUM,
	WRONG_NETWORK,
}

export type Error = {
	type: ErrorType;
	message: string;
}
