export const checkDid = (address: string): boolean => {
	const regex = /^0x[a-fA-F0-9]{40}$/;

	return regex.test(address);
}

export const responseHelper = (res: any) => {
	if (!res) {
		return null;
	}

	const string = JSON.stringify(res, (_key, value) => (typeof value === 'bigint' ? value.toString() : value));

	return JSON.parse(string);
}

export const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min)) + min;

export const getUserAllowance (regionAverage: number, usage: number, familySize: number = 1): number {
	const usagePerPerson = usage / familySize;

	if (regionAverage - usagePerPerson <= 0) {
		return 0;
	} else {
		return regionAverage - usagePerPerson;
	}
}
