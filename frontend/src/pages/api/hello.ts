// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  	hello: string;
	request: any;
};

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	res.status(200).json({
		hello: "World",
		request: {
			method: req.method,
			body: req.body,
			query: req.query,
		}
	});
};
