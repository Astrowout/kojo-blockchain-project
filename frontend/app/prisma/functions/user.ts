import { PrismaClient, User } from '@prisma/client'
import { VercelRequestBody, VercelRequestQuery } from '@vercel/node';

const client = new PrismaClient();

const responseHelper = (res: any) => {
	if (!res) {
		return null;
	}

	const string = JSON.stringify(res, (_key, value) => (typeof value === 'bigint' ? value.toString() : value));

	return JSON.parse(string);
}

export const getUser = async (params: VercelRequestQuery): Promise<User | null> => {
	const res = await client.user.findUnique({
		where: {
			did: params.address as string,
		},
		include: {
			profile: {
				include: {
					notifications: true,
				}
			},
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

	return responseHelper(res);
}
