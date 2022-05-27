import { PrismaClient } from '@prisma/client';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { checkDid, getNotificationsByDid, postNotification } from '../../../_utils';

const client = new PrismaClient();

const handler = async (req: VercelRequest, res: VercelResponse) => {
	if (req.method !== "POST" && req.method !== "GET") {
		return res.status(400).json({ error: "Only GET & POST requests are allowed." });
	}

	const { address } = req.query;

	if (!address) {
		return res.status(400).json({ error: "The field 'address' in the request query params is undefined." });
	}

	if (!checkDid(address as string)) {
		return res.status(400).json({ error: "The field 'address' doesn't seem valid." });
	}

	try {
		if (req.method === "POST") {
			const notification = await postNotification(client, address as string, req.body);

			return res.status(200).json(notification);
		} else if (req.method === "GET") {
			const notifications = await getNotificationsByDid(client, req.query.address as string);

			return res.status(200).json(notifications);
		}
	} catch (error: any) {
		console.log(error);

		return res.status(500).send(error.message);
	}
};

export default handler;
