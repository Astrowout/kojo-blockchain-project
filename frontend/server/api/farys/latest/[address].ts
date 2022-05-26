import { PrismaClient } from '@prisma/client';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getUserByDid, getAverageByRegion } from '../../_utils';

const client = new PrismaClient();

export default async function handler(
	req: VercelRequest,
	res: VercelResponse
) {
	if (!req.query.address) {
		return res.status(400).json({
			error: 'Missing address',
		});
	}

	const addressRegex = /^0x[0-9a-fA-F]{40}$/;
	if (addressRegex.test(req.query.address as string)) {
		return res.status(400).json({
			error: "You address doesn't seem valid",
		});
	}

	try {
		const regionAverage = await getAverageByRegion(client, req.query.address as string);
		const user = await getUserByDid(client, req.query.address as string);

		res.status(200).json({
			address: req.query.address,
			regionAverage,
			usage: user.usage,
			familySize: user.familySize,
		});
	} catch (error) {
		console.log(error);

		return res.status(500).send(error.message);
	}
}
