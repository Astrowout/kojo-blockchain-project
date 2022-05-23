import type { VercelRequest, VercelResponse } from '@vercel/node';
import { PrismaClient } from '@prisma/client'

const client = new PrismaClient();

const handler = async (req: VercelRequest, res: VercelResponse) => {
	if (req.method !== "GET") {
		return res.status(400).json({ error: "Only GET requests are allowed." });
	}

	const { address } = req.body;

	if (!address) {
		return res.status(400).json({ error: "The field 'address' in the request body is undefined." });
	}

	try {
		const user = await client.user.findUnique({
			where: {
				did: address,
			},
			include: {
				profile: {
					include: {
						notifications: true,
					}
				},
			},
		});

		return res.status(200).json(user);
	} catch (error: any) {
		console.log(error);

		return res.status(500).send(error.message);
	}
};

export default handler;
