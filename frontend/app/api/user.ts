import type { VercelRequest, VercelResponse } from '@vercel/node';
import { User } from '@prisma/client'
import { getUser, postUser } from '../prisma/functions/user';

const handler = async (req: VercelRequest, res: VercelResponse) => {
	if (req.method !== "GET" && req.method !== "POST") {
		return res.status(400).json({ error: "Only GET & POST requests are allowed." });
	}

	try {
		let user: string | User | null = null;

		if (req.method === "GET") {
			const { address } = req.query;

			if (!address) {
				return res.status(400).json({ error: "The field 'address' in the request query params is undefined." });
			}

			user = await getUser(req.query);

			if (!user) {
				user = await postUser({
					...req.body,
					...req.query,
				});
			}
		}

		if (req.method === "POST") {
			const { address } = req.body;

			if (!address) {
				return res.status(400).json({ error: "The field 'address' in the request body is undefined." });
			}

			user = await postUser(req.body);
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
