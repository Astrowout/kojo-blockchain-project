import { FarysUser, PrismaClient } from '@prisma/client';
import { VercelRequestBody } from '@vercel/node';
import { getRandomFloat, responseHelper } from './helpers';

const client = new PrismaClient();

export const getAverageByRegion = async (did: string): Promise<number | null> => {
	let regionAverage = 2.7;

	const user = await client.farysUser.findUnique({
		where: {
		  	did,
		},
		select: {
			postalCode: true,
		}
	});

	if (user && user.postalCode) {
		const users = await client.farysUser.findMany({
			where: {
				postalCode: user.postalCode,
			},
			select: {
				usage: true,
				familySize: true,
			}
		});

		return users.reduce((acc, user) => acc + user.usage / user.familySize, 0) / users.length;
	} else {
		return regionAverage;
	}
}

export const getUserByDid = async (did: string): Promise<FarysUser | null> => {
	const res = await client.farysUser.findUnique({
		where: {
			did,
		},
		select: {
			usage: true,
			familySize: true,
		},
	});

	return responseHelper(res);
}

export const postFarysUser = async (body: VercelRequestBody): Promise<FarysUser | null> => {
	const res = await client.farysUser.create({
		data: {
			did: body.address,
			usage: getRandomFloat(1.8, 3.9),
		},
	});

	return responseHelper(res);
}
