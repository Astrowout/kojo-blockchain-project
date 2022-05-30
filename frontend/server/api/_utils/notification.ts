import { Notification } from '@prisma/client'
import { VercelRequestBody } from '@vercel/node';
import { responseHelper } from './helpers';

export const postNotification = async (client, did: string, body: VercelRequestBody): Promise<Notification | null> => {
	const res = await client.notification.create({
		data: {
			message: body.message,
			url: body.url,
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

export const getNotificationsByDid = async (client, did: string): Promise<Notification | null> => {
	const res = await client.notification.findMany({
		where: {
			user: {
				did,
			}
		},
	});

	return responseHelper(res);
}

export const markAsRead = async (client, did: string, ids: number[]): Promise<Notification | null> => {
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

export const markAllAsRead = async (client, did: string): Promise<Notification | null> => {
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
