// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  	address: string;
  	people: number;
  	usage: { [month: number]: number };
}

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {

	res.status(200).json({
		address: "test",
		people: 3,
		usage: {
			1: 4
		}
	})
}
