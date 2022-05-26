import { Notification } from '@prisma/client';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getNotificationsByDid, postNotification } from '../../../_utils';

const handler = async (req: VercelRequest, res: VercelResponse) => {
	if (req.method !== "POST" && req.method !== "GET") {
		return res.status(400).json({ error: "Only GET & POST requests are allowed." });
	}

	try {

		if (req.method === "POST") {
			const { address } = req.query;

			if (!address) {
				return res.status(400).json({ error: "The field 'address' in the request params is undefined." });
			}

			const notification = await postNotification(address as string, req.body);

			return res.status(200).json(notification);
		} else if (req.method === "GET") {
			const notifications = await getNotificationsByDid(req.query.address as string);

			return res.status(200).json(notifications);
		}
	} catch (error: any) {
		console.log(error);

		return res.status(500).send(error.message);
	}
};

export default handler;
