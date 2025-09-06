import { type NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

 
export async function middleware(request: NextRequest) {
	const sessionCookie = getSessionCookie(request);
	const pathname = request.nextUrl.pathname
    
    // THIS IS NOT SECURE!
    // This is the recommended approach to optimistically redirect users
    // We recommend handling auth checks in each page/route
    
	
	if (!sessionCookie) {
		return NextResponse.redirect(new URL("/", request.url));
	}

	  if (pathname === '/' && sessionCookie) {
    const redirectUrl = new URL('/dashboard', request.url);
    return NextResponse.redirect(redirectUrl);
  }
 
	return NextResponse.next();
}
 
export const config = {
	matcher: ["/","/dashboard/:path*"]
};