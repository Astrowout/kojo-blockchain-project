import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(
	req: VercelRequest,
	res: VercelResponse
) {
	if (!req.query.address) {
		return res.status(400).json({
			error: 'Missing address',
		});
	}

	const addressRegex = /^0x[0-9a-fA-F]{40}$/;
	if (addressRegex.test(req.query.address as string)) {
		return res.status(400).json({
			error: "You address doesn't seem valid",
		});
	}

	res.status(200).json({
		address: req.query.address,
		usage: 30,
	});
}
