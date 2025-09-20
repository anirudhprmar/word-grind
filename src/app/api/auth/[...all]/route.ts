import { auth } from "~/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";
import { NextRequest } from "next/server";
import { env } from "~/env";

const handler = toNextJsHandler(auth);

export async function GET(request: NextRequest) {
  return handler.GET(request);
}

export async function POST(request: NextRequest) {
  return handler.POST(request);
}

export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get("origin");
  const allowedOrigins = [
    env.NEXT_PUBLIC_APP_URL,
    "https://wordgrind.top",
    "https://www.wordgrind.top",
    "http://localhost:3000"
  ];
  
  const corsOrigin = origin && allowedOrigins.includes(origin) 
    ? origin 
    : env.NEXT_PUBLIC_APP_URL || "*";
    
  return new Response(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": corsOrigin,
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
      "Access-Control-Allow-Credentials": "true",
    },
  });
}

