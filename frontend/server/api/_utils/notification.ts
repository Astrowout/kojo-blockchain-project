import { Notification, User } from '@prisma/client'
import { VercelRequestBody } from '@vercel/node';
import { responseHelper } from './helpers';

export const postNotification = async (client, did: string, body: VercelRequestBody): Promise<User | null> => {
	const res = await client.user.update({
		where: {
			did,
		},
		data: {
			notifications: {
				create: {
					message: body.message,
					url: body.url,
					read: false,
				}
			}
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

export const getNotificationsByDid = async (client, did: string): Promise<Notification | null> => {
	const res = await client.notification.findMany({
		where: {
			user: {
				did,
			}
		},
		orderBy: {
			createdAt: 'desc',
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
