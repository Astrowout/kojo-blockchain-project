import { PrismaClient } from '@prisma/client';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { checkDid, getAverageByRegion, getFarysUserByDid, getUserAllowance } from '../../_utils';

const client = new PrismaClient();

export default async function handler(
	req: VercelRequest,
	res: VercelResponse
) {
	if (req.method !== "GET") {
		return res.status(400).json({ error: "Only GET requests are allowed." });
	}

	const { address } = req.query;

	if (!address) {
		return res.status(400).json({ error: "The field 'address' in the request query params is undefined." });
	}

	if (!checkDid(address as string)) {
		return res.status(400).json({ error: "The field 'address' doesn't seem valid." });
	}

	try {
		const regionAverage = await getAverageByRegion(client, address as string);
		const user = await getFarysUserByDid(client, address as string);

		if (user) {
			res.status(200).json({
				address: address,
				regionAverage,
				usage: user.usage,
				familySize: user.familySize,
				allowance: getUserAllowance(regionAverage, user.usage, user.familySize),
			});
		} else {
			res.status(404).json({
				error: "The user with the given DID doesn't exist.",
			});
		}
	} catch (error) {
		console.log(error);

		return res.status(500).send(error.message);
	}
}
