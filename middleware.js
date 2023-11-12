import { getSession } from '@auth0/nextjs-auth0/edge';
import { NextResponse } from "next/server"

export async function middleware(req) {
  const res = NextResponse.next();
  const user = await getSession(req, res);
  if (user === null) {
    return NextResponse.redirect(new URL('/landing', req.url));
  }
  return res;
}
export const config = {
  matcher: ['/home', '/record', '/recordings', '/', '/summary'],
}