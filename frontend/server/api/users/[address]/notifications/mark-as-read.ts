import type { VercelRequest, VercelResponse } from '@vercel/node';
import { markAllAsRead, markAsRead } from '../../../_utils';

const handler = async (req: VercelRequest, res: VercelResponse) => {
	if (req.method !== "POST") {
		return res.status(400).json({ error: "Only POST requests are allowed." });
	}

	try {
		const { all, notifications } = req.body;

		if (all) {
			const updatedNotifications = await markAllAsRead(req.query.address as string);
			return res.status(200).json(updatedNotifications);
		} else if (notifications && !!notifications.length) {
			const updatedNotifications = await markAsRead(req.query.address as string, notifications);
			return res.status(200).json(updatedNotifications);
		} else {
			return res.status(400).json({ error: "Either the field 'all' or 'notifications' in the request body must be defined." });
		}
	} catch (error: any) {
		console.log(error);

		return res.status(500).send(error.message);
	}
};

export default handler;
