import { PrismaClient, Notification } from '@prisma/client'
import { VercelRequestBody } from '@vercel/node';

const client = new PrismaClient();

const responseHelper = (res: any) => {
	if (!res) {
		return null;
	}

	const string = JSON.stringify(res, (_key, value) => (typeof value === 'bigint' ? value.toString() : value));

	return JSON.parse(string);
}

export const postNotification = async (body: VercelRequestBody): Promise<Notification | null> => {
	const res = await client.notification.create({
		data: {
			message: body.message,
			read: false,
			userId: body.address,
		},
	});

	return responseHelper(res);
}
