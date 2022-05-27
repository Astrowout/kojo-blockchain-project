import type { VercelRequest, VercelResponse } from '@vercel/node';
import { PrismaClient, User } from '@prisma/client'
import { checkDid, getUserByDid } from '../../_utils';

const client = new PrismaClient();

const handler = async (req: VercelRequest, res: VercelResponse) => {
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
		let user: string | User | null = await getUserByDid(client, address as string);

		return res.status(200).json(user);
	} catch (error: any) {
		console.log(error);

		return res.status(500).send(error.message);
	}
};

export default handler;
