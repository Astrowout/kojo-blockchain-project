import { User } from '@prisma/client'
import { VercelRequestBody } from '@vercel/node';
import { responseHelper } from './helpers';

export const getUserByDid = async (client, did: string): Promise<User | null> => {
	const res = await client.user.findUnique({
		where: {
			did,
		},
		include: {
			notifications: {
				orderBy: {
					createdAt: 'desc',
				},
			},
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
				create: [{
					message: "Welcome to kojo! Get started by claiming your first kojos.",
					url: "/claim",
					read: false,
				}]
			}
		},
		include: {
			notifications: {
				orderBy: {
					createdAt: 'desc',
				},
			},
		},
	});

	return responseHelper(res);
}

export const changeRole = async (client, did: string, body: VercelRequestBody): Promise<User | null> => {
	const res = await client.user.create({
		where: {
			did,
		},
		data: {
			role: body.role,
		},
		include: {
			notifications: {
				orderBy: {
					createdAt: 'desc',
				},
			},
		}
	});

	return responseHelper(res);
}
