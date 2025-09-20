import { type NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
import { rlGlobal, getClientIP } from "~/lib/ratelimit";
import { env } from "~/env";

export async function middleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);
  const { pathname } = request.nextUrl;

  // Handle CORS for Better Auth API routes
  if (pathname.startsWith("/api/auth")) {
    const response = NextResponse.next();
    
    // Set CORS headers for Better Auth
    response.headers.set("Access-Control-Allow-Origin", env.NEXT_PUBLIC_APP_URL || "*");
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
    response.headers.set("Access-Control-Allow-Credentials", "true");
    
    // Handle preflight requests
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 200, headers: response.headers });
    }
    
    return response;
  }

  // Allow webhooks
  if (pathname.startsWith("/api/polar/webhooks")) {
    return NextResponse.next();
  }

  // Global API rate limit (per IP)
  if (pathname.startsWith("/api")) {
    const ip = getClientIP(request);
    const key = `${ip}:${pathname}`;
    const { success, reset, remaining, limit } = await rlGlobal.limit(key);

    if (!success) {
      const res = NextResponse.json(
        { error: "Too many requests" },
        { status: 429 },
      );
      if (reset) res.headers.set("Retry-After", Math.max(0, Math.ceil((reset - Date.now()) / 1000)).toString());
      res.headers.set("X-RateLimit-Limit", String(limit ?? 0));
      res.headers.set("X-RateLimit-Remaining", String(remaining ?? 0));
      return res;
    }
  }

  if (sessionCookie && ["/sign-in", "/sign-up"].includes(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!sessionCookie && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*", 
    "/sign-in", 
    "/sign-up", 
    "/api/auth/:path*",
    "/api/trpc/:path*",
    "/api/upload-image/:path*",
    "/api/polar/webhooks/:path*"
  ],
};