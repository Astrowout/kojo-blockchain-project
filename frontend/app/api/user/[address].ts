import type { VercelRequest, VercelResponse } from '@vercel/node';
import { User } from '@prisma/client'
import { getUser, postUser } from '../_utils';

const handler = async (req: VercelRequest, res: VercelResponse) => {
	if (req.method !== "GET") {
		return res.status(400).json({ error: "Only GET requests are allowed." });
	}

	try {
		const { address } = req.query;

		if (!address) {
			return res.status(400).json({ error: "The field 'address' in the request query params is undefined." });
		}

		let user: string | User | null = await getUser(req.query);

		if (!user) {
			user = await postUser({
				...req.body,
				...req.query,
			});
		}

		if (user) {
			return res.status(200).json(user);
		} else {
			return res.status(200).json(null);
		}
	} catch (error: any) {
		console.log(error);

		return res.status(500).send(error.message);
	}
};

export default handler;
