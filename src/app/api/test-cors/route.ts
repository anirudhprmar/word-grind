import { NextRequest, NextResponse } from "next/server";
import { env } from "~/env";

export async function GET(request: NextRequest) {
  return NextResponse.json(
    { 
      message: "CORS test successful",
      origin: request.headers.get("origin"),
      userAgent: request.headers.get("user-agent")
    },
    {
      headers: {
        "Access-Control-Allow-Origin": env.NEXT_PUBLIC_APP_URL || "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
        "Access-Control-Allow-Credentials": "true",
      },
    }
  );
}

export async function OPTIONS(request: NextRequest) {
  return new Response(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": env.NEXT_PUBLIC_APP_URL || "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
      "Access-Control-Allow-Credentials": "true",
    },
  });
}
