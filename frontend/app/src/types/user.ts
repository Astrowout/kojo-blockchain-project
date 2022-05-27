import { Plant } from "./plant";
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
	balance?: number;
	role: UserRole;
	plants?: Plant[];
	notifications?: Notification[];
}
