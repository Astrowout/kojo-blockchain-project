import { User } from '@prisma/client'
import { VercelRequestBody, VercelRequestQuery } from '@vercel/node';
import { responseHelper } from './helpers';

export const getUser = async (client, params: VercelRequestQuery): Promise<User | null> => {
	const res = await client.user.findUnique({
		where: {
			did: params.address as string,
		},
		include: {
			profile: true,
			notifications: true,
		},
	});

	return responseHelper(res);
}

export const postUser = async (client, body: VercelRequestBody): Promise<User | null> => {
	const res = await client.user.create({
		data: {
			did: body.address,
			email: body.email,
			profile: {
				create: {
					firstName: null,
					lastName: null,
				}
			},
			notifications: {
				create: []
			}
		},
		include: {
			profile: true,
			notifications: true,
		},
	});

	return responseHelper(res);
}
