import type { VercelRequest, VercelResponse } from '@vercel/node';
import { FarysUser, PrismaClient, User } from '@prisma/client';
import { postFarysUser, postUser } from '../_utils';

const client = new PrismaClient();

const handler = async (req: VercelRequest, res: VercelResponse) => {
	if (req.method === "OPTIONS") {
		return res.status(200).send("");
	}

	if (req.method !== "POST") {
		return res.status(400).json({ error: "Only POST requests are allowed." });
	}

	try {
		return await client.$transaction(async (prisma) => {
			const user: string | User | null = await postUser(prisma, req.body);
			const farysUser: string | FarysUser | null = await postFarysUser(prisma, req.body);

			if (user) {
				return res.status(200).json({
					...user,
					usage: farysUser.usage,
				});
			} else {
				return res.status(200).json(null);
			}
		});
	} catch (error: any) {
		console.log(error);

		return res.status(500).send(error.message);
	}
};

export default handler;
