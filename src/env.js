// @ts-nocheck
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    DATABASE_URL: z.string().optional(),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
      BETTER_AUTH_SECRET: z.string(),
      BETTER_AUTH_URL: z.string().optional(),
      AUTH_GOOGLE_ID: z.string(),
      AUTH_GOOGLE_SECRET: z.string(),
      GEMINI_API_KEY:z.string(),
      MISTRAL_API_KEY:z.string(),
      // OPENAI_API_KEY:z.string(),
      // REPLICATE_API_KEY:z.string(),
      RESEND_API_KEY:z.string().optional(),
      POLAR_ACCESS_TOKEN:z.string().optional(),
      POLAR_WEBHOOK_SECRET:z.string().optional(),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    NEXT_PUBLIC_STARTER_TIER: z.string().optional(),
    NEXT_PUBLIC_STARTER_SLUG: z.string().optional()
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    AUTH_GOOGLE_ID: process.env.AUTH_GOOGLE_ID,
    AUTH_GOOGLE_SECRET: process.env.AUTH_GOOGLE_SECRET,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    BETTER_AUTH_URL:process.env.BETTER_AUTH_URL,
    NEXT_PUBLIC_STARTER_TIER: process.env.NEXT_PUBLIC_STARTER_TIER,
    NEXT_PUBLIC_STARTER_SLUG: process.env.NEXT_PUBLIC_STARTER_SLUG,
    POLAR_ACCESS_TOKEN:process.env.POLAR_ACCESS_TOKEN,
    POLAR_WEBHOOK_SECRET:process.env.POLAR_WEBHOOK_SECRET,
    RESEND_API_KEY:process.env.RESEND_API_KEY,
    GEMINI_API_KEY:process.env.GEMINI_API_KEY,
    MISTRAL_API_KEY:process.env.MISTRAL_API_KEY,
    // OPENAI_API_KEY:process.env.OPENAI_API_KEY,
    // REPLICATE_API_KEY:process.env.REPLICATE_API_KEY,
    GEMINI_API_KEY:process.env.GEMINI_API_KEY,
    MISTRAL_API_KEY:process.env.MISTRAL_API_KEY,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
});
