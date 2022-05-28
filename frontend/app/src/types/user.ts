import { Notification } from "./notification";

export enum UserRole {
	VISITOR,
	PARTICIPANT,
	VERIFIED_PARTICIPANT,
}

export type User = {
	address: string;
	participation?: number;
	loyalty?: number;
	role: UserRole;
	notifications?: Notification[];
}
