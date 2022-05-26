import { PrismaClient, Notification } from '@prisma/client'
import { VercelRequestBody } from '@vercel/node';
import { responseHelper } from './helpers';

const client = new PrismaClient();

export const postNotification = async (did: string, body: VercelRequestBody): Promise<Notification | null> => {
	const res = await client.notification.create({
		data: {
			message: body.message,
			read: false,
			user: {
				connect: {
					did,
				}
			}
		},
	});

	return responseHelper(res);
}

export const getNotificationsByDid = async (did: string): Promise<Notification | null> => {
	const res = await client.notification.findMany({
		where: {
			user: {
				did,
			}
		},
	});

	return responseHelper(res);
}

export const markAsRead = async (did: string, ids: number[]): Promise<Notification | null> => {
	const res = await client.notification.updateMany({
		where: {
			id: {
				in: ids,
			},
			user: {
				did,
			},
		 	read: false,
		},
		data: {
		  	read: true,
		},
	});

	return responseHelper(res);
}

export const markAllAsRead = async (did: string): Promise<Notification | null> => {
	const res = await client.notification.updateMany({
		where: {
			user: {
				did,
			},
			read: false,
		},
		data: {
		  	read: true,
		},
	});

	return responseHelper(res);
}
