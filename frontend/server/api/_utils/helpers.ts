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

export const getRandomFloat = (min: number, max: number, decimals: number = 1): number => {
	const str = (Math.random() * (max - min) + min).toFixed(decimals);

	return parseFloat(str);
  }
