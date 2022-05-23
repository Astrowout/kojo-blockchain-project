import { Plant } from "./plant";
import { Notification } from "./notification";

export type User = {
	address: string;
	participation?: number;
	loyalty?: number;
	balance?: number;
	plants?: Plant[];
	notifications?: Notification[];
}
