import type { VercelRequest, VercelResponse } from '@vercel/node';
import { FarysUser, User } from '@prisma/client';
import { checkDid, postFarysUser, postUser } from '../_utils';

const handler = async (req: VercelRequest, res: VercelResponse) => {
	if (req.method !== "POST") {
		return res.status(400).json({ error: "Only POST requests are allowed." });
	}

	try {
		const { address } = req.body;

		if (!address) {
			return res.status(400).json({ error: "The field 'address' in the request body is undefined." });
		}

		if (!checkDid(address as string)) {
			return res.status(400).json({ error: "The field 'address' doesn't seem valid." });
		}

		const user: string | User | null = await postUser(req.body);
		let farysUser: string | FarysUser | null = await postFarysUser(req.body);

		if (user) {
			return res.status(200).json({
				...user,
				usage: farysUser.usage,
			});
		} else {
			return res.status(200).json(null);
		}
	} catch (error: any) {
		console.log(error);

		return res.status(500).send(error.message);
	}
};

export default handler;
