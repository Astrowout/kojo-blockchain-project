import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
	let resRewrite = NextResponse.redirect(`${req.nextUrl.origin}/product`);
	let resNext = NextResponse.next();

	let preventRedirect = req.cookies['prevent-redirect'];
	if (req.nextUrl.pathname === '/' && !preventRedirect) {
		resRewrite.clearCookie('prevent-redirect');
		return resRewrite;
	}

	if (req.nextUrl.pathname === '/') {
		resNext.clearCookie('prevent-redirect');
		return resNext;
	}

	if (req.nextUrl.pathname === '/product') {
		resNext.cookie('prevent-redirect', 'true');
		return resNext;
	}
}
