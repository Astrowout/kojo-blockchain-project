import { Notification } from '@prisma/client';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { postNotification } from './_utils';

const handler = async (req: VercelRequest, res: VercelResponse) => {
	if (req.method !== "POST") {
		return res.status(400).json({ error: "Only POST requests are allowed." });
	}

	try {
		let notification: string | Notification | null = null;

		if (req.method === "POST") {
			const { address } = req.body;

			if (!address) {
				return res.status(400).json({ error: "The field 'address' in the request body is undefined." });
			}

			notification = await postNotification(req.body);
		}

		if (notification) {
			return res.status(200).json(notification);
		} else {
			return res.status(200).json(null);
		}
	} catch (error: any) {
		console.log(error);

		return res.status(500).send(error.message);
	}
};

export default handler;
