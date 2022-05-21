import { Plant } from "./plant";

export type User = {
	address: string;
	participation?: number;
	loyalty?: number;
	plants?: Plant[];
}
