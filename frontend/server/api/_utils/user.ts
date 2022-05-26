import { PrismaClient, User } from '@prisma/client'
import { VercelRequestBody, VercelRequestQuery } from '@vercel/node';
import { responseHelper } from './helpers';

const client = new PrismaClient();

export const getUser = async (params: VercelRequestQuery): Promise<User | null> => {
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

export const postUser = async (body: VercelRequestBody): Promise<User | null> => {
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
