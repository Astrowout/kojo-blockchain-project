// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  	id: string;
  	people: number;
  	usage: { [month: number]: number };
}

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data[]>
) {
	res.status(200).json([
		{
			id: "000001",
			people: 1,
			usage: {
				6: 2.8,
				7: 3.0,
				8: 3.2,
				9: 2.8,
				10: 2.9,
				11: 2.6,
				12: 2.5
			}
		},
		{
			id: "000002",
			people: 2,
			usage: {
				6: 5.0,
				7: 5.5,
				8: 5.8,
				9: 5.4,
				10: 5.2,
				11: 5.0,
				12: 4.8
			}
		},
		{
			id: "000003",
			people: 3,
			usage: {
				6: 6.5,
				7: 6.7,
				8: 7.0,
				9: 6.6,
				10: 6.5,
				11: 6.4,
				12: 6.3,
			}
		},
		{
			id: "000004",
			people: 3,
			usage: {
				6: 6.2,
				7: 6.9,
				8: 6.8,
				9: 6.2,
				10: 6.0,
				11: 6.6,
				12: 6.0,
			}
		},
		{
			id: "000005",
			people: 4,
			usage: {
				6: 9.2,
				7: 9.5,
				8: 9.3,
				9: 8.9,
				10: 8.5,
				11: 8.5,
				12: 8.3,
			},
		},
	])
}
