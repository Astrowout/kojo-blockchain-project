import type { VercelRequest, VercelResponse } from '@vercel/node';
import { PrismaClient, User } from '@prisma/client';

const client = new PrismaClient();

const handler = async (req: VercelRequest, res: VercelResponse) => {
	if (req.method !== "POST") {
		return res.status(400).json({ error: "Only POST requests are allowed." });
	}

	const { address, email } = req.body;

	if (!address) {
		return res.status(400).json({ error: "Address passed in body is invalid" });
	}

	try {
		let user: string | User | null = await client.user.create({
			data: {
				did: address,
				email,
				profile: {
					create: {
						postalCode: null,
						firstName: null,
						lastName: null,
						notifications: {
							create: []
						}
					}
				}
			},
			include: {
				profile: {
					include: {
						notifications: true,
					}
				},
			},
		});

		user = JSON.stringify(user, (_key, value) => (typeof value === 'bigint' ? value.toString() : value));

		return res.status(200).json(JSON.parse(user));
	} catch (error: any) {
		console.log(error);

		return res.status(500).send(error.message);
	}
};

export default handler;
