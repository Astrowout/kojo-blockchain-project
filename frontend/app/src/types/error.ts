export enum ErrorType {
	GENERAL,
	NO_ETHEREUM,
}

export type Error = {
	type: ErrorType;
	message: string;
}
