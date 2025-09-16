import { auth } from "~/lib/auth"; 
import { toNextJsHandler } from "better-auth/next-js";
import { rlAuth, getClientIP } from "~/lib/ratelimit";

const base = toNextJsHandler(auth);

export const GET = base.GET;

export const POST = async (req: Request) => {
  const ip = getClientIP(req);
  const { success, reset } = await rlAuth.limit(`auth:${ip}`);
  if (!success) {
    return new Response(JSON.stringify({ error: "Too many attempts" }), {
      status: 429,
      headers: reset
        ? { "Retry-After": Math.max(0, Math.ceil((reset - Date.now()) / 1000)).toString() }
        : {},
    });
  }
  return base.POST(req);
};